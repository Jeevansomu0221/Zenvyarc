import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { OrnateStepCircle } from '../OrnateStepCircle';
import { LaurelSide, SumiCoinIcon } from '../icons/ZenvyIcons';
import { colors } from '../../theme/colors';
import { formatNumber } from '../../data/mockData';
import { formatKm } from '../../utils/geo';

type Props = {
  steps: number;
  stepGoal: number;
  vsYesterday: number;
  sumiEarned: number;
  distanceKm: number;
  fromGps?: boolean;
  onSumiPress?: () => void;
};

export function StepProgressArtifact({
  steps,
  stepGoal,
  vsYesterday,
  sumiEarned,
  distanceKm,
  fromGps = false,
  onSumiPress,
}: Props) {
  const goalPct = Math.min(100, (steps / stepGoal) * 100);
  const barPct = Math.max(4, Math.min(96, goalPct));

  return (
    <View style={styles.wrap}>
      <OrnateStepCircle size={168}>
        <Text style={styles.todayLabel}>TODAY'S STEPS</Text>
        <Text style={styles.stepBig}>{formatNumber(steps)}</Text>
        <Text style={styles.stepGoal}>/ {formatNumber(stepGoal)} STEPS</Text>
        <Text style={styles.kmLine}>
          {formatKm(distanceKm)} km{fromGps ? '' : ' est.'}
        </Text>

        <View style={styles.miniBarTrack}>
          <LinearGradient
            colors={['#FFF8E0', '#FFC857', '#FF8A3D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.miniBarFill, { width: `${barPct}%` as `${number}%` }]}
          />
          <View style={[styles.miniBarSpark, { left: `${barPct}%` as `${number}%` }]} />
        </View>

        <View style={styles.laurelRow}>
          <LaurelSide size={13} color={colors.gold} />
          <View style={styles.laurelBody}>
            <Text style={styles.laurelValue}>{goalPct.toFixed(1)}%</Text>
            <Text style={styles.laurelLabel}>GOAL ACHIEVED</Text>
          </View>
          <LaurelSide size={13} flip color={colors.gold} />
        </View>

        <View style={styles.vsRow}>
          <Text style={styles.vsArrow}>↑ {formatNumber(vsYesterday)}</Text>
          <Text style={styles.vsSub}>vs Yesterday</Text>
        </View>
      </OrnateStepCircle>

      {/* Tiered metallic pedestal */}
      <View style={styles.pedestal}>
        <LinearGradient
          colors={['rgba(255,200,87,0.35)', 'rgba(80,50,20,0.5)']}
          style={styles.tier3}
        />
        <LinearGradient
          colors={['rgba(255,220,140,0.55)', 'rgba(120,75,30,0.65)']}
          style={styles.tier2}
        />
        <LinearGradient
          colors={['#FFE29A', '#C9852A', '#6B3A12']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tier1}
        />
        <View style={styles.pedestalGlow} />
      </View>

      <Pressable style={styles.sumiEarned} onPress={onSumiPress}>
        <SumiCoinIcon size={18} />
        <View>
          <Text style={styles.sumiEarnedVal}>+{sumiEarned} SUMI</Text>
          <Text style={styles.sumiEarnedSub}>Earned Today</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
    paddingBottom: 6,
    overflow: 'visible',
  },
  todayLabel: {
    color: colors.goldBright,
    fontFamily: 'DMSans_500Medium',
    fontSize: 7.5,
    letterSpacing: 1.4,
    marginBottom: 1,
  },
  stepBig: {
    color: '#FFD978',
    fontFamily: 'Cinzel_700Bold',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 28,
    textShadowColor: 'rgba(255,180,60,0.85)',
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },
  stepGoal: {
    color: 'rgba(245,230,200,0.72)',
    fontFamily: 'DMSans_500Medium',
    fontSize: 7.5,
    letterSpacing: 0.7,
    marginTop: 0,
    marginBottom: 1,
  },
  kmLine: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 9,
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  miniBarTrack: {
    width: '100%',
    maxWidth: 84,
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(12,8,4,0.95)',
    overflow: 'visible',
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.28)',
    marginBottom: 4,
    position: 'relative',
  },
  miniBarFill: {
    height: '100%',
    borderRadius: 999,
    ...Platform.select({
      web: { boxShadow: '0 0 8px rgba(255,200,87,0.85)' },
      default: {
        shadowColor: colors.goldBright,
        shadowOpacity: 1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  miniBarSpark: {
    position: 'absolute',
    top: -3,
    width: 6,
    height: 11,
    borderRadius: 1,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }, { translateX: -3 }],
    ...Platform.select({
      web: { boxShadow: '0 0 8px rgba(255,255,255,0.95)' },
      default: {
        shadowColor: '#FFFFFF',
        shadowOpacity: 1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  laurelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 2,
  },
  laurelBody: { alignItems: 'center', minWidth: 58 },
  laurelValue: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
    lineHeight: 13,
  },
  laurelLabel: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 5.5,
    letterSpacing: 0.7,
  },
  vsRow: { alignItems: 'center', marginTop: 1 },
  vsArrow: {
    color: '#4CAF6A',
    fontFamily: 'DMSans_700Bold',
    fontSize: 11,
    textShadowColor: 'rgba(76,175,106,0.55)',
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 0 },
  },
  vsSub: {
    color: 'rgba(200,190,170,0.7)',
    fontFamily: 'DMSans_400Regular',
    fontSize: 7,
    marginTop: -1,
  },
  pedestal: {
    alignItems: 'center',
    marginTop: -14,
    marginBottom: 8,
    zIndex: -1,
  },
  tier3: {
    width: 118,
    height: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.2)',
    marginBottom: 2,
  },
  tier2: {
    width: 98,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.35)',
    marginBottom: 2,
  },
  tier1: {
    width: 78,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,230,160,0.65)',
    ...Platform.select({
      web: { boxShadow: '0 0 12px rgba(255,200,87,0.55)' },
      default: {
        shadowColor: '#FFC857',
        shadowOpacity: 0.55,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  pedestalGlow: {
    position: 'absolute',
    bottom: -6,
    width: 90,
    height: 20,
    borderRadius: 40,
    backgroundColor: 'rgba(255,160,40,0.12)',
    ...Platform.select({
      web: { boxShadow: '0 0 18px rgba(255,140,40,0.35)' },
      default: {},
    }),
  },
  sumiEarned: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(6, 4, 2, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(232,176,74,0.55)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 2,
    ...Platform.select({
      web: { boxShadow: '0 0 12px rgba(255,200,87,0.35)' },
      default: {
        shadowColor: colors.goldBright,
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  sumiEarnedVal: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12.5,
  },
  sumiEarnedSub: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 8,
  },
});
