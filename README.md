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

## Play Console

1. Run **Build AAB (Play Console)** only.
2. Download the `.aab` (package must be `com.zenvy.arc`).
3. Upload that AAB into a new release.
