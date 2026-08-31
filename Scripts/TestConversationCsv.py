"""Run 100 real local LLM requests without changing production prompts or CSVs.

Reproduces the current C++ JSON acceptance and CSV serialization rules in Python;
this is a format regression test, not 100 Unreal/PIE or TTS integration runs.
"""

import csv
import hashlib
import json
import math
import os
from pathlib import Path
import re
import statistics
import time
from datetime import datetime
from urllib.error import HTTPError
from urllib.request import ProxyHandler, Request, build_opener


ROOT = Path(__file__).resolve().parent.parent
URL = os.environ.get("LOCAL_LLM_TEST_URL", "http://127.0.0.1:18181").rstrip("/")
# The test targets localhost; do not send requests through system HTTP proxies.
HTTP = build_opener(ProxyHandler({}))
RUNS = 100
MAX_LINES = 8
TEMPERATURE = 0.7
CASES = [
    ("lunch", "两名村民在午休时偶遇，寒暄今天的工作，随后道别回去工作。", "村里的铁匠，负责打铁和修理农具。", "村里的裁缝，负责裁剪布料和缝衣。"),
    ("rain", "午后下雨，两人在屋檐下避雨，谈论雨对工作的影响，随后道别。", "种植小麦的农夫。", "在市场售卖蔬菜的商贩。"),
    ("delivery", "两人在市场碰面，询问明天木炭送货的安排，简短交谈后回去工作。", "使用木炭的铁匠。", "负责运送木炭的车夫。"),
    ("numbers", "两人核对订单：明天送来12袋面粉，每袋3枚铜币，随后道别。", "村里的面包师。", "负责售卖面粉的磨坊主。"),
    ("quotes", '两人在名为“晨光”的店门口讨论新招牌，招牌上写着"欢迎光临,请慢走"，随后道别。', "经营杂货店的店主。", "负责制作招牌的木匠。"),
    ("festival", "两人在广场碰面，聊一聊今晚的丰收节安排，随后各自回去准备。", "准备晚餐的厨师。", "准备演奏的乐师。"),
    ("busy", "两人偶遇，其中一人订单很多，另一人询问是否需要帮忙，简短交谈后道别。", "订单很多的裁缝，说话简短。", "邻居木匠，热心但也有自己的工作。"),
    ("unknown", "两人询问村外道路是否修好，但两人都不知道最新情况，约定稍后去公告栏查看，然后道别。", "准备出村的商人。", "刚从田里回来的农夫。"),
    ("names", "阿岚与小禾在井边碰面，聊到修理水桶的安排，随后回去工作。", "阿岚，负责修理木桶的木匠。", "小禾，种植蔬菜的农夫。"),
    ("punctuation", "场景：傍晚，市场即将收摊。\n话题：核对清单——苹果、梨、布料；确认无误后道别。", "经营水果摊的商贩。", "采购布料与水果的裁缝。"),
]


def read_json(url):
    with HTTP.open(url, timeout=10) as response:
        return json.load(response)


def cpp_string_literals(block):
    return "".join(json.loads(token) for token in re.findall(r'"(?:\\.|[^"\\])*"', block))


def read_prompts():
    source_path = ROOT / "Source/CppGOWActionGame/Private/NPC/NPCSubsystem.cpp"
    source = source_path.read_text(encoding="utf-8-sig")
    start_chat = source.split("void UNPCConversationCsvGenerationTask::StartChat()", 1)[1].split(
        "void UNPCConversationCsvGenerationTask::HandleChatCompleted", 1
    )[0]
    system = cpp_string_literals(start_chat.split("ChatRequest.SystemPrompt = TEXT(", 1)[1].split(");", 1)[0])
    user = cpp_string_literals(start_chat.split("ChatRequest.UserPrompt = FString::Printf(", 1)[1].split("),", 1)[0])
    if not system or user.count("%s") != 3 or user.count("%d") != 1:
        raise ValueError("Cannot extract current production prompts; no requests sent")
    return system, user, hashlib.sha256(source_path.read_bytes()).hexdigest()


def parse_like_cpp(text):
    first, last = text.find("["), text.rfind("]")
    if first < 0 or last <= first:
        raise ValueError("LLM did not return a JSON array")
    lines = json.loads(text[first:last + 1])
    if not isinstance(lines, list) or len(lines) < 2:
        raise ValueError("Fewer than two dialogue lines")
    normalized = []
    warnings = []
    if text.strip() != text[first:last + 1]:
        warnings.append("extra_text_outside_array")
    if len(lines) > MAX_LINES:
        warnings.append("extra_lines_truncated_by_existing_parser")
    for index, line in enumerate(lines[:MAX_LINES], 1):
        if not isinstance(line, str):
            raise ValueError(f"Line {index} is not a string")
        line = line.strip().replace("\r", " ").replace("\n", " ")
        # FString::Len counts UTF-16 code units on Windows.
        length = len(line.encode("utf-16-le")) // 2
        if not line or length > 100:
            raise ValueError(f"Line {index} is empty or exceeds the existing 100-unit limit")
        if length > 40:
            warnings.append("line_exceeds_prompt_40_character_limit")
        if re.match(r"^(?:\[?[AB]\]?|角色[AB]|铁匠|裁缝|农夫|商人|商贩|木匠|车夫|厨师|乐师|店主|磨坊主|面包师|阿岚|小禾)\s*[：:]", line):
            warnings.append("possible_speaker_prefix")
        normalized.append(line)
    return normalized, sorted(set(warnings))


def csv_cell(value):
    return '"' + value.replace("\r", " ").replace("\n", " ").replace('"', '""') + '"'


def write_and_check_csv(lines, conversation_id, path):
    header = "RowName,ConversationId,LineIndex,SpeakerSlot,Text,TtsSpeaker,PauseAfterSeconds,EndAction"
    rows = [header]
    for index, text in enumerate(lines):
        last = index == len(lines) - 1
        fields = [csv_cell(f"{conversation_id}_{index + 1:02d}"), csv_cell(conversation_id),
                  str(index + 1), csv_cell("A" if index % 2 == 0 else "B"), csv_cell(text),
                  csv_cell("dylan" if index % 2 == 0 else "vivian"),
                  "0.00" if last else "0.25", csv_cell("ReturnToWork" if last else "Continue")]
        rows.append(",".join(fields))
    text = "\r\n".join(rows) + "\r\n"
    path.write_bytes(text.encode("utf-8"))
    with path.open(encoding="utf-8", newline="") as handle:
        parsed = list(csv.reader(handle, strict=True))
    if parsed[0] != header.split(",") or len(parsed) != len(lines) + 1:
        raise ValueError("CSV header/row count mismatch")
    if any(len(row) != 8 for row in parsed[1:]) or [row[4] for row in parsed[1:]] != lines:
        raise ValueError("CSV column or text round-trip mismatch")


def main():
    system, template, source_hash = read_prompts()
    if read_json(URL + "/health").get("status") != "ok":
        raise RuntimeError("Local server is not healthy; no requests sent")
    props = read_json(URL + "/props")
    output = ROOT / "Saved/LLMCsvTests" / datetime.now().strftime("%Y%m%d-%H%M%S")
    output.mkdir(parents=True, exist_ok=False)
    metadata = {"started_at": datetime.now().isoformat(), "runs": RUNS, "url": URL,
                "system_prompt": system, "user_template": template, "source_sha256": source_hash,
                "max_lines": MAX_LINES, "max_tokens": max(256, min(MAX_LINES * 96, 1536)),
                "temperature": TEMPERATURE, "cases": CASES, "server_props": props,
                "scope": "100 real HTTP generations; Python reproduction of existing C++ parser/CSV rules; no retries, no TTS, no Unreal integration"}
    (output / "metadata.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OUTPUT={output}", flush=True)
    results = []
    for number in range(1, RUNS + 1):
        name, scenario, speaker_a, speaker_b = CASES[(number - 1) % len(CASES)]
        user = template % (scenario, speaker_a, speaker_b, MAX_LINES)
        body = {"model": "local-town-dialogue", "messages": [
            {"role": "system", "content": system}, {"role": "user", "content": user + "\n/no_think"}],
            "max_tokens": metadata["max_tokens"], "temperature": TEMPERATURE, "stream": False}
        record = {"run": number, "case": name, "started_at": datetime.now().isoformat(timespec="milliseconds"),
                  "success": False, "warnings": []}
        started = time.perf_counter()
        raw = b""
        response_json = None
        stage = "http"
        try:
            request = Request(URL + "/v1/chat/completions", data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
                              headers={"Content-Type": "application/json"})
            with HTTP.open(request, timeout=90) as response:
                raw = response.read()
                record["http_status"] = response.status
            record["generation_ms"] = round((time.perf_counter() - started) * 1000, 2)
            stage = "response"
            response_json = json.loads(raw)
            choice = response_json["choices"][0]
            text = choice["message"]["content"]
            if not isinstance(text, str) or not text:
                raise ValueError("Missing nonempty choices[0].message.content")
            record["finish_reason"] = choice.get("finish_reason")
            record["usage"] = response_json.get("usage")
            record["output_sha256"] = hashlib.sha256(text.encode("utf-8")).hexdigest()
            stage = "parser"
            lines, warnings = parse_like_cpp(text)
            record["warnings"] = warnings
            if record["finish_reason"] == "length":
                record["warnings"].append("token_limit_reached")
            stage = "csv"
            write_and_check_csv(lines, f"test_{number:03d}", output / f"{number:03d}.csv")
            record.update(success=True, line_count=len(lines))
        except Exception as error:
            if isinstance(error, HTTPError):
                raw = error.read()
                record["http_status"] = error.code
            record.update(error=str(error), failure_stage=stage)
        record["elapsed_ms"] = round((time.perf_counter() - started) * 1000, 2)
        record["finished_at"] = datetime.now().isoformat(timespec="milliseconds")
        (output / f"{number:03d}.response.txt").write_bytes(raw)
        results.append(record)
        with (output / "results.jsonl").open("a", encoding="utf-8") as handle:
            handle.write(json.dumps(record, ensure_ascii=False) + "\n")
        if number == 1 or number % 5 == 0 or not record["success"]:
            print(f"{number}/{RUNS}: success={sum(r['success'] for r in results)}, "
                  f"warnings={sum(bool(r['warnings']) for r in results)}, last_ms={record['elapsed_ms']}, "
                  f"error={record.get('error', '')}", flush=True)
    latencies = sorted(r["generation_ms"] for r in results if "generation_ms" in r)
    summary = {"completed_at": datetime.now().isoformat(), "total": len(results),
               "successes": sum(r["success"] for r in results),
               "failures": [r for r in results if not r["success"]],
               "warning_runs": [r for r in results if r["warnings"]],
               "unique_outputs": len({r["output_sha256"] for r in results if "output_sha256" in r}),
               "latency_ms": {"median": statistics.median(latencies), "p95": latencies[math.ceil(len(latencies)*.95)-1],
                              "min": min(latencies), "max": max(latencies)} if latencies else {},
               "by_case": {case[0]: {"total": sum(r["case"] == case[0] for r in results),
                                     "successes": sum(r["case"] == case[0] and r["success"] for r in results)} for case in CASES}}
    (output / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    with (output / "results.csv").open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["run", "case", "success", "generation_ms", "line_count", "finish_reason", "warnings", "error"])
        for row in results:
            writer.writerow([row["run"], row["case"], row["success"], row.get("generation_ms"), row.get("line_count"),
                             row.get("finish_reason"), ";".join(row["warnings"]), row.get("error", "")])
    print(json.dumps({key: value for key, value in summary.items() if key not in ("failures", "warning_runs", "by_case")}), flush=True)
    print(f"FAILURES={len(summary['failures'])} WARNING_RUNS={len(summary['warning_runs'])}", flush=True)


if __name__ == "__main__":
    main()
