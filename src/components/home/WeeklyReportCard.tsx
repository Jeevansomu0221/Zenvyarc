import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumCard } from '../PremiumCard';
import { GlowView } from '../GlowView';
import { ChartIcon, ChevronRightIcon } from '../icons/ZenvyIcons';
import { colors } from '../../theme/colors';
import { formatNumber, WEEKLY } from '../../data/mockData';

type Props = {
  onViewReport?: () => void;
};

export function WeeklyReportCard({ onViewReport }: Props) {
  const maxDay = Math.max(...WEEKLY.days.map((d) => d.steps));

  return (
    <PremiumCard sparks style={styles.card}>
      <View style={styles.weekHead}>
        <View style={styles.titleRow}>
          <ChartIcon size={12} color={colors.gold} />
          <Text style={styles.cardTitle}>WEEKLY REPORT</Text>
        </View>
        <Text style={styles.range}>{WEEKLY.rangeLabel}</Text>
      </View>

      <View style={styles.chart}>
        {WEEKLY.days.map((d) => {
          const h = Math.max(16, (d.steps / maxDay) * 92);
          return (
            <View key={d.label} style={styles.barCol}>
              <Text style={[styles.barVal, d.best && styles.barValHot]}>
                {(d.steps / 1000).toFixed(1)}K
              </Text>
              {d.best ? (
                <GlowView intensity="strong" style={{ height: h }}>
                  <LinearGradient
                    colors={['#FFF4C2', '#FFC857', '#F07A2A']}
                    style={[styles.bar, styles.barHot, { height: h }]}
                  />
                </GlowView>
              ) : (
                <LinearGradient
                  colors={['#5A5044', '#2E2A24']}
                  style={[styles.bar, { height: h }]}
                />
              )}
              <Text style={[styles.barLabel, d.best && styles.barLabelHot]}>
                {d.label.slice(0, 3).toUpperCase()}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.weekStats}>
        <View style={styles.weekStat}>
          <Text style={styles.weekStatLabel}>TOTAL STEPS</Text>
          <Text style={styles.weekStatVal}>{formatNumber(WEEKLY.totalSteps)}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.weekStat}>
          <Text style={styles.weekStatLabel}>DAILY AVG</Text>
          <Text style={styles.weekStatVal}>{formatNumber(WEEKLY.dailyAvg)}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.weekStat}>
          <Text style={styles.weekStatLabel}>BEST DAY</Text>
          <Text style={styles.weekStatVal}>{formatNumber(WEEKLY.bestDay.steps)}</Text>
          <Text style={styles.weekStatSub}>{WEEKLY.bestDay.label}</Text>
        </View>
      </View>

      <Pressable style={styles.reportBtn} onPress={onViewReport}>
        <LinearGradient
          colors={['rgba(255,200,87,0.14)', 'rgba(255,140,40,0.04)', 'rgba(0,0,0,0.4)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.reportBtnText}>VIEW FULL REPORT</Text>
        <ChevronRightIcon size={11} color={colors.gold} />
      </Pressable>
    </PremiumCard>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0 },
  weekHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 6,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1 },
  cardTitle: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  range: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 9,
    flexShrink: 0,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 122,
    marginBottom: 10,
  },
  barCol: { alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
  barVal: {
    color: 'rgba(245,230,200,0.55)',
    fontFamily: 'DMSans_500Medium',
    fontSize: 7,
    marginBottom: 3,
  },
  barValHot: { color: colors.orangeGlow, fontFamily: 'DMSans_700Bold' },
  bar: { width: 11, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  barHot: {
    ...Platform.select({
      web: { boxShadow: '0 0 12px rgba(255,200,87,0.9)' },
      default: {
        shadowColor: colors.goldBright,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  barLabel: {
    color: colors.textDim,
    fontFamily: 'DMSans_500Medium',
    fontSize: 7,
    marginTop: 4,
  },
  barLabelHot: { color: colors.goldBright, fontFamily: 'DMSans_700Bold' },
  weekStats: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(232,176,74,0.22)',
  },
  weekStat: { flex: 1, alignItems: 'center' },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(232,176,74,0.28)',
    marginHorizontal: 2,
  },
  weekStatLabel: {
    color: colors.orange,
    fontFamily: 'DMSans_500Medium',
    fontSize: 6.5,
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  weekStatVal: {
    color: colors.goldBright,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 13,
  },
  weekStatSub: {
    color: colors.textDim,
    fontFamily: 'DMSans_400Regular',
    fontSize: 7,
    marginTop: 1,
  },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.48)',
    borderRadius: 999,
    paddingVertical: 9,
    backgroundColor: 'rgba(12, 9, 6, 0.82)',
    overflow: 'hidden',
    ...Platform.select({
      web: { boxShadow: '0 0 10px rgba(255,200,87,0.28)' },
      default: {
        shadowColor: colors.gold,
        shadowOpacity: 0.28,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  reportBtnText: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 9.5,
    letterSpacing: 0.95,
  },
});
