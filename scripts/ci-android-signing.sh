#!/usr/bin/env bash
set -euo pipefail

KEYSTORE_PATH="android/app/ci-release.keystore"
KEYSTORE_PASS="zenvyarc-ci"
KEY_ALIAS="zenvyarc-ci"
KEY_PASS="zenvyarc-ci"

if [ ! -f "$KEYSTORE_PATH" ]; then
  keytool -genkeypair -v \
    -storetype PKCS12 \
    -keystore "$KEYSTORE_PATH" \
    -alias "$KEY_ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -storepass "$KEYSTORE_PASS" \
    -keypass "$KEY_PASS" \
    -dname "CN=Zenvy Arc, OU=CI, O=Zenvyarc, L=NA, S=NA, C=US"
fi

export CI_ANDROID_KEYSTORE="$PWD/$KEYSTORE_PATH"
export CI_ANDROID_STORE_PASSWORD="$KEYSTORE_PASS"
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

echo "CI Android keystore ready at $CI_ANDROID_KEYSTORE"
