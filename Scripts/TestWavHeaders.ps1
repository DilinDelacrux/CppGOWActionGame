param(
    [string]$Path = (Join-Path $PSScriptRoot "..\Saved\AudioCpp\Generated"),
    [switch]$Repair
)

$files = if (Test-Path -LiteralPath $Path -PathType Leaf) {
    @(Get-Item -LiteralPath $Path)
} elseif (Test-Path -LiteralPath $Path -PathType Container) {
    @(Get-ChildItem -LiteralPath $Path -Filter *.wav -File -Recurse)
} else {
    throw "WAV path does not exist: $Path"
}

$invalid = 0
$repaired = 0
foreach ($file in $files) {
    $bytes = [IO.File]::ReadAllBytes($file.FullName)
    if ($bytes.Length -lt 20 -or [Text.Encoding]::ASCII.GetString($bytes, 0, 4) -ne "RIFF" -or
        [Text.Encoding]::ASCII.GetString($bytes, 8, 4) -ne "WAVE") {
        Write-Warning "Not a RIFF/WAVE file: $($file.FullName)"
        $invalid++
        continue
    }

    $dataSizeOffset = -1
    $offset = 12
    while ($offset + 8 -le $bytes.Length) {
        $chunkId = [Text.Encoding]::ASCII.GetString($bytes, $offset, 4)
        $chunkSize = [BitConverter]::ToUInt32($bytes, $offset + 4)
        if ($chunkId -eq "data") {
            $dataSizeOffset = $offset + 4
            break
        }
        $next = [int64]$offset + 8 + $chunkSize + ($chunkSize -band 1)
        if ($next -gt $bytes.Length) { break }
        $offset = [int]$next
    }

    if ($dataSizeOffset -lt 0) {
        Write-Warning "Missing or malformed data chunk: $($file.FullName)"
        $invalid++
        continue
    }

    $expectedRiffSize = [uint32]($bytes.Length - 8)
    $expectedDataSize = [uint32]($bytes.Length - $dataSizeOffset - 4)
    $riffSize = [BitConverter]::ToUInt32($bytes, 4)
    $dataSize = [BitConverter]::ToUInt32($bytes, $dataSizeOffset)
    if ($riffSize -ne $expectedRiffSize -or $dataSize -ne $expectedDataSize) {
        if (-not $Repair) {
            Write-Warning "$($file.Name): RIFF=$riffSize/$expectedRiffSize, data=$dataSize/$expectedDataSize"
            $invalid++
            continue
        }
        [BitConverter]::GetBytes($expectedRiffSize).CopyTo($bytes, 4)
        [BitConverter]::GetBytes($expectedDataSize).CopyTo($bytes, $dataSizeOffset)
        [IO.File]::WriteAllBytes($file.FullName, $bytes)
        $repaired++
    }
}

Write-Output "WAV header check: files=$($files.Count), repaired=$repaired, invalid=$invalid"
if ($invalid -gt 0) { exit 1 }
