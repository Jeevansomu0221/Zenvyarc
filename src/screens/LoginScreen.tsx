import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { getMountain } from '../data/mockData';

export function LoginScreen() {
  const { loginWithGoogle } = useApp();
  const [busy, setBusy] = useState(false);

  const onGoogle = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    await loginWithGoogle();
    setBusy(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/art/crimson-peak-hero.png')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(0,0,0,0.35)', 'rgba(7,6,5,0.75)', 'rgba(7,6,5,0.97)']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <Image source={require('../../assets/art/logo-mark.png')} style={styles.logo} />
        <Text style={styles.brand}>ZENVY ARC</Text>
        <Text style={styles.tagline}>
          Make personal discipline feel like an adventure.
        </Text>

        <View style={styles.peaks}>
          {(['crimson', 'azure', 'emerald', 'golden'] as const).map((id) => {
            const m = getMountain(id);
            return (
              <View key={id} style={[styles.peakDot, { backgroundColor: m.color }]} />
            );
          })}
        </View>
        <Text style={styles.peakHint}>Your mountain is assigned when you enter</Text>

        <Pressable
          style={[styles.googleBtn, busy && styles.googleBtnBusy]}
          onPress={onGoogle}
          disabled={busy}
        >
          {busy ? (
            <ActivityIndicator color="#1A1A1A" />
          ) : (
            <>
              <View style={styles.gBadge}>
                <Text style={styles.gLetter}>G</Text>
              </View>
              <Text style={styles.googleText}>Continue with Google</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.legal}>
          Mock login for MVP preview — Supabase auth comes next.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  content: {
    paddingHorizontal: 28,
    paddingBottom: 56,
    alignItems: 'center',
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginBottom: 14,
  },
  brand: {
    color: colors.goldBright,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 34,
    letterSpacing: 3,
  },
  tagline: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    maxWidth: 280,
  },
  peaks: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
    marginBottom: 8,
  },
  peakDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  peakHint: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    marginBottom: 28,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 28,
    width: '100%',
    maxWidth: 340,
  },
  googleBtnBusy: { opacity: 0.8 },
  gBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gLetter: {
    color: colors.white,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  googleText: {
    color: '#1A1A1A',
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
  },
  legal: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    marginTop: 16,
    textAlign: 'center',
  },
});
