param(
    [Parameter(Mandatory = $true)]
    [string]$VoiceId,
    [string]$Text = "你好，这是游戏角色语音测试。",
    [string]$ApiUrl = "https://dashscope.aliyuncs.com/api/v1/services/audio/tts/SpeechSynthesizer",
    [string]$ModelId = "cosyvoice-v3.5-flash"
)

$apiKey = [Environment]::GetEnvironmentVariable("DASHSCOPE_API_KEY")
if ([string]::IsNullOrWhiteSpace($apiKey)) {
    $apiKey = [Environment]::GetEnvironmentVariable("DASHSCOPE_API_KEY", "User")
}
if ([string]::IsNullOrWhiteSpace($apiKey)) {
    throw "DASHSCOPE_API_KEY is not set in this process."
}

$body = @{
    model = $ModelId
    input = @{
        text = $Text
        voice = $VoiceId
        format = "wav"
        sample_rate = 24000
        language_hints = @("zh")
    }
} | ConvertTo-Json -Depth 4

$response = Invoke-RestMethod -Method Post -Uri $ApiUrl -Headers @{ Authorization = "Bearer $apiKey" } -ContentType "application/json" -Body $body
$audioUrl = $response.output.audio.url
if ([string]::IsNullOrWhiteSpace($audioUrl)) {
    throw "CosyVoice response did not contain output.audio.url: $($response | ConvertTo-Json -Depth 6 -Compress)"
}

$outputPath = Join-Path $PSScriptRoot "CosyVoiceTest.wav"
Invoke-WebRequest -Uri $audioUrl -OutFile $outputPath
& (Join-Path $PSScriptRoot "TestWavHeaders.ps1") -Path $outputPath -Repair
if ($LASTEXITCODE -ne 0) { throw "Downloaded output is not a valid WAV file: $outputPath" }

Write-Output "CosyVoice API test passed: $outputPath"
