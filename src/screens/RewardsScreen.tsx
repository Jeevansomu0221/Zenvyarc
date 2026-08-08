import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { useApp } from '../context/AppContext';
import { formatNumber, REWARDS } from '../data/mockData';
import { colors } from '../theme/colors';

export function RewardsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { sumi } = useApp();
  const ascentPct = Math.round((REWARDS.ascentSteps / REWARDS.ascentGoal) * 100);
  const statusIndex = REWARDS.keychain.statuses.indexOf(REWARDS.keychain.status);

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
        <Text style={styles.title}>✦ REWARDS ✦</Text>
        <Text style={styles.subtitle}>Your discipline. Your rewards. Your legacy.</Text>

        <GlassCard title="THE 100K ASCENT">
          <Text style={styles.body}>Complete your first 100,000 verified steps.</Text>
          <Text style={styles.progressLine}>
            {formatNumber(REWARDS.ascentSteps)} / {formatNumber(REWARDS.ascentGoal)} STEPS
          </Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${ascentPct}%` }]} />
          </View>
          <Text style={styles.pct}>{ascentPct}% COMPLETE</Text>
          <View style={styles.ascentRow}>
            <Image
              source={require('../../assets/art/ascent-trophy.png')}
              style={styles.trophy}
            />
            <View style={{ flex: 1, gap: 6 }}>
              {[
                '100K Citizen Achievement',
                'Mountain Keychain',
                'Official Appreciation Post',
                'Sumi Reward',
              ].map((item) => (
                <Text key={item} style={styles.rewardItem}>
                  ◆ {item}
                </Text>
              ))}
            </View>
          </View>
          <Pressable style={styles.lockedBtn}>
            <Text style={styles.lockedText}>🔒 LOCKED</Text>
          </Pressable>
        </GlassCard>

        <GlassCard title="BUILD YOUR CIRCLE">
          <Text style={styles.body}>Bring 5 citizens into the journey.</Text>
          <View style={styles.circleRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <View key={n} style={styles.slot}>
                <Text style={styles.slotNum}>{n}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.progressLine}>
            {REWARDS.referrals.verified} / {REWARDS.referrals.goal} VERIFIED REFERRALS
          </Text>
          <Text style={styles.note}>
            Referrals verify after friends complete onboarding and take 10,000 steps.
          </Text>
        </GlassCard>

        <GlassCard title="OFFICIAL APPRECIATION POST">
          <View style={styles.postCard}>
            <Text style={styles.postName}>Citizen Name · Community Builder</Text>
            <Text style={styles.postQuote}>
              “Discipline today. Legacy tomorrow.”
            </Text>
            <View style={styles.lockOverlay}>
              <Text style={styles.lockedText}>🔒 LOCKED</Text>
              <Text style={styles.note}>Complete 5 verified referrals.</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard title="YOUR SUMI. YOUR REWARDS.">
          <View style={styles.sumiRow}>
            <View>
              <Text style={styles.bigSumi}>{formatNumber(sumi)} SUMI</Text>
              <Text style={styles.note}>Redeem later via Sumi Exchange.</Text>
            </View>
            <Text style={styles.coinEmoji}>🪙</Text>
          </View>
          <View style={styles.soonBox}>
            <Text style={styles.soon}>COMING SOON</Text>
            <Text style={styles.note}>Partner coupons and brand rewards.</Text>
          </View>
        </GlassCard>

        <GlassCard title="YOUR MOUNTAIN KEYCHAIN">
          <View style={styles.keyRow}>
            <Image
              source={require('../../assets/art/mountain-keychain.png')}
              style={styles.keyImg}
            />
            <View style={{ flex: 1, gap: 4 }}>
              {['100K Steps Verified', 'Reward Unlocked', 'Address Confirmed'].map(
                (item) => (
                  <Text key={item} style={styles.check}>
                    ✓ {item}
                  </Text>
                ),
              )}
            </View>
          </View>
          <View style={styles.timeline}>
            {REWARDS.keychain.statuses.map((s, i) => (
              <View
                key={s}
                style={[styles.tlItem, i === statusIndex && styles.tlActive]}
              >
                <Text
                  style={[
                    styles.tlText,
                    i === statusIndex && styles.tlTextActive,
                    i > statusIndex && styles.tlDim,
                  ]}
                >
                  {s}
                </Text>
              </View>
            ))}
          </View>
          <Pressable>
            <Text style={styles.edit}>✎ EDIT DELIVERY ADDRESS</Text>
          </Pressable>
        </GlassCard>

        <GlassCard title="THE ULTIMATE RECOGNITION">
          <Text style={styles.foundingFlow}>
            100K STEPS  +  5 REFERRALS  =  FOUNDING CITIZEN
          </Text>
          <View style={styles.foundingBox}>
            <Text style={styles.foundingTitle}>FOUNDING CITIZEN</Text>
            <Text style={styles.note}>A legacy that inspires thousands.</Text>
          </View>
        </GlassCard>

        <Text style={styles.footerNote}>
          Please ensure your shipping address is accurate. Keychain delivery is available in selected countries only.
        </Text>
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
    fontSize: 28,
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
  body: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    marginBottom: 8,
  },
  progressLine: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    marginBottom: 6,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2A1E10',
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: colors.goldBright },
  pct: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
    marginTop: 6,
  },
  ascentRow: { flexDirection: 'row', gap: 12, marginTop: 12, alignItems: 'center' },
  trophy: { width: 88, height: 88, borderRadius: 12 },
  rewardItem: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  lockedBtn: {
    alignSelf: 'flex-end',
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  lockedText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  slot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14100A',
  },
  slotNum: {
    color: colors.textDim,
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  note: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    marginTop: 6,
  },
  postCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    minHeight: 110,
    justifyContent: 'center',
  },
  postName: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  postQuote: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    marginTop: 8,
    fontStyle: 'italic',
  },
  lockOverlay: {
    marginTop: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 8,
    padding: 10,
  },
  sumiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bigSumi: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 24,
  },
  coinEmoji: { fontSize: 36 },
  soonBox: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
  },
  soon: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  keyRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  keyImg: { width: 96, height: 96, borderRadius: 12 },
  check: {
    color: colors.gold,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  timeline: { marginTop: 14, gap: 8 },
  tlItem: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tlActive: {
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(232,176,74,0.08)',
  },
  tlText: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  tlTextActive: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
  },
  tlDim: { color: colors.textDim },
  edit: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
    marginTop: 12,
  },
  foundingFlow: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  foundingBox: {
    borderWidth: 1,
    borderColor: '#7B4CC7',
    backgroundColor: 'rgba(90, 40, 140, 0.25)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  foundingTitle: {
    color: '#D7B4FF',
    fontFamily: 'Cinzel_700Bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  footerNote: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
