# Encode Play upload keystore for GitHub Actions secrets
# Run AFTER downloading credentials from EAS:
#   npx eas-cli credentials  → Android → Download credentials to credentials.json

param(
  [string]$CredentialsPath = "credentials.json"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $CredentialsPath)) {
  Write-Host "Missing $CredentialsPath"
  Write-Host "Run: npx eas-cli credentials"
  Write-Host "  → Android → Credentials.json → Download from EAS"
  exit 1
}

$json = Get-Content $CredentialsPath -Raw | ConvertFrom-Json
$ks = $json.android.keystore

$keystoreFile = $ks.keystorePath
if (-not (Test-Path $keystoreFile)) {
  # credentials.json often uses relative path from project root
  $keystoreFile = Join-Path (Get-Location) $ks.keystorePath
}
if (-not (Test-Path $keystoreFile)) {
  Write-Host "Keystore file not found: $($ks.keystorePath)"
  exit 1
}

$bytes = [IO.File]::ReadAllBytes($keystoreFile)
$base64 = [Convert]::ToBase64String($bytes)

Write-Host ""
Write-Host "=== Add these GitHub Secrets ==="
Write-Host "Repo → Settings → Secrets and variables → Actions → New repository secret"
Write-Host ""
Write-Host "ANDROID_KEYSTORE_PASSWORD = $($ks.keystorePassword)"
Write-Host "ANDROID_KEY_ALIAS         = $($ks.keyAlias)"
Write-Host "ANDROID_KEY_PASSWORD      = $($ks.keyPassword)"
Write-Host ""
Write-Host "ANDROID_KEYSTORE_BASE64   = (paste from play-keystore-base64.txt)"
Write-Host ""

$out = Join-Path (Get-Location) "play-keystore-base64.txt"
Set-Content -Path $out -Value $base64 -NoNewline
Write-Host "Base64 written to: $out"
Write-Host ""

# Show SHA1 for verification
$keytool = "keytool"
$sha1 = & $keytool -list -v -keystore $keystoreFile -storepass $ks.keystorePassword -alias $ks.keyAlias 2>$null | Select-String "SHA1:"
Write-Host "Keystore SHA1: $($sha1.Line.Trim())"
Write-Host "Play expects:  SHA1: 8A:AE:46:9F:B2:13:B0:7F:C7:DB:2C:6A:55:E8:DA:A4:CE:5E:98:0C"
