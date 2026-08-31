"""Run with UE's PythonScript commandlet; creates only the isolated W1-02 asset."""
import json
from pathlib import Path

import unreal


ROOT = Path(unreal.Paths.convert_relative_path_to_full(unreal.Paths.project_dir())).resolve()
SOURCE = "/Game/AmbientNpcBehavior/DA_AmbientNpcDailyScheduleConfig"
DESTINATION = "/Game/AmbientNpcBehavior/Sample3/DA_AmbientNpcSample3Config"
PROPERTIES = {
    "schema_file_path": "Content/AmbientNpcBehavior/DataDriven/schema.json",
    "sequences_file_path": "Content/AmbientNpcBehavior/DataDriven/sequences.json",
    "actions_file_path": "Content/AmbientNpcBehavior/DataDriven/actions.json",
    "environmental_conditions_file_path": "Content/AmbientNpcBehavior/DataDriven/environmental_conditions.json",
    "daily_schedule_file_path": "Content/AmbientNpcBehavior/Sample3/daily_schedule.json",
    "log_file_path": "Saved/Logs/AmbientNpcSample3.log",
}


def main():
    # Refuse to create an asset whose source files are missing or outside the project.
    for key, relative in PROPERTIES.items():
        if key == "log_file_path":
            continue
        path = (ROOT / relative).resolve()
        path.relative_to(ROOT)
        json.loads(path.read_text(encoding="utf-8-sig"))
    source = unreal.load_asset(SOURCE)
    if source is None or not isinstance(source, unreal.BehaviorFrameworkConfig):
        raise RuntimeError(f"Missing BehaviorFrameworkConfig source: {SOURCE}")
    asset = unreal.load_asset(DESTINATION)
    created = asset is None
    if created:
        asset = unreal.AssetToolsHelpers.get_asset_tools().duplicate_asset(
            "DA_AmbientNpcSample3Config", "/Game/AmbientNpcBehavior/Sample3", source
        )
        if asset is None:
            raise RuntimeError("Failed to duplicate sample config")
        for key, value in PROPERTIES.items():
            asset.set_editor_property(key, value)
        asset.set_editor_property("seed", 1337)
        if not unreal.EditorAssetLibrary.save_loaded_asset(asset):
            raise RuntimeError("Failed to save sample config")
    # Do not overwrite later user edits on a rerun.
    if not isinstance(asset, unreal.BehaviorFrameworkConfig):
        raise RuntimeError("Sample destination is not a BehaviorFrameworkConfig")
    actual = {key: str(asset.get_editor_property(key)) for key in PROPERTIES}
    if actual != PROPERTIES:
        raise RuntimeError("Existing sample config differs; review it rather than overwrite it")
    report = {
        "asset": DESTINATION,
        "created": created,
        "class": asset.get_class().get_name(),
        "properties": actual,
        "engine": unreal.SystemLibrary.get_engine_version(),
        "scope": "Data Asset saved/read back and five JSON files parsed; no map changed or PIE started",
    }
    report_path = ROOT / "Saved/W1-02/asset-validation.json"
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    unreal.log("W1-02 ASSET PASS: " + DESTINATION)


main()
