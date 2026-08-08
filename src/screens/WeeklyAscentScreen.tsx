import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { ProgressRing } from '../components/ProgressRing';
import { useApp } from '../context/AppContext';
import { formatNumber, getMountain, WEEKLY } from '../data/mockData';
import { colors } from '../theme/colors';

export function WeeklyAscentScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user, sumi } = useApp();
  const mountain = getMountain(user!.mountainId);
  const goalPct = Math.round((WEEKLY.totalSteps / WEEKLY.weeklyGoal) * 100);
  const maxDay = Math.max(...WEEKLY.days.map((d) => d.steps));

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.brand}>ZENVY ARC</Text>
        <View style={styles.sumiPill}>
          <Text style={styles.sumiText}>{formatNumber(sumi)} SUMI</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 40 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>WEEKLY ASCENT</Text>
        <Text style={styles.subtitle}>{WEEKLY.rangeLabel.replace('-', '–')}</Text>

        <ImageBackground
          source={require('../../assets/art/crimson-peak-hero.png')}
          style={styles.hero}
          imageStyle={{ borderRadius: 16 }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(7,6,5,0.88)']}
            style={styles.heroGrad}
          >
            <View style={styles.heroStats}>
              <View>
                <Text style={styles.totalLabel}>TOTAL STEPS</Text>
                <Text style={styles.totalValue}>{formatNumber(WEEKLY.totalSteps)}</Text>
                <Text style={styles.up}>↑ {WEEKLY.vsLastWeekPct}% vs last week</Text>
              </View>
              <ProgressRing progress={goalPct / 100} size={100} stroke={9}>
                <Text style={styles.ringPct}>{goalPct}%</Text>
                <Text style={styles.ringSub}>of {formatNumber(WEEKLY.weeklyGoal)}</Text>
              </ProgressRing>
            </View>
          </LinearGradient>
        </ImageBackground>

        <GlassCard title="1. WEEKLY JOURNEY">
          <View style={styles.chart}>
            {WEEKLY.days.map((d) => {
              const h = Math.max(12, (d.steps / maxDay) * 110);
              return (
                <View key={d.label} style={styles.barCol}>
                  {d.best ? <Text style={styles.crown}>👑</Text> : <View style={styles.spacer} />}
                  <Text style={[styles.barVal, d.best && { color: colors.goldBright }]}>
                    {(d.steps / 1000).toFixed(1)}K
                  </Text>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: h,
                        backgroundColor: d.best ? colors.orangeGlow : '#4A3A28',
                      },
                    ]}
                  />
                  <Text style={styles.barLabel}>{d.label}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.goalLine}>
            <Text style={styles.goalLineText}>— 10K Daily Goal</Text>
          </View>
          <Text style={styles.crush}>You crushed your goal on Saturday!</Text>
        </GlassCard>

        <Text style={styles.section}>2. PERFORMANCE</Text>
        <View style={styles.perfRow}>
          <GlassCard style={styles.perfCard}>
            <Text style={styles.perfIcon}>◎</Text>
            <Text style={styles.perfVal}>{formatNumber(WEEKLY.dailyAvg)}</Text>
            <Text style={styles.perfLabel}>Daily Average</Text>
          </GlassCard>
          <GlassCard style={styles.perfCard}>
            <Text style={styles.perfIcon}>👑</Text>
            <Text style={styles.perfVal}>{formatNumber(WEEKLY.bestDay.steps)}</Text>
            <Text style={styles.perfLabel}>{WEEKLY.bestDay.label}</Text>
          </GlassCard>
          <GlassCard style={styles.perfCard}>
            <Text style={styles.perfIcon}>🔥</Text>
            <Text style={styles.perfVal}>{WEEKLY.longestStreak.days} days</Text>
            <Text style={styles.perfLabel}>{WEEKLY.longestStreak.range}</Text>
          </GlassCard>
        </View>

        <GlassCard title="3. MOUNTAIN CONTRIBUTION">
          <Text style={[styles.peakName, { color: mountain.softColor }]}>
            {mountain.name.toUpperCase()}
          </Text>
          <Text style={styles.body}>
            You contributed {formatNumber(WEEKLY.totalSteps)} steps ({WEEKLY.mountainContributionPct}% of mountain progress).
          </Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: '2%' }]} />
          </View>
          <Text style={styles.note}>0% to 1% milestone</Text>
        </GlassCard>

        <GlassCard title="4. SUMI EARNED">
          <Text style={styles.bigSumi}>+{WEEKLY.sumiEarned} SUMI</Text>
          <Text style={styles.body}>
            {formatNumber(WEEKLY.totalSteps)} Steps → {WEEKLY.sumiEarned} SUMI
          </Text>
          <Text style={styles.note}>10 steps = 0.1 SUMI</Text>
        </GlassCard>

        <GlassCard title="5. GEO-GUARD VERIFICATION">
          <Text style={styles.verify}>🛡 STEP INTEGRITY – VERIFIED</Text>
          {[
            `${formatNumber(WEEKLY.totalSteps)} steps`,
            '7 activity sessions',
            'Location consistency',
            'No suspicious activity',
          ].map((item) => (
            <Text key={item} style={styles.check}>
              ✓ {item}
            </Text>
          ))}
        </GlassCard>

        <GlassCard title="COMPARE YOUR PROGRESS">
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>This Week</Text>
            <Text style={styles.compareVal}>{formatNumber(WEEKLY.totalSteps)}</Text>
          </View>
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>Last Week</Text>
            <Text style={styles.compareVal}>
              {formatNumber(WEEKLY.lastWeekSteps)}{' '}
              <Text style={{ color: colors.danger }}>↓ {WEEKLY.vsLastWeekPct}%</Text>
            </Text>
          </View>
          <View style={styles.compareRow}>
            <Text style={styles.compareLabel}>30 Days Avg</Text>
            <Text style={styles.compareVal}>
              {formatNumber(WEEKLY.avg30Days)}{' '}
              <Text style={{ color: colors.success }}>↑ 9.7%</Text>
            </Text>
          </View>
          <Text style={styles.quote}>“Discipline today. Legacy tomorrow.”</Text>
        </GlassCard>

        <Pressable style={styles.historyBtn}>
          <Text style={styles.historyText}>⏱ VIEW FULL ACTIVITY HISTORY ››</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { color: colors.gold, fontSize: 24, marginTop: -2 },
  brand: {
    color: colors.goldBright,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  sumiPill: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sumiText: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  scroll: { paddingHorizontal: 12, gap: 12 },
  title: {
    color: colors.goldBright,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 26,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: -6,
  },
  hero: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroGrad: { flex: 1, justifyContent: 'flex-end', padding: 14 },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
    letterSpacing: 1,
  },
  totalValue: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 32,
  },
  up: {
    color: colors.success,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  ringPct: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 18,
  },
  ringSub: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 8,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 150,
  },
  barCol: { alignItems: 'center', flex: 1 },
  crown: { fontSize: 10 },
  spacer: { height: 14 },
  barVal: {
    color: colors.textDim,
    fontFamily: 'DMSans_700Bold',
    fontSize: 8,
    marginBottom: 4,
  },
  bar: { width: 14, borderRadius: 5 },
  barLabel: {
    color: colors.textDim,
    fontFamily: 'DMSans_500Medium',
    fontSize: 9,
    marginTop: 4,
  },
  goalLine: { marginTop: 8 },
  goalLineText: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 10,
  },
  crush: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  perfRow: { flexDirection: 'row', gap: 8 },
  perfCard: { flex: 1, alignItems: 'center' },
  perfIcon: { fontSize: 16, marginBottom: 4 },
  perfVal: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    textAlign: 'center',
  },
  perfLabel: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 4,
  },
  peakName: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 16,
    marginBottom: 6,
  },
  body: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2A1E10',
    overflow: 'hidden',
    marginTop: 10,
  },
  fill: { height: '100%', backgroundColor: colors.goldBright },
  note: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    marginTop: 6,
  },
  bigSumi: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 28,
  },
  verify: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    marginBottom: 8,
  },
  check: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    marginBottom: 4,
  },
  compareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(232,176,74,0.12)',
  },
  compareLabel: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
  },
  compareVal: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  quote: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 12,
    textAlign: 'center',
  },
  historyBtn: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  historyText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    letterSpacing: 0.6,
  },
});
