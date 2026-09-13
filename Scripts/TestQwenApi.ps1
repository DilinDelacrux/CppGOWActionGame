param(
    [string]$Text = "村里的铁匠今天为什么提前关门？",
    [string]$ApiUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    [string]$ModelId = "qwen-flash"
)

$apiKey = [Environment]::GetEnvironmentVariable("DASHSCOPE_API_KEY")
if ([string]::IsNullOrWhiteSpace($apiKey)) {
    $apiKey = [Environment]::GetEnvironmentVariable("DASHSCOPE_API_KEY", "User")
}
if ([string]::IsNullOrWhiteSpace($apiKey)) {
    throw "DASHSCOPE_API_KEY is not set."
}

$body = @{
    model = $ModelId
    messages = @(
        @{ role = "system"; content = "你是一名中世纪村民。只回答一句不超过三十个汉字的话，不要使用 Markdown。" }
        @{ role = "user"; content = $Text }
    )
    max_completion_tokens = 96
    temperature = 0.7
    enable_thinking = $false
    stream = $false
} | ConvertTo-Json -Depth 6

$response = Invoke-RestMethod -Method Post -Uri $ApiUrl -Headers @{ Authorization = "Bearer $apiKey" } -ContentType "application/json" -Body $body
$answer = $response.choices[0].message.content
if ([string]::IsNullOrWhiteSpace($answer)) {
    throw "Qwen response did not contain choices[0].message.content."
}

Write-Output "Qwen API test passed: $answer"
