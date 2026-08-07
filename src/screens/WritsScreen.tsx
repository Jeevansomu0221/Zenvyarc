import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { GlassCard } from '../components/GlassCard';
import { useApp } from '../context/AppContext';
import { formatNumber, WRITS } from '../data/mockData';
import { colors } from '../theme/colors';

export function WritsScreen() {
  const insets = useSafeAreaInsets();
  const { sumi, hubBadge } = useApp();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader sumi={sumi} hubBadge={hubBadge} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 110 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>WRITS OF CHALLENGE</Text>
        <Text style={styles.subtitle}>Ceremonial contracts. SUMI on the line.</Text>

        <Pressable style={styles.issueBtn}>
          <Text style={styles.issueText}>＋ ISSUE WRIT</Text>
        </Pressable>

        <GlassCard title="ACTIVE">
          {WRITS.active.map((w) => {
            const total = w.mySteps + w.theirSteps;
            const mine = w.mySteps / total;
            return (
              <View key={w.id} style={styles.writ}>
                <View style={styles.writHead}>
                  <Text style={styles.opponent}>vs {w.opponent}</Text>
                  <Text style={styles.duration}>{w.duration}</Text>
                </View>
                <Text style={styles.stake}>Stake · {formatNumber(w.stake)} SUMI each</Text>
                <View style={styles.barTrack}>
                  <View style={[styles.barMine, { flex: mine }]} />
                  <View style={[styles.barTheirs, { flex: 1 - mine }]} />
                </View>
                <View style={styles.scores}>
                  <Text style={styles.scoreYou}>{formatNumber(w.mySteps)} you</Text>
                  <Text style={styles.remain}>{w.remaining}</Text>
                  <Text style={styles.scoreThem}>{formatNumber(w.theirSteps)} them</Text>
                </View>
              </View>
            );
          })}
        </GlassCard>

        <GlassCard title="PENDING">
          {WRITS.pending.map((w) => (
            <View key={w.id} style={styles.pending}>
              <View style={{ flex: 1 }}>
                <Text style={styles.opponent}>from {w.opponent}</Text>
                <Text style={styles.stake}>
                  {w.duration} · {formatNumber(w.stake)} SUMI · {w.remaining}
                </Text>
              </View>
              <Pressable style={styles.accept}>
                <Text style={styles.acceptText}>ACCEPT</Text>
              </Pressable>
            </View>
          ))}
        </GlassCard>

        <GlassCard title="HISTORY">
          <Text style={styles.empty}>Wins, losses, and SUMI ledger appear here.</Text>
        </GlassCard>
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
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: -4,
  },
  issueBtn: {
    alignSelf: 'center',
    backgroundColor: colors.orange,
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  issueText: {
    color: colors.white,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  writ: { gap: 8 },
  writHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opponent: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
  },
  duration: {
    color: colors.gold,
    fontFamily: 'DMSans_500Medium',
    fontSize: 11,
  },
  stake: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#1A120B',
  },
  barMine: { backgroundColor: colors.orange },
  barTheirs: { backgroundColor: colors.mountains.azure },
  scores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreYou: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  remain: {
    color: colors.textDim,
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
  },
  scoreThem: {
    color: colors.textMuted,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  pending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accept: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  acceptText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
  },
  empty: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
  },
});
