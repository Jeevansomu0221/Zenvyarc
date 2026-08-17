import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { formatNumber } from '../data/mockData';
import {
  BellIcon,
  ChevronRightIcon,
  CitizensIcon,
  LogoMarkSvg,
  SumiCoinIcon,
} from './icons/ZenvyIcons';

type Props = {
  sumi: number;
  hubBadge?: number;
  onHub?: () => void;
  onBell?: () => void;
  onSumi?: () => void;
};

export function AppHeader({ sumi, hubBadge = 0, onHub, onBell, onSumi }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.brand}>
          <View style={styles.logoGlow}>
            <LogoMarkSvg size={28} />
          </View>
          <View>
            <Text style={styles.brandTop}>ZENVY</Text>
            <Text style={styles.brandBottom}>ARC</Text>
          </View>
        </View>

        <View style={styles.rightCluster}>
          <Pressable style={styles.sumiPill} onPress={onSumi}>
            <LinearGradient
              colors={['rgba(255,220,140,0.18)', 'rgba(255,140,40,0.05)', 'rgba(0,0,0,0.4)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <SumiCoinIcon size={20} />
            <View style={styles.sumiTextCol}>
              <Text style={styles.sumiValue}>{formatNumber(sumi)}</Text>
              <Text style={styles.sumiLabel}>SUMI</Text>
            </View>
            <ChevronRightIcon size={12} color={colors.goldDim} />
          </Pressable>

          <View style={styles.hubWrap}>
            <Pressable style={styles.hubBtn} onPress={onHub}>
              <LinearGradient
                colors={['rgba(255,200,87,0.14)', 'rgba(0,0,0,0.3)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <CitizensIcon size={15} color={colors.gold} />
              <Text style={styles.hubLabel}>CITIZENS HUB</Text>
            </Pressable>
            {hubBadge > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{hubBadge > 9 ? '9+' : hubBadge}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.bellWrap}>
            <Pressable style={styles.bellBtn} onPress={onBell}>
              <LinearGradient
                colors={['rgba(255,200,87,0.14)', 'rgba(0,0,0,0.3)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <BellIcon size={15} color={colors.gold} />
            </Pressable>
            <View style={styles.bellDot} />
          </View>
        </View>
      </View>
    </View>
  );
}

const goldGlow = (strength: 'strong' | 'soft') =>
  Platform.select({
    web: {
      boxShadow:
        strength === 'strong'
          ? '0 0 14px rgba(255,200,87,0.42)'
          : '0 0 10px rgba(255,200,87,0.3)',
    },
    default: {
      shadowColor: colors.goldBright,
      shadowOpacity: strength === 'strong' ? 0.45 : 0.32,
      shadowRadius: strength === 'strong' ? 12 : 8,
      shadowOffset: { width: 0, height: 0 },
    },
  });

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,200,87,0.16)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
    gap: 8,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexShrink: 0,
  },
  logoGlow: {
    ...Platform.select({
      web: { boxShadow: '0 0 16px rgba(255,180,60,0.65)' },
      default: {
        shadowColor: colors.orangeGlow,
        shadowOpacity: 0.7,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  brandTop: {
    color: '#F7F1E4',
    fontFamily: 'Cinzel_700Bold',
    fontSize: 10,
    letterSpacing: 1.8,
    lineHeight: 12,
  },
  brandBottom: {
    color: '#FFFFFF',
    fontFamily: 'Cinzel_700Bold',
    fontSize: 12,
    letterSpacing: 2.4,
    lineHeight: 14,
  },
  rightCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexShrink: 1,
  },
  sumiPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: 'rgba(6, 4, 2, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(232, 176, 74, 0.58)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: 'hidden',
    ...goldGlow('strong'),
  },
  sumiTextCol: {
    minWidth: 44,
  },
  sumiValue: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    lineHeight: 16,
  },
  sumiLabel: {
    color: '#FFFFFF',
    fontFamily: 'DMSans_500Medium',
    fontSize: 8,
    letterSpacing: 1.4,
    lineHeight: 10,
    opacity: 0.88,
  },
  hubWrap: {
    position: 'relative',
    ...goldGlow('soft'),
  },
  hubBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(6, 4, 2, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(232, 176, 74, 0.52)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  hubLabel: {
    color: '#FFFFFF',
    fontFamily: 'DMSans_500Medium',
    fontSize: 8,
    letterSpacing: 0.7,
    lineHeight: 10,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -4,
    backgroundColor: colors.danger,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.28)',
    zIndex: 2,
    ...Platform.select({
      web: { boxShadow: '0 0 6px rgba(224,69,69,0.75)' },
      default: {
        shadowColor: colors.danger,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: 'DMSans_700Bold',
    lineHeight: 11,
  },
  bellWrap: {
    position: 'relative',
    ...goldGlow('soft'),
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: 'rgba(232, 176, 74, 0.52)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(6, 4, 2, 0.94)',
    overflow: 'hidden',
  },
  bellDot: {
    position: 'absolute',
    top: 4,
    right: 5,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.danger,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    zIndex: 2,
  },
});
