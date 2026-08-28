using UnrealBuildTool;
using System.IO;

public class LocalLLMRuntime : ModuleRules
{
	public LocalLLMRuntime(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
		PublicDependencyModuleNames.AddRange(new[] { "Core", "CoreUObject", "Engine", "HTTP", "Json", "JsonUtilities" });
		PrivateDependencyModuleNames.AddRange(new[] { "DeveloperSettings", "Projects" });

		if (Target.Platform == UnrealTargetPlatform.Win64)
		{
			string RuntimeDirectory = Path.Combine(PluginDirectory, "ThirdParty", "llama.cpp", "Win64");
			if (Directory.Exists(RuntimeDirectory))
			{
				foreach (string FilePath in Directory.GetFiles(RuntimeDirectory, "*", SearchOption.AllDirectories))
				{
					string Extension = Path.GetExtension(FilePath).ToLowerInvariant();
					if (Extension == ".exe" || Extension == ".dll")
					{
						RuntimeDependencies.Add("$(BinaryOutputDir)/" + Path.GetRelativePath(RuntimeDirectory, FilePath), FilePath, StagedFileType.NonUFS);
					}
				}
			}
		}
	}
}
