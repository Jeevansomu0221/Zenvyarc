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

Two workflows run on push to `main`:

| Workflow | What it does |
|----------|----------------|
| **CI** | `npm ci` + TypeScript check |
| **EAS Android Build** | Triggers EAS Android AAB build |

### One-time setup

1. Create an Expo access token: [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens)
2. In GitHub → **Settings → Secrets and variables → Actions**, add:
   - `EXPO_TOKEN` — your Expo access token

You can also run **EAS Android Build** manually from the Actions tab (production or preview APK profile).
