import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  title?: string;
  right?: React.ReactNode;
  accent?: string;
};

export function GlassCard({ children, style, title, right, accent }: Props) {
  return (
    <View style={[styles.card, accent ? { borderColor: accent } : null, style]}>
      {title ? (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {right}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 11,
    letterSpacing: 1.1,
  },
});
