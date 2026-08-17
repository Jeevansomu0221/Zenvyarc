import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  children: string;
  style?: TextStyle;
  variant?: 'gold' | 'copper' | 'crimson';
};

const VARIANTS = {
  gold: {
    color: colors.goldBright,
    textShadowColor: 'rgba(255, 200, 87, 0.65)',
  },
  copper: {
    color: '#FFC857',
    textShadowColor: 'rgba(255, 160, 60, 0.7)',
  },
  crimson: {
    color: '#FFB04A',
    textShadowColor: 'rgba(255, 120, 40, 0.65)',
  },
};

/** Gradient-like metallic headline without extra native deps. */
export function GradientText({ children, style, variant = 'gold' }: Props) {
  const v = VARIANTS[variant];
  return (
    <Text
      style={[
        styles.base,
        {
          color: v.color,
          textShadowColor: v.textShadowColor,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    textShadowRadius: 14,
    textShadowOffset: { width: 0, height: 0 },
  },
});
