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

## Build Android (AAB)

```bash
npx eas-cli build --platform android --profile production
```

## GitHub Actions

| Workflow | What it does |
|----------|----------------|
| **CI** | `npm ci` + TypeScript check |
| **Android Builds (GitHub Downloads)** | Builds AAB, APK, and developer APK on GitHub — **download from Artifacts** on the run page (no EAS) |

Trigger manually: **Actions → Android Builds (GitHub Downloads) → Run workflow**

After the run finishes, scroll to **Artifacts** at the bottom to download:
- `zenvyarc-developer-apk`
- `zenvyarc-preview-apk`
- `zenvyarc-production-aab`
