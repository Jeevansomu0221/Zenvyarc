# Zenvyarc

Zenvy Arc — gamified self-improvement and fitness app.

## Stack

- Expo (React Native) + TypeScript
- Android package: `com.zenvy.arc`

## Run locally

```bash
npm install
npm run web
```

## GitHub Actions (separate builds)

Run **one** workflow at a time from **Actions**:

| Workflow | Artifact |
|----------|----------|
| **Build AAB (Play Console)** | `zenvyarc-production-aab` |
| **Build APK (Preview)** | `zenvyarc-preview-apk` |
| **Build Developer APK** | `zenvyarc-developer-apk` |

When the run is green → scroll to **Artifacts** → download.

## Play Console signing (required for AAB)

GitHub AAB builds must use the **same upload key** Play already registered (from your first EAS upload).

Play expects SHA1:
`8A:AE:46:9F:B2:13:B0:7F:C7:DB:2C:6A:55:E8:DA:A4:CE:5E:98:0C`

### One-time setup

1. Download keystore from EAS:
   ```bash
   npx eas-cli credentials
   ```
   → Android → **Download credentials to credentials.json**

2. Encode for GitHub (Windows):
   ```powershell
   .\scripts\encode-keystore-for-github.ps1
   ```

3. GitHub → **Settings → Secrets and variables → Actions** → add:
   - `ANDROID_KEYSTORE_BASE64` (from `play-keystore-base64.txt`)
   - `ANDROID_KEYSTORE_PASSWORD`
   - `ANDROID_KEY_ALIAS`
   - `ANDROID_KEY_PASSWORD`

4. Run **Build AAB (Play Console)** again.

## Play Console upload

1. Run **Build AAB (Play Console)** only.
2. When the run is green, scroll to **Artifacts** at the bottom → download **`zenvyarc-production-aab`** (ZIP containing the `.aab`).
3. Upload that `.aab` to a **new release** in Play Console.
