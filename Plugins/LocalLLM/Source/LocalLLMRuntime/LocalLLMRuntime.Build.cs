using UnrealBuildTool;

public class LocalLLMRuntime : ModuleRules
{
	public LocalLLMRuntime(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
		PublicDependencyModuleNames.AddRange(new[] { "Core", "CoreUObject", "Engine", "HTTP", "Json", "JsonUtilities" });
		PrivateDependencyModuleNames.Add("DeveloperSettings");
	}
}
