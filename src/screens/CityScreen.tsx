import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { GlassCard } from '../components/GlassCard';
import { ProgressRing } from '../components/ProgressRing';
import { useApp } from '../context/AppContext';
import { CITY, formatNumber, getMountain, MOUNTAINS } from '../data/mockData';
import { colors } from '../theme/colors';

export function CityScreen() {
  const insets = useSafeAreaInsets();
  const { user, sumi, hubBadge } = useApp();
  const myMountain = getMountain(user!.mountainId);
  const [selected, setSelected] = useState(user!.mountainId);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader sumi={sumi} hubBadge={hubBadge} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 110 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>ZENVY CITY</Text>
        <Text style={styles.subtitle}>Four Mountains. One City. One Purpose.</Text>
        <Pressable style={styles.guideBtn}>
          <Text style={styles.guideText}>CITY GUIDE</Text>
        </Pressable>

        <View style={styles.stage}>
          {/* Peak selector */}
          <View style={styles.peakRail}>
            {MOUNTAINS.map((m) => {
              const active = selected === m.id;
              const mine = m.id === user!.mountainId;
              return (
                <Pressable
                  key={m.id}
                  style={[styles.peakChip, active && { borderColor: m.softColor }]}
                  onPress={() => setSelected(m.id)}
                >
                  <View style={[styles.peakDot, { backgroundColor: m.color }]} />
                  <Text style={[styles.peakName, active && { color: m.softColor }]}>
                    {m.name.split(' ')[0]}
                  </Text>
                  {mine ? <Text style={styles.yours}>Your Mountain</Text> : null}
                </Pressable>
              );
            })}
          </View>

          <ImageBackground
            source={require('../../assets/art/zenvy-city.png')}
            style={styles.cityArt}
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.05)', 'rgba(7,6,5,0.35)', 'rgba(7,6,5,0.85)']}
              style={styles.cityGrad}
            >
              <View style={[styles.marker, { top: '12%', right: '18%' }]}>
                <Text style={styles.markerText}>Sovereign District</Text>
              </View>
              <View style={[styles.marker, { top: '32%', left: '10%' }]}>
                <Text style={styles.markerText}>Guardian District</Text>
              </View>
              <View style={[styles.marker, { top: '52%', right: '12%' }]}>
                <Text style={styles.markerText}>Acolyte District</Text>
              </View>
              <View style={[styles.marker, { bottom: '18%', left: '16%' }]}>
                <Text style={styles.markerText}>Citizen Quarters</Text>
              </View>
            </LinearGradient>
          </ImageBackground>

          <GlassCard style={styles.progressCard}>
            <ProgressRing progress={CITY.progressPct / 100} size={100} stroke={9}>
              <Text style={styles.pct}>{CITY.progressPct}%</Text>
            </ProgressRing>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.progressTitle}>CITY PROGRESS</Text>
              <Text style={styles.progressSub}>
                {formatNumber(CITY.subscribers)} / {formatNumber(CITY.goal)} citizens
              </Text>
              <Text style={styles.unlock}>Next: {CITY.nextUnlock}</Text>
              <Pressable style={styles.linkBtn}>
                <Text style={styles.linkText}>View live mountain contributions ›</Text>
              </Pressable>
            </View>
          </GlassCard>
        </View>

        <GlassCard title="YOUR RESIDENCE">
          <View style={styles.residence}>
            <Image
              source={require('../../assets/art/zenvy-city.png')}
              style={styles.apt}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.aptName}>{CITY.residence.name}</Text>
              <Text style={styles.aptDetail}>{CITY.residence.detail}</Text>
              {CITY.residence.buffs.map((b) => (
                <Text key={b} style={styles.buff}>
                  • {b}
                </Text>
              ))}
              <Pressable style={styles.ghostBtn}>
                <Text style={styles.ghostText}>RESIDENCE INFO</Text>
              </Pressable>
            </View>
          </View>
        </GlassCard>

        <Text style={styles.exploreTitle}>EXPLORE THE CITY</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.exploreRow}>
          {CITY.explore.map((item) => (
            <View key={item.id} style={styles.exploreCard}>
              <Text style={styles.exploreIcon}>{item.icon}</Text>
              <Text style={styles.exploreName}>{item.name}</Text>
              <View style={styles.lock}>
                <Text style={styles.lockText}>🔒 Coming Soon</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.footerNote}>
          Viewing {getMountain(selected).name} · Affiliated with {myMountain.name}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 12, gap: 12 },
  title: {
    color: colors.goldBright,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 28,
    textAlign: 'center',
    letterSpacing: 2,
    marginTop: 4,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: -4,
  },
  guideBtn: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  guideText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  stage: { gap: 10 },
  peakRail: { gap: 8 },
  peakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.bgCardSoft,
  },
  peakDot: { width: 10, height: 10, borderRadius: 5 },
  peakName: {
    color: colors.textMuted,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    flex: 1,
  },
  yours: {
    color: colors.gold,
    fontFamily: 'DMSans_500Medium',
    fontSize: 9,
  },
  cityArt: {
    height: 320,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cityGrad: { flex: 1 },
  marker: {
    position: 'absolute',
    backgroundColor: 'rgba(10,8,5,0.78)',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  markerText: {
    color: colors.goldBright,
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
  },
  progressCard: { flexDirection: 'row', alignItems: 'center' },
  pct: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 20,
  },
  progressTitle: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  progressSub: {
    color: colors.text,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    marginTop: 4,
  },
  unlock: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    marginTop: 4,
  },
  linkBtn: { marginTop: 8 },
  linkText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
  },
  residence: { flexDirection: 'row', gap: 12 },
  apt: { width: 96, height: 96, borderRadius: 10 },
  aptName: {
    color: colors.text,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 14,
  },
  aptDetail: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    marginBottom: 6,
  },
  buff: {
    color: colors.gold,
    fontFamily: 'DMSans_500Medium',
    fontSize: 11,
    marginBottom: 2,
  },
  ghostBtn: {
    alignSelf: 'flex-start',
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ghostText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  exploreTitle: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 14,
    letterSpacing: 1.2,
    marginTop: 4,
  },
  exploreRow: { gap: 10, paddingVertical: 4 },
  exploreCard: {
    width: 120,
    height: 110,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  exploreIcon: { fontSize: 28, marginBottom: 6 },
  exploreName: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
    textAlign: 'center',
  },
  lock: { marginTop: 6 },
  lockText: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
  },
  footerNote: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
});
