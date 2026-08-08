# Zenvyarc

Zenvy Arc — gamified self-improvement and fitness app.

## Stack

- Expo (React Native) + TypeScript
- Supabase (planned)

## Run locally

```bash
npm install
npm run web
```

## GitHub Actions

| Workflow | What it does |
|----------|----------------|
| **CI** | `npm ci` + TypeScript check |
| **Android Builds (GitHub Downloads)** | Builds AAB, APK, and developer APK on GitHub — download from **Artifacts** (no EAS) |

Trigger: **Actions → Android Builds (GitHub Downloads) → Run workflow**

After the run finishes, scroll to **Artifacts**:
- `zenvyarc-developer-apk`
- `zenvyarc-preview-apk`
- `zenvyarc-production-aab` ← upload this to Play Console

## Play Console upload (avoid common errors)

1. Download the **new** `.aab` from Artifacts (named like `zenvyarc-play-v1.0.1-XX.aab`).
2. In Play Console → Production/Testing → Create new release → **Upload the AAB**.
3. Each build auto-bumps `versionCode` so existing users can upgrade.
4. Do not save a release without attaching an AAB (causes “does not add or remove any app bundles”).
5. Do not re-upload an AAB that was already used (causes upgrade / empty release errors).
