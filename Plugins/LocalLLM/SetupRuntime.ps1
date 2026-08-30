$ErrorActionPreference = 'Stop'

$release = 'b10621'
$expectedHash = '2672d85bf87c8280d94dee01eb6a86280046878f70a07d786a93637fa9081163'
$archiveName = "llama-$release-bin-win-vulkan-x64.zip"
$downloadUrl = "https://github.com/ggml-org/llama.cpp/releases/download/$release/$archiveName"
$runtimeDirectory = Join-Path $PSScriptRoot 'ThirdParty\llama.cpp\Win64'
$archivePath = Join-Path ([IO.Path]::GetTempPath()) $archiveName
$extractDirectory = Join-Path ([IO.Path]::GetTempPath()) ("llama-runtime-" + [guid]::NewGuid().ToString('N'))

try {
    Invoke-WebRequest -UseBasicParsing $downloadUrl -OutFile $archivePath
    $actualHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $archivePath).Hash.ToLowerInvariant()
    if ($actualHash -ne $expectedHash) {
        throw "llama.cpp archive checksum mismatch. Expected $expectedHash, got $actualHash."
    }

    New-Item -ItemType Directory -Path $extractDirectory | Out-Null
    New-Item -ItemType Directory -Path $runtimeDirectory -Force | Out-Null
    Expand-Archive -LiteralPath $archivePath -DestinationPath $extractDirectory

    Copy-Item -LiteralPath (Join-Path $extractDirectory 'llama-server.exe') -Destination $runtimeDirectory -Force
    Get-ChildItem -LiteralPath $extractDirectory -File -Filter '*.dll' |
        Copy-Item -Destination $runtimeDirectory -Force

    Write-Host "Installed llama.cpp $release Vulkan runtime in $runtimeDirectory"
}
finally {
    if (Test-Path -LiteralPath $extractDirectory) {
        Remove-Item -LiteralPath $extractDirectory -Recurse -Force
    }
    if (Test-Path -LiteralPath $archivePath) {
        Remove-Item -LiteralPath $archivePath -Force
    }
}
