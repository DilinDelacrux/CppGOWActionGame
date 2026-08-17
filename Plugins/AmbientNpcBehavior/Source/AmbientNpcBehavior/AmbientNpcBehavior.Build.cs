using UnrealBuildTool;

public class AmbientNpcBehavior : ModuleRules
{
	public AmbientNpcBehavior(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.NoSharedPCHs;

		// The vendored framework is plain C++20 and is compiled directly into
		// this module, so unity builds are disabled to keep translation units
		// independent.
		bUseUnity = false;
		CppStandard = CppStandardVersion.Cpp20;
		// The vendored framework uses dynamic_cast internally; UE disables RTTI
		// (/GR-) by default, so enable it for this module.
		bUseRTTI = true;

		PublicDependencyModuleNames.AddRange(
			new string[]
			{
				"Core",
				"CoreUObject",
				"Engine"
			}
		);

		string PrivatePath = ModuleDirectory + "/Private";
		string FrameworkIncludePath = PrivatePath + "/Framework/include";
		string FrameworkSourcePath = PrivatePath + "/Framework/src";
		string ThirdPartyPath = PrivatePath + "/ThirdParty";

		PrivateIncludePaths.AddRange(
			new string[]
			{
				FrameworkIncludePath,
				FrameworkSourcePath,
				ThirdPartyPath
			}
		);
	}
}
