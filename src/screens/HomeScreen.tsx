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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { GlassCard } from '../components/GlassCard';
import { ProgressRing, RingLabel } from '../components/ProgressRing';
import { useApp, useTodaySumi } from '../context/AppContext';
import { useStepTracking } from '../hooks/useStepTracking';
import {
  BEACON,
  formatNumber,
  getMountain,
  RIVALRY,
} from '../data/mockData';
import { colors } from '../theme/colors';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user, sumi, rituals, hubBadge, toggleRitual, stepGoal } = useApp();
  const steps = useStepTracking();
  const todaySumi = useTodaySumi(steps);
  const mountain = getMountain(user!.mountainId);
  const left = getMountain(RIVALRY.left.mountainId);
  const right = getMountain(RIVALRY.right.mountainId);
  const totalRival = RIVALRY.left.score + RIVALRY.right.score;
  const leftPct = RIVALRY.left.score / totalRival;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader sumi={sumi} hubBadge={hubBadge} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 110 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Mountain hero */}
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

        {/* Steps + Rituals */}
        <View style={styles.row}>
          <GlassCard style={styles.half}>
            <View style={styles.ringWrap}>
              <ProgressRing progress={steps / stepGoal} size={148} stroke={11}>
                <RingLabel
                  eyebrow="TODAY'S JOURNEY"
                  value={`${formatNumber(steps)} / ${formatNumber(stepGoal)}\nSTEPS`}
                  sub={`+${todaySumi} SUMI Earned Today`}
                />
              </ProgressRing>
              <Text style={styles.shoe}>👟</Text>
            </View>
          </GlassCard>

          <GlassCard
            style={styles.half}
            title="DAILY RITUALS"
            right={<Text style={styles.flame}>🔥</Text>}
          >
            {rituals.map((r) => (
              <Pressable
                key={r.id}
                style={styles.ritualRow}
                onPress={() => toggleRitual(r.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.ritualName}>{r.name}</Text>
                  <Text style={styles.ritualTarget}>{r.target}</Text>
                </View>
                <View style={[styles.check, r.done && styles.checkOn]}>
                  {r.done ? <Text style={styles.checkMark}>✓</Text> : null}
                </View>
              </Pressable>
            ))}
            <Text style={styles.ritualFoot}>
              Daily Rituals build discipline, not points.
            </Text>
          </GlassCard>
        </View>

        {/* Rivalry + Beacon */}
        <View style={styles.row}>
          <GlassCard
            style={styles.half}
            title="WEEKLY RIVALRY"
            right={<Text>⚔️</Text>}
          >
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
              <View
                style={[
                  styles.barLeft,
                  { flex: leftPct, backgroundColor: left.color },
                ]}
              />
              <View
                style={[
                  styles.barRight,
                  { flex: 1 - leftPct, backgroundColor: right.color },
                ]}
              />
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

        {/* Sumi Exchange coming soon */}
        <GlassCard style={styles.exchange}>
          <Image
            source={require('../../assets/art/sumi-chest.png')}
            style={styles.chest}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.exchangeTitle}>SUMI EXCHANGE</Text>
            <Text style={styles.exchangeSub}>
              Redeem your SUMI for exclusive coupons and rewards.
            </Text>
          </View>
          <View style={styles.soonBadge}>
            <Text style={styles.soonText}>COMING SOON</Text>
          </View>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 12, gap: 12 },
  hero: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImage: { borderRadius: 16 },
  heroGrad: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
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
  ringWrap: { alignItems: 'center', paddingVertical: 4 },
  shoe: { marginTop: 4, fontSize: 14 },
  flame: { fontSize: 12 },
  ritualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(232,176,74,0.12)',
  },
  ritualName: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  ritualTarget: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
  },
  check: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.goldDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: {
    backgroundColor: colors.orange,
    borderColor: colors.orangeGlow,
  },
  checkMark: {
    color: colors.white,
    fontSize: 9,
    fontFamily: 'DMSans_700Bold',
  },
  ritualFoot: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 8,
    marginTop: 8,
    fontStyle: 'italic',
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
  linkBtn: { marginTop: 8, alignItems: 'center' },
  linkText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 9,
    letterSpacing: 0.6,
  },
  beaconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  beaconThumb: {
    width: 48,
    height: 72,
    borderRadius: 8,
  },
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
  exchange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 88,
  },
  chest: { width: 56, height: 56, borderRadius: 8 },
  exchangeTitle: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  exchangeSub: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    marginTop: 4,
    lineHeight: 16,
  },
  soonBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  soonText: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 8,
    letterSpacing: 1,
  },
});
