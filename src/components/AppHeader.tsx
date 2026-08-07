import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { colors } from '../theme/colors';
import { formatNumber } from '../data/mockData';

type Props = {
  sumi: number;
  hubBadge?: number;
  onHub?: () => void;
  onBell?: () => void;
};

export function AppHeader({ sumi, hubBadge = 0, onHub, onBell }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        <Image source={require('../../assets/art/logo-mark.png')} style={styles.logo} />
        <View>
          <Text style={styles.brandTop}>ZENVY</Text>
          <Text style={styles.brandBottom}>ARC</Text>
        </View>
      </View>

      <View style={styles.sumiPill}>
        <Text style={styles.sumiIcon}>⏳</Text>
        <Text style={styles.sumiText}>{formatNumber(sumi)} SUMI</Text>
        <Text style={styles.sumiChevron}>›</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.hubBtn} onPress={onHub}>
          <Text style={styles.hubIcon}>👤</Text>
          <Text style={styles.hubLabel}>CITIZENS{'\n'}HUB</Text>
          {hubBadge > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{hubBadge}</Text>
            </View>
          ) : null}
        </Pressable>
        <Pressable style={styles.bellBtn} onPress={onBell}>
          <Text style={styles.bell}>🔔</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 10,
    gap: 8,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 86,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  brandTop: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 11,
    letterSpacing: 1.2,
    lineHeight: 13,
  },
  brandBottom: {
    color: colors.goldBright,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 13,
    letterSpacing: 2,
    lineHeight: 14,
  },
  sumiPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(30, 22, 10, 0.9)',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexShrink: 1,
  },
  sumiIcon: { fontSize: 12 },
  sumiText: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
  },
  sumiChevron: {
    color: colors.gold,
    fontSize: 16,
    marginTop: -2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hubBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(28, 20, 12, 0.95)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 6,
    position: 'relative',
  },
  hubIcon: { fontSize: 11 },
  hubLabel: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 7,
    lineHeight: 9,
    letterSpacing: 0.4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -2,
    backgroundColor: colors.danger,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.white,
    fontSize: 8,
    fontFamily: 'DMSans_700Bold',
  },
  bellBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(28, 20, 12, 0.95)',
  },
  bell: { fontSize: 13 },
});
