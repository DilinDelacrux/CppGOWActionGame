$ErrorActionPreference = 'Stop'

# All project paths are anchored to this script, not the caller's working directory.
$projectRoot = Split-Path -Parent $PSScriptRoot
$project = Get-Content -LiteralPath (Join-Path $projectRoot 'CppGOWActionGame.uproject') -Raw | ConvertFrom-Json

if ($env:UE_ENGINE_DIR) {
    $candidates = @($env:UE_ENGINE_DIR)
} else {
    $association = $project.EngineAssociation
    $candidates = @(
        Get-ItemPropertyValue -LiteralPath 'HKCU:\Software\Epic Games\Unreal Engine\Builds' -Name $association -ErrorAction SilentlyContinue
        Get-ItemPropertyValue -LiteralPath "HKLM:\SOFTWARE\EpicGames\Unreal Engine\$association" -Name InstalledDirectory -ErrorAction SilentlyContinue
        Get-ItemPropertyValue -LiteralPath 'HKLM:\SOFTWARE\EpicGames\Unreal Engine\5.8' -Name InstalledDirectory -ErrorAction SilentlyContinue
    )
}

foreach ($candidate in $candidates) {
    if (-not $candidate) { continue }
    if (-not [IO.Path]::IsPathRooted($candidate)) {
        $candidate = Join-Path $projectRoot $candidate
    }
    if (Test-Path -LiteralPath (Join-Path $candidate 'Engine\Build\BatchFiles\Build.bat')) {
        (Resolve-Path -LiteralPath $candidate).Path
        exit 0
    }
}

throw 'Cannot locate UE 5.8. Register the project engine or set UE_ENGINE_DIR (relative paths are based on the project root).'
