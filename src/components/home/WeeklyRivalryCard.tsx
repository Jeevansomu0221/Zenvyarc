import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumCard } from '../PremiumCard';
import { GlowView } from '../GlowView';
import {
  ChevronRightIcon,
  MountainPeakIcon,
  SwordsIcon,
  TimerIcon,
} from '../icons/ZenvyIcons';
import { colors } from '../../theme/colors';
import { formatNumber, getMountain, RIVALRY } from '../../data/mockData';

type Props = {
  onViewBattle?: () => void;
};

export function WeeklyRivalryCard({ onViewBattle }: Props) {
  const left = getMountain(RIVALRY.left.mountainId);
  const right = getMountain(RIVALRY.right.mountainId);
  const totalRival = RIVALRY.left.score + RIVALRY.right.score;
  const leftPct = RIVALRY.left.score / totalRival;

  return (
    <PremiumCard sparks style={styles.card}>
      <View style={styles.rivalHead}>
        <View style={styles.titleRow}>
          <SwordsIcon size={13} color={colors.gold} />
          <Text style={styles.cardTitle}>WEEKLY RIVALRY</Text>
        </View>
        <View style={styles.timerRow}>
          <TimerIcon size={10} />
          <Text style={styles.timer}>{RIVALRY.remaining}</Text>
        </View>
      </View>

      <View style={styles.vsRow}>
        <View style={styles.vsSide}>
          <GlowView intensity="strong" color={left.softColor}>
            <MountainPeakIcon size={40} color={left.softColor} />
          </GlowView>
          <Text style={[styles.vsName, { color: left.softColor }]}>
            {left.name.toUpperCase()}
          </Text>
          <Text style={[styles.vsScore, { color: left.softColor }]}>
            {formatNumber(RIVALRY.left.score)}
          </Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.vsSide}>
          <GlowView intensity="strong" color={right.softColor}>
            <MountainPeakIcon size={40} color={right.softColor} />
          </GlowView>
          <Text style={[styles.vsName, { color: right.softColor }]}>
            {right.name.toUpperCase()}
          </Text>
          <Text style={[styles.vsScore, { color: right.softColor }]}>
            {formatNumber(RIVALRY.right.score)}
          </Text>
        </View>
      </View>

      <View style={styles.barTrack}>
        <LinearGradient
          colors={['#FF8A65', '#E53935', '#8B1A1A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.barLeft, { flex: leftPct }]}
        />
        <LinearGradient
          colors={['#1565C0', '#42A5F5', '#90CAF9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.barRight, { flex: 1 - leftPct }]}
        />
        <View style={[styles.lensFlare, { left: `${leftPct * 100}%` as `${number}%` }]}>
          <View style={styles.lensFlareRing} />
          <View style={styles.lensFlareCore} />
        </View>
      </View>

      <Pressable style={styles.btn} onPress={onViewBattle}>
        <LinearGradient
          colors={['rgba(255,200,87,0.14)', 'rgba(255,140,40,0.04)', 'rgba(0,0,0,0.45)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.btnText}>VIEW BATTLE STATUS</Text>
        <ChevronRightIcon size={11} color={colors.gold} />
      </Pressable>
    </PremiumCard>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0 },
  rivalHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 4,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1 },
  cardTitle: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 9,
    letterSpacing: 0.7,
  },
  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 3, flexShrink: 0 },
  timer: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 7,
    letterSpacing: 0.15,
  },
  vsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    minHeight: 92,
  },
  vsSide: { alignItems: 'center', flex: 1, gap: 2 },
  vsName: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 7.5,
    letterSpacing: 0.4,
    marginTop: 4,
    textAlign: 'center',
  },
  vsScore: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 16,
    marginTop: 1,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  vs: {
    color: colors.goldBright,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 15,
    marginHorizontal: 1,
    textShadowColor: 'rgba(255,200,87,0.7)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'visible',
    backgroundColor: '#100C08',
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.12)',
    position: 'relative',
    marginBottom: 12,
  },
  barLeft: {
    height: '100%',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  barRight: {
    height: '100%',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  lensFlare: {
    position: 'absolute',
    top: -6,
    width: 22,
    height: 22,
    marginLeft: -11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lensFlareCore: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    ...Platform.select({
      web: { boxShadow: '0 0 16px rgba(255,230,140,1)' },
      default: {
        shadowColor: '#FFC857',
        shadowOpacity: 1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  lensFlareRing: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255,220,140,0.2)',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.5)',
    borderRadius: 999,
    paddingVertical: 9,
    backgroundColor: 'rgba(10, 8, 5, 0.9)',
    overflow: 'hidden',
  },
  btnText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 8.5,
    letterSpacing: 0.7,
  },
});
