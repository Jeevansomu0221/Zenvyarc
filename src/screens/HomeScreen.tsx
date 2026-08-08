import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { GlassCard } from '../components/GlassCard';
import { ProgressRing } from '../components/ProgressRing';
import { useApp, useTodaySumi } from '../context/AppContext';
import { useStepTracking } from '../hooks/useStepTracking';
import {
  BEACON,
  formatNumber,
  GEO_GUARD,
  getMountain,
  RIVALRY,
  WEEKLY,
} from '../data/mockData';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/RootNavigator';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, sumi, hubBadge, stepGoal } = useApp();
  const steps = useStepTracking();
  const todaySumi = useTodaySumi(steps);
  const mountain = getMountain(user!.mountainId);
  const left = getMountain(RIVALRY.left.mountainId);
  const right = getMountain(RIVALRY.right.mountainId);
  const totalRival = RIVALRY.left.score + RIVALRY.right.score;
  const leftPct = RIVALRY.left.score / totalRival;
  const goalPct = Math.min(100, (steps / stepGoal) * 100);
  const maxDay = Math.max(...WEEKLY.days.map((d) => d.steps));

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader
        sumi={sumi}
        hubBadge={hubBadge}
        onSumi={() => navigation.navigate('Rewards')}
      />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 110 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../../assets/art/crimson-peak-hero.png')}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.15)', 'rgba(7,6,5,0.55)', 'rgba(7,6,5,0.95)']}
            style={styles.heroGrad}
          >
            <Text style={styles.heroEyebrow}>YOUR MOUNTAIN</Text>
            <Text style={[styles.heroTitle, { color: mountain.softColor }]}>
              {mountain.name.toUpperCase()}
            </Text>
            <Text style={styles.heroTag}>{mountain.tagline}</Text>
            <Pressable style={styles.ghostBtn}>
              <Text style={styles.ghostBtnText}>VIEW MOUNTAIN ›</Text>
            </Pressable>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.row}>
          <GlassCard style={styles.half}>
            <View style={styles.ringWrap}>
              <ProgressRing progress={steps / stepGoal} size={150} stroke={12}>
                <Text style={styles.stepMain}>
                  {formatNumber(steps)} / {formatNumber(stepGoal)}
                </Text>
                <Text style={styles.stepLabel}>STEPS</Text>
              </ProgressRing>
              <View style={styles.miniBarTrack}>
                <View style={[styles.miniBarFill, { width: `${goalPct}%` }]} />
              </View>
              <Text style={styles.goalPct}>🏆 {goalPct.toFixed(1)}% GOAL ACHIEVED</Text>
              <Text style={styles.vsYest}>↑ {WEEKLY.vsYesterday} vs Yesterday</Text>
              <View style={styles.sumiPill}>
                <Text style={styles.sumiPillText}>+{todaySumi} SUMI Earned Today</Text>
              </View>
            </View>
          </GlassCard>

          <GlassCard
            style={styles.half}
            title="WEEKLY REPORT"
            right={<Text style={styles.range}>{WEEKLY.rangeLabel}</Text>}
          >
            <View style={styles.chart}>
              {WEEKLY.days.map((d) => {
                const h = Math.max(10, (d.steps / maxDay) * 72);
                return (
                  <View key={d.label} style={styles.barCol}>
                    {d.best ? <Text style={styles.crown}>👑</Text> : <View style={styles.crownSpacer} />}
                    <View
                      style={[
                        styles.bar,
                        { height: h, backgroundColor: d.best ? colors.goldBright : '#4A3A28' },
                      ]}
                    />
                    <Text style={styles.barLabel}>{d.label}</Text>
                    {d.best ? (
                      <Text style={styles.barVal}>{(d.steps / 1000).toFixed(1)}K</Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
            <View style={styles.weekStats}>
              <Text style={styles.weekStat}>
                TOTAL{'\n'}
                <Text style={styles.weekStatVal}>{formatNumber(WEEKLY.totalSteps)}</Text>
              </Text>
              <Text style={styles.weekStat}>
                DAILY AVG{'\n'}
                <Text style={styles.weekStatVal}>{formatNumber(WEEKLY.dailyAvg)}</Text>
              </Text>
              <Text style={styles.weekStat}>
                BEST DAY{'\n'}
                <Text style={styles.weekStatVal}>{formatNumber(WEEKLY.bestDay.steps)}</Text>
              </Text>
            </View>
            <Pressable
              style={styles.linkBtn}
              onPress={() => navigation.navigate('WeeklyAscent')}
            >
              <Text style={styles.linkText}>VIEW FULL REPORT ›</Text>
            </Pressable>
          </GlassCard>
        </View>

        <GlassCard style={styles.geoCard}>
          <View style={styles.geoTop}>
            <View style={styles.geoMap}>
              <LinearGradient
                colors={['#1A1208', '#2A1A0C', '#3A2210']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.geoPath} />
              <View style={styles.geoDot} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <View style={styles.geoActiveRow}>
                <View style={styles.greenDot} />
                <Text style={styles.geoActive}>Geo-Guard Active</Text>
              </View>
              <Text style={styles.geoMsg}>{GEO_GUARD.message}</Text>
              <Text style={styles.geoMeta}>GPS ACCURACY {GEO_GUARD.accuracyM} m</Text>
              <Text style={styles.geoMeta}>LAST SYNC {GEO_GUARD.lastSync}</Text>
            </View>
          </View>
          <Text style={styles.geoFoot}>
            Advanced location intelligence ensures every step is real and every win is earned.
          </Text>
        </GlassCard>

        <View style={styles.row}>
          <GlassCard style={styles.half} title="WEEKLY RIVALRY" right={<Text>⚔️</Text>}>
            <View style={styles.vsRow}>
              <View style={styles.vsSide}>
                <View style={[styles.peakBadge, { backgroundColor: left.color }]} />
                <Text style={styles.vsName}>{left.name.split(' ')[0].toUpperCase()}</Text>
                <Text style={styles.vsScore}>{formatNumber(RIVALRY.left.score)}</Text>
              </View>
              <Text style={styles.vs}>VS</Text>
              <View style={styles.vsSide}>
                <View style={[styles.peakBadge, { backgroundColor: right.color }]} />
                <Text style={styles.vsName}>{right.name.split(' ')[0].toUpperCase()}</Text>
                <Text style={styles.vsScore}>{formatNumber(RIVALRY.right.score)}</Text>
              </View>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barLeft, { flex: leftPct, backgroundColor: left.color }]} />
              <View style={[styles.barRight, { flex: 1 - leftPct, backgroundColor: right.color }]} />
            </View>
            <Text style={styles.timer}>⏳ {RIVALRY.remaining}</Text>
            <Pressable style={styles.linkBtn}>
              <Text style={styles.linkText}>VIEW BATTLE STATUS ›</Text>
            </Pressable>
          </GlassCard>

          <GlassCard style={styles.half} title="BEACON" right={<Text>🗼</Text>}>
            <View style={styles.beaconRow}>
              <Image
                source={require('../../assets/art/beacon-tower.png')}
                style={styles.beaconThumb}
              />
              <ProgressRing progress={BEACON.charged / 100} size={88} stroke={8}>
                <Text style={styles.beaconPct}>{BEACON.charged}%</Text>
                <Text style={styles.beaconCharged}>CHARGED</Text>
              </ProgressRing>
            </View>
            <Text style={styles.beaconLead}>
              🏆 {getMountain(BEACON.leadingMountainId).name.toUpperCase()} 1st
            </Text>
            <Text style={styles.beaconSub}>Leading the Beacon</Text>
            <Pressable style={styles.linkBtn}>
              <Text style={styles.linkText}>VIEW BEACON ›</Text>
            </Pressable>
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 12, gap: 12 },
  hero: {
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImage: { borderRadius: 16 },
  heroGrad: { flex: 1, justifyContent: 'flex-end', padding: 16 },
  heroEyebrow: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  heroTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 26,
    letterSpacing: 1,
    marginTop: 2,
  },
  heroTag: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    marginTop: 2,
  },
  ghostBtn: {
    alignSelf: 'flex-start',
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  ghostBtnText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  ringWrap: { alignItems: 'center', gap: 6 },
  stepMain: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  stepLabel: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 2,
  },
  miniBarTrack: {
    width: '90%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2A1E10',
    overflow: 'hidden',
  },
  miniBarFill: { height: '100%', backgroundColor: colors.goldBright },
  goalPct: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 9,
    textAlign: 'center',
  },
  vsYest: {
    color: colors.success,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
  },
  sumiPill: {
    backgroundColor: 'rgba(30, 20, 8, 0.95)',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sumiPillText: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
  },
  range: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 8,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    marginBottom: 8,
  },
  barCol: { alignItems: 'center', flex: 1 },
  crown: { fontSize: 9, marginBottom: 2 },
  crownSpacer: { height: 12 },
  bar: { width: 10, borderRadius: 4 },
  barLabel: {
    color: colors.textDim,
    fontFamily: 'DMSans_500Medium',
    fontSize: 8,
    marginTop: 4,
  },
  barVal: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 8,
  },
  weekStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  weekStat: {
    color: colors.textDim,
    fontFamily: 'DMSans_500Medium',
    fontSize: 8,
    flex: 1,
  },
  weekStatVal: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  linkBtn: { marginTop: 8, alignItems: 'center' },
  linkText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 9,
    letterSpacing: 0.6,
  },
  geoCard: { gap: 10 },
  geoTop: { flexDirection: 'row', gap: 12 },
  geoMap: {
    width: 96,
    height: 72,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  geoPath: {
    position: 'absolute',
    left: 12,
    top: 28,
    width: 70,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.orangeGlow,
    transform: [{ rotate: '-18deg' }],
  },
  geoDot: {
    position: 'absolute',
    right: 18,
    top: 18,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.mountains.azureSoft,
    borderWidth: 2,
    borderColor: colors.white,
  },
  geoActiveRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  geoActive: {
    color: colors.success,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  geoMsg: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  geoMeta: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 10,
  },
  geoFoot: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 10,
    lineHeight: 14,
  },
  vsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  vsSide: { alignItems: 'center', flex: 1 },
  peakBadge: { width: 18, height: 18, borderRadius: 4, marginBottom: 4 },
  vsName: {
    color: colors.textMuted,
    fontFamily: 'DMSans_700Bold',
    fontSize: 8,
    letterSpacing: 0.5,
  },
  vsScore: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    marginTop: 2,
  },
  vs: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 11,
    marginHorizontal: 4,
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#1A120B',
  },
  barLeft: { height: '100%' },
  barRight: { height: '100%' },
  timer: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    marginTop: 8,
    textAlign: 'center',
  },
  beaconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  beaconThumb: { width: 48, height: 72, borderRadius: 8 },
  beaconPct: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
  },
  beaconCharged: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 7,
    letterSpacing: 0.6,
  },
  beaconLead: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 8,
  },
  beaconSub: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
    textAlign: 'center',
  },
});
