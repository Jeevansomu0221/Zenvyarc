import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { LaurelSide } from './icons/ZenvyIcons';

type Props = {
  value: string;
  label: string;
};

export function LaurelBadge({ value, label }: Props) {
  return (
    <View style={styles.wrap}>
      <LaurelSide size={16} color={colors.gold} />
      <View style={styles.body}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <LaurelSide size={16} flip color={colors.gold} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.38)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'rgba(14, 10, 6, 0.94)',
    shadowColor: colors.goldBright,
    shadowOpacity: 0.28,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  body: { alignItems: 'center', minWidth: 72 },
  value: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
  },
  label: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 7,
    letterSpacing: 1,
  },
});
