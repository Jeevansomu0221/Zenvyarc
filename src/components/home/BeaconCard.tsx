import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgGrad, Stop } from 'react-native-svg';
import { PremiumCard } from '../PremiumCard';
import { GlowView } from '../GlowView';
import {
  BeaconIcon,
  ChevronRightIcon,
  CrimsonShieldBadge,
  LaurelSide,
} from '../icons/ZenvyIcons';
import { colors } from '../../theme/colors';
import { BEACON, getMountain } from '../../data/mockData';

type Props = {
  onViewBeacon?: () => void;
};

function ChargeRing({ progress, size = 86 }: { progress: number; size?: number }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  const offset = circumference * (1 - clamped);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <SvgGrad id="beaconCharge" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFF4C2" />
            <Stop offset="40%" stopColor="#FFC857" />
            <Stop offset="100%" stopColor="#F07A2A" />
          </SvgGrad>
        </Defs>
        <Circle
          cx={cx}
          cy={cy}
          r={radius + 3}
          stroke="rgba(255,200,87,0.14)"
          strokeWidth={1}
          fill="none"
        />
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="rgba(35, 24, 12, 0.98)"
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="url(#beaconCharge)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </Svg>
      <View style={styles.ringCenter}>
        <Text style={styles.beaconPct}>{BEACON.charged}%</Text>
        <Text style={styles.beaconCharged}>CHARGED</Text>
      </View>
    </View>
  );
}

export function BeaconCard({ onViewBeacon }: Props) {
  const leading = getMountain(BEACON.leadingMountainId);

  return (
    <PremiumCard glow sparks style={styles.card}>
      <View style={styles.titleRow}>
        <BeaconIcon size={13} color={colors.gold} />
        <Text style={styles.cardTitle}>BEACON</Text>
      </View>

      <View style={styles.beaconRow}>
        <GlowView intensity="strong" color={colors.orangeGlow}>
          <Image
            source={require('../../../assets/art/beacon-tower.png')}
            style={styles.beaconThumb}
            resizeMode="cover"
          />
        </GlowView>

        <View style={styles.rightCol}>
          <GlowView intensity="medium" color={colors.orangeGlow}>
            <ChargeRing progress={BEACON.charged / 100} size={84} />
          </GlowView>

          <View style={styles.leadBlock}>
            <CrimsonShieldBadge size={16} />

            <Text style={[styles.beaconLead, { color: leading.softColor }]}>
              {leading.name.toUpperCase()}
            </Text>

            <View style={styles.firstRow}>
              <LaurelSide size={13} color={colors.gold} />
              <Text style={styles.beaconFirst}>1st</Text>
              <LaurelSide size={13} flip color={colors.gold} />
            </View>
            <Text style={styles.beaconSub}>Leading the Beacon</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.btn} onPress={onViewBeacon}>
        <LinearGradient
          colors={['rgba(255,200,87,0.14)', 'rgba(255,140,40,0.04)', 'rgba(0,0,0,0.45)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.btnText}>VIEW BEACON</Text>
        <ChevronRightIcon size={11} color={colors.gold} />
      </Pressable>
    </PremiumCard>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  cardTitle: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
  beaconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
    flex: 1,
  },
  beaconThumb: {
    width: 70,
    height: 124,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.38)',
    ...Platform.select({
      web: { boxShadow: '0 0 18px rgba(255,140,40,0.5)' },
      default: {
        shadowColor: colors.orangeGlow,
        shadowOpacity: 0.6,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  rightCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    minWidth: 0,
  },
  ringCenter: { alignItems: 'center', justifyContent: 'center' },
  beaconPct: {
    color: '#FFFFFF',
    fontFamily: 'DMSans_700Bold',
    fontSize: 17,
    lineHeight: 19,
    textShadowColor: 'rgba(255,200,87,0.5)',
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
  },
  beaconCharged: {
    color: colors.gold,
    fontFamily: 'DMSans_500Medium',
    fontSize: 6.5,
    letterSpacing: 1,
    marginTop: 1,
  },
  leadBlock: {
    alignItems: 'center',
    gap: 1,
    marginTop: 2,
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  beaconLead: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 8,
    letterSpacing: 0.4,
    marginTop: 2,
  },
  beaconFirst: {
    color: colors.goldBright,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 17,
    lineHeight: 20,
    textShadowColor: 'rgba(255,200,87,0.7)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  beaconSub: {
    color: 'rgba(245,230,200,0.72)',
    fontFamily: 'DMSans_400Regular',
    fontSize: 7.5,
    fontStyle: 'italic',
    textAlign: 'center',
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
    fontSize: 9,
    letterSpacing: 0.85,
  },
});
