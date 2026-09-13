"""Import bundled static fonts in UE Editor Python (no UI changes).

Use the editor, not the PythonScript commandlet: FontFace import needs Slate.
"""
import hashlib
import json
from pathlib import Path

import unreal


ROOT = Path(unreal.Paths.convert_relative_path_to_full(unreal.Paths.project_dir())).resolve()
SOURCE = ROOT / "SourceArt/Fonts/Western"
DESTINATION = "/Game/UI/Fonts/Western"


def main():
    manifest = json.loads((SOURCE / "manifest.json").read_text(encoding="utf-8"))
    # Validate all downloaded inputs before creating any assets.
    for item in manifest["files"]:
        source = SOURCE / item["path"]
        source.resolve().relative_to(SOURCE)
        if hashlib.sha256(source.read_bytes()).hexdigest() != item["sha256"]:
            raise RuntimeError(f"Font source checksum mismatch: {source}")

    report = []
    for item in manifest["files"]:
        if not item["path"].endswith(".ttf"):
            continue
        source = SOURCE / item["path"]
        family = source.parent.name
        name = item["asset_name"]
        face_path = f"{DESTINATION}/{family}/{name}"
        font_path = face_path + "_Font"
        face = unreal.load_asset(face_path) if unreal.EditorAssetLibrary.does_asset_exist(face_path) else None
        font = unreal.load_asset(font_path) if unreal.EditorAssetLibrary.does_asset_exist(font_path) else None
        created = face is None and font is None
        if (face is None) != (font is None):
            raise RuntimeError(f"Incomplete existing font pair; inspect before reimport: {face_path}")
        if created:
            factory = unreal.FontFileImportFactory()
            factory.set_editor_property("batch_create_font_asset", unreal.BatchCreateFontAsset.YES)
            task = unreal.AssetImportTask()
            task.set_editor_property("filename", str(source))
            task.set_editor_property("destination_path", f"{DESTINATION}/{family}")
            task.set_editor_property("destination_name", name)
            task.set_editor_property("automated", True)
            task.set_editor_property("replace_existing", False)
            task.set_editor_property("save", False)
            task.set_editor_property("factory", factory)
            unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks([task])
            face = unreal.load_asset(face_path)
            font = unreal.load_asset(font_path)
        if not isinstance(face, unreal.FontFace) or not isinstance(font, unreal.Font):
            raise RuntimeError(f"Missing or invalid Font/FontFace: {face_path}")
        if created:
            # Embedded font data is used at runtime; this is editor-only provenance.
            # Keep it project-relative rather than recording this workstation's drive.
            face.set_editor_property("source_filename", source.relative_to(ROOT).as_posix())
            face.set_editor_property("loading_policy", unreal.FontLoadingPolicy.INLINE)
            for asset in (face, font):
                if not unreal.EditorAssetLibrary.save_loaded_asset(asset):
                    raise RuntimeError(f"Could not save {asset.get_path_name()}")
        if font.get_editor_property("font_cache_type") != unreal.FontCacheType.RUNTIME:
            raise RuntimeError(f"Font is not runtime-cached: {font_path}")
        registry = unreal.AssetRegistryHelpers.get_asset_registry()
        registry.scan_files_synchronous([
            str(ROOT / "Content" / (path.removeprefix("/Game/") + ".uasset"))
            for path in (face_path, font_path)
        ], True)
        dependencies = registry.get_dependencies(
            font_path, unreal.AssetRegistryDependencyOptions(include_hard_package_references=True))
        if face_path not in [str(path) for path in (dependencies or [])]:
            raise RuntimeError(f"Font does not reference its FontFace: {font_path}")
        if face.get_editor_property("loading_policy") != unreal.FontLoadingPolicy.INLINE:
            raise RuntimeError(f"FontFace is not embedded: {face_path}")
        if face.get_editor_property("source_filename") != source.relative_to(ROOT).as_posix():
            raise RuntimeError(f"FontFace source is not project-relative: {face_path}")
        report.append({"font": font_path, "face": face_path, "created": created,
                       "source": source.relative_to(ROOT).as_posix()})
    result = ROOT / "Saved/FontImport/validation.json"
    result.parent.mkdir(parents=True, exist_ok=True)
    result.write_text(json.dumps({"engine": unreal.SystemLibrary.get_engine_version(),
                                  "fonts": report}, indent=2), encoding="utf-8")
    unreal.log(f"WESTERN FONTS PASS: {len(report)} Font/FontFace pairs")


main()
