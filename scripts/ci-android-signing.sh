#!/usr/bin/env bash
set -euo pipefail

# Play Console upload key fingerprint (must match first upload / EAS keystore)
EXPECTED_PLAY_SHA1="8AAE469FB213B07FC7DB2C6A55E8DAA4CE5E980C"

KEYSTORE_PATH="android/app/release.keystore"

normalize_sha1() {
  echo "$1" | tr -d ':' | tr '[:lower:]' '[:upper:]' | tr -d ' '
}

verify_keystore_sha1() {
  local keystore="$1"
  local store_pass="$2"
  local alias="$3"
  local sha1
  sha1=$(keytool -list -v -keystore "$keystore" -storepass "$store_pass" -alias "$alias" 2>/dev/null \
    | grep -i "SHA1:" | head -1 | sed 's/.*SHA1: //')
  normalize_sha1 "$sha1"
}

export_signing_env() {
  export CI_ANDROID_KEYSTORE="$PWD/$KEYSTORE_PATH"
  export CI_ANDROID_STORE_PASSWORD="$STORE_PASS"
  export CI_ANDROID_KEY_ALIAS="$KEY_ALIAS"
  export CI_ANDROID_KEY_PASSWORD="$KEY_PASS"

  if [ -n "${GITHUB_ENV:-}" ]; then
    {
      echo "CI_ANDROID_KEYSTORE=$CI_ANDROID_KEYSTORE"
      echo "CI_ANDROID_STORE_PASSWORD=$CI_ANDROID_STORE_PASSWORD"
      echo "CI_ANDROID_KEY_ALIAS=$CI_ANDROID_KEY_ALIAS"
      echo "CI_ANDROID_KEY_PASSWORD=$CI_ANDROID_KEY_PASSWORD"
    } >> "$GITHUB_ENV"
  fi
}

if [ -n "${ANDROID_KEYSTORE_BASE64:-}" ]; then
  echo "Using Play upload keystore from ANDROID_KEYSTORE_BASE64 secret"
  mkdir -p android/app
  echo "$ANDROID_KEYSTORE_BASE64" | base64 -d > "$KEYSTORE_PATH"

  STORE_PASS="${ANDROID_KEYSTORE_PASSWORD:?ANDROID_KEYSTORE_PASSWORD secret required}"
  KEY_ALIAS="${ANDROID_KEY_ALIAS:?ANDROID_KEY_ALIAS secret required}"
  KEY_PASS="${ANDROID_KEY_PASSWORD:-$STORE_PASS}"

  ACTUAL_SHA1=$(verify_keystore_sha1 "$KEYSTORE_PATH" "$STORE_PASS" "$KEY_ALIAS")
  echo "Keystore SHA1: $ACTUAL_SHA1"

  if [ "${REQUIRE_PLAY_KEYSTORE:-}" = "true" ]; then
    if [ "$ACTUAL_SHA1" != "$EXPECTED_PLAY_SHA1" ]; then
      echo "ERROR: Wrong signing key for Play Console."
      echo "Expected SHA1: $EXPECTED_PLAY_SHA1"
      echo "Actual SHA1:   $ACTUAL_SHA1"
      echo "Download your upload keystore from EAS (eas credentials) and update GitHub secrets."
      exit 1
    fi
    echo "Play upload key verified ✓"
  fi

  export_signing_env
  echo "Release keystore ready at $CI_ANDROID_KEYSTORE"
  exit 0
fi

if [ "${REQUIRE_PLAY_KEYSTORE:-}" = "true" ]; then
  echo "ERROR: Play AAB builds require GitHub secrets:"
  echo "  ANDROID_KEYSTORE_BASE64"
  echo "  ANDROID_KEYSTORE_PASSWORD"
  echo "  ANDROID_KEY_ALIAS"
  echo "  ANDROID_KEY_PASSWORD (optional if same as store password)"
  echo ""
  echo "Get the keystore from EAS: npx eas-cli credentials → Android → Download to credentials.json"
  exit 1
fi

# Fallback: local CI test keystore (NOT valid for Play Console)
echo "WARNING: Using temporary CI keystore — do not upload to Play Console"
CI_PATH="android/app/ci-release.keystore"
KEY_ALIAS="zenvyarc-ci"
STORE_PASS="zenvyarc-ci"
KEY_PASS="zenvyarc-ci"

if [ ! -f "$CI_PATH" ]; then
  keytool -genkeypair -v \
    -storetype PKCS12 \
    -keystore "$CI_PATH" \
    -alias "$KEY_ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -storepass "$STORE_PASS" \
    -keypass "$KEY_PASS" \
    -dname "CN=Zenvy Arc, OU=CI, O=Zenvyarc, L=NA, S=NA, C=US"
fi

KEYSTORE_PATH="$CI_PATH"
export_signing_env
echo "CI keystore ready at $CI_ANDROID_KEYSTORE"
