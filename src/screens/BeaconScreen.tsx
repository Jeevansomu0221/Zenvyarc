import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { GlassCard } from '../components/GlassCard';
import { ProgressRing } from '../components/ProgressRing';
import { useApp } from '../context/AppContext';
import {
  BEACON,
  formatNumber,
  getMountain,
  MOUNTAINS,
} from '../data/mockData';
import { colors } from '../theme/colors';

export function BeaconScreen() {
  const insets = useSafeAreaInsets();
  const { sumi, hubBadge, user } = useApp();
  const sorted = [...MOUNTAINS].sort((a, b) => b.score - a.score);
  const leading = getMountain(BEACON.leadingMountainId);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader sumi={sumi} hubBadge={hubBadge} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 110 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>BEACON</Text>
        <Text style={styles.subtitle}>United steps. One light.</Text>

        <View style={styles.heroRow}>
          <ImageBackground
            source={require('../../assets/art/beacon-tower.png')}
            style={styles.hero}
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient
              colors={['transparent', 'rgba(7,6,5,0.85)']}
              style={styles.heroGrad}
            />
          </ImageBackground>

          <View style={styles.sideCol}>
            <GlassCard style={styles.chargeCard}>
              <ProgressRing progress={BEACON.charged / 100} size={110} stroke={10}>
                <Text style={styles.chargePct}>{BEACON.charged}%</Text>
                <Text style={styles.chargeLabel}>CHARGED</Text>
              </ProgressRing>
            </GlassCard>
            <GlassCard title="BEACON STATUS">
              <Text style={styles.statusText}>
                <Text style={{ color: leading.softColor }}>{leading.name}</Text>
                {' '}is leading the Beacon. Keep contributing!
              </Text>
            </GlassCard>
          </View>
        </View>

        <View style={styles.split}>
          <GlassCard title="MOUNTAINS" style={{ flex: 1 }}>
            {sorted.map((m, i) => (
              <View key={m.id} style={styles.standRow}>
                <Text style={styles.rank}>{i + 1}</Text>
                <View style={[styles.dot, { backgroundColor: m.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.mName}>{m.name}</Text>
                  {m.id === user?.mountainId ? (
                    <Text style={styles.yours}>Your mountain</Text>
                  ) : null}
                </View>
                <Text style={styles.mScore}>{formatNumber(m.score)}</Text>
              </View>
            ))}
            <Pressable style={styles.linkBtn}>
              <Text style={styles.linkText}>VIEW STANDINGS ›</Text>
            </Pressable>
          </GlassCard>
        </View>

        <View style={styles.statRow}>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statLabel}>YOUR CONTRIBUTION</Text>
            <Text style={styles.statValue}>
              {formatNumber(BEACON.userContributionSteps)}
            </Text>
            <Text style={styles.statSub}>Steps contributed this month</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statLabel}>YOUR RANK</Text>
            <Text style={styles.statValue}>{BEACON.userRank}</Text>
            <Text style={styles.statSub}>
              Among {getMountain(user!.mountainId).name}
            </Text>
          </GlassCard>
        </View>

        <Text style={styles.sectionTitle}>BEACON CHRONICLE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chronicle}>
          {BEACON.chronicle.map((c, i) => (
            <View key={c.name} style={styles.pedestal}>
              <Text style={styles.pedestalRank}>#{i + 1}</Text>
              <View
                style={[
                  styles.avatar,
                  { borderColor: getMountain(c.mountainId).color },
                ]}
              >
                <Text style={styles.avatarLetter}>{c.name[0]}</Text>
              </View>
              <Text style={styles.pedestalName} numberOfLines={1}>
                {c.name}
              </Text>
              <Text style={styles.pedestalSteps}>{formatNumber(c.steps)}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomRow}>
          <GlassCard title="MONTHLY WINNERS" style={{ flex: 1 }}>
            {BEACON.monthlyWinners.map((w) => (
              <View key={w.month} style={styles.winRow}>
                <Text style={styles.winMonth}>{w.month}</Text>
                <Text style={{ color: getMountain(w.mountainId).softColor, flex: 1, fontSize: 11, fontFamily: 'DMSans_700Bold' }}>
                  {getMountain(w.mountainId).name.split(' ')[0]}
                </Text>
                <Text style={styles.winPct}>{w.pct}%</Text>
              </View>
            ))}
          </GlassCard>
          <GlassCard title="HOW IT WORKS" style={{ flex: 1 }}>
            <Text style={styles.how}>1. Walk more — steps power the Beacon.</Text>
            <Text style={styles.how}>2. Compete — mountains fight for the top.</Text>
            <Text style={styles.how}>3. Light the Beacon at the monthly ceremony.</Text>
          </GlassCard>
        </View>
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
    letterSpacing: 3,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: -6,
  },
  heroRow: { flexDirection: 'row', gap: 10 },
  hero: {
    flex: 1.1,
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroGrad: { flex: 1 },
  sideCol: { flex: 1, gap: 10 },
  chargeCard: { alignItems: 'center', paddingVertical: 16 },
  chargePct: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 22,
  },
  chargeLabel: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 8,
    letterSpacing: 1,
  },
  statusText: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    lineHeight: 16,
  },
  split: { flexDirection: 'row' },
  standRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 7,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(232,176,74,0.12)',
  },
  rank: {
    color: colors.goldDim,
    fontFamily: 'DMSans_700Bold',
    width: 16,
    fontSize: 12,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  mName: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  yours: {
    color: colors.gold,
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
  },
  mScore: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  linkBtn: { marginTop: 10, alignItems: 'center' },
  linkText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  statRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1 },
  statLabel: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  statValue: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 22,
    marginTop: 6,
  },
  statSub: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 14,
    letterSpacing: 1.2,
  },
  chronicle: { gap: 12, paddingVertical: 4 },
  pedestal: {
    width: 88,
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 10,
  },
  pedestalRank: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    backgroundColor: '#1A120B',
  },
  avatarLetter: {
    color: colors.text,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 16,
  },
  pedestalName: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
  },
  pedestalSteps: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
    marginTop: 2,
  },
  bottomRow: { flexDirection: 'row', gap: 10 },
  winRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 5,
  },
  winMonth: {
    color: colors.textDim,
    fontFamily: 'DMSans_500Medium',
    fontSize: 11,
    width: 28,
  },
  winPct: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  how: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    lineHeight: 18,
    marginBottom: 6,
  },
});
