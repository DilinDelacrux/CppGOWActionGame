"""UE Python commandlet: create an isolated W1-03 test level without touching the old demo."""
import json
from pathlib import Path
import unreal

LEVEL = "/Game/AmbientNpcBehavior/Sample3/L_AmbientNpcSample3"
CONFIG = "/Game/AmbientNpcBehavior/Sample3/DA_AmbientNpcSample3Config"
MANAGER = "/Game/AmbientNpcBehavior/BP_AmbientNpcDataDrivenScheduleDemo.BP_AmbientNpcDataDrivenScheduleDemo_C"


def main():
    levels = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
    actors = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
    created = not unreal.EditorAssetLibrary.does_asset_exist(LEVEL)
    if created:
        if not levels.new_level(LEVEL):
            raise RuntimeError("Could not create sample level")
        config = unreal.load_asset(CONFIG)
        manager_class = unreal.load_class(None, MANAGER)
        if config is None or manager_class is None:
            raise RuntimeError("Sample config or existing TS manager blueprint is missing")
        manager = actors.spawn_actor_from_class(manager_class, unreal.Vector(0, 0, 0))
        manager.set_actor_label("SpringCampManager")
        manager.set_editor_property("config", config)
        world = unreal.get_editor_subsystem(unreal.UnrealEditorSubsystem).get_editor_world()
        world.get_world_settings().set_editor_property("default_game_mode", unreal.GameModeBase.static_class())
        actors.spawn_actor_from_class(unreal.PlayerStart, unreal.Vector(0, 0, 120))
        if not levels.save_current_level():
            raise RuntimeError("Could not save sample level")
    elif not levels.load_level(LEVEL):
        raise RuntimeError("Could not read existing sample level")
    managers = [actor for actor in actors.get_all_level_actors() if isinstance(actor, unreal.BehaviorFrameworkManagerBase)]
    if len(managers) != 1 or managers[0].get_editor_property("config").get_path_name().split('.')[0] != CONFIG:
        raise RuntimeError("Sample level must have exactly one manager using the sample config; not overwriting existing edits")
    root = Path(unreal.Paths.convert_relative_path_to_full(unreal.Paths.project_dir())).resolve()
    output = root / "Saved/W1-03/level-validation.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({"level": LEVEL, "created": created, "managers": len(managers),
                                  "config": CONFIG, "engine": unreal.SystemLibrary.get_engine_version()}, indent=2), encoding="utf-8")
    unreal.log("W1-03 LEVEL PASS: " + LEVEL)


main()
