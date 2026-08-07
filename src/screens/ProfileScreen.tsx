import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { GlassCard } from '../components/GlassCard';
import { useApp } from '../context/AppContext';
import { formatNumber, getMountain } from '../data/mockData';
import { colors } from '../theme/colors';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, sumi, hubBadge, rituals, steps, logout } = useApp();
  const mountain = getMountain(user!.mountainId);
  const ritualDone = rituals.filter((r) => r.done).length;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader sumi={sumi} hubBadge={hubBadge} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 110 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={[styles.avatar, { borderColor: mountain.softColor }]}>
            <Text style={styles.avatarLetter}>{user!.name[0]}</Text>
          </View>
          <Text style={styles.name}>{user!.name}</Text>
          <Text style={styles.email}>{user!.email}</Text>
          <View style={[styles.mountainPill, { borderColor: mountain.color }]}>
            <View style={[styles.dot, { backgroundColor: mountain.color }]} />
            <Text style={[styles.mountainText, { color: mountain.softColor }]}>
              {mountain.name}
            </Text>
          </View>
        </View>

        <View style={styles.stats}>
          <GlassCard style={styles.stat}>
            <Text style={styles.statVal}>{formatNumber(steps)}</Text>
            <Text style={styles.statLabel}>Steps today</Text>
          </GlassCard>
          <GlassCard style={styles.stat}>
            <Text style={styles.statVal}>{formatNumber(sumi)}</Text>
            <Text style={styles.statLabel}>SUMI</Text>
          </GlassCard>
          <GlassCard style={styles.stat}>
            <Text style={styles.statVal}>
              {ritualDone}/{rituals.length}
            </Text>
            <Text style={styles.statLabel}>Rituals</Text>
          </GlassCard>
        </View>

        <GlassCard title="IDENTITY">
          <Text style={styles.row}>Rank · Citizen</Text>
          <Text style={styles.row}>Writ record · 1 active</Text>
          <Text style={styles.row}>Titles · Pathfinder</Text>
        </GlassCard>

        <GlassCard title="SETTINGS">
          <Text style={styles.row}>Notifications · Configurable</Text>
          <Text style={styles.row}>Privacy · Activity aggregated</Text>
          <Text style={styles.row}>Backend · Supabase (coming next)</Text>
        </GlassCard>

        <Pressable style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Sign out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 12, gap: 12 },
  hero: { alignItems: 'center', paddingVertical: 12 },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A120B',
  },
  avatarLetter: {
    color: colors.goldBright,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 34,
  },
  name: {
    color: colors.text,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 24,
    marginTop: 12,
  },
  email: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    marginTop: 4,
  },
  mountainPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  mountainText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  stats: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, alignItems: 'center' },
  statVal: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 18,
  },
  statLabel: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 10,
    marginTop: 4,
  },
  row: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(232,176,74,0.12)',
  },
  logout: {
    alignSelf: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  logoutText: {
    color: colors.textMuted,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
});
