using UnrealBuildTool;

public class AudioCppRuntime : ModuleRules
{
	public AudioCppRuntime(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
		PublicDependencyModuleNames.AddRange(new[] { "Core", "CoreUObject", "Engine", "HTTP", "Json", "JsonUtilities" });
		PrivateDependencyModuleNames.Add("DeveloperSettings");
	}
}
