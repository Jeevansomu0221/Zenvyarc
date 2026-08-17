import React from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  color?: string;
  intensity?: 'soft' | 'medium' | 'strong';
  style?: ViewStyle;
};

const INTENSITY = {
  soft: { opacity: 0.35, radius: 8 },
  medium: { opacity: 0.55, radius: 14 },
  strong: { opacity: 0.75, radius: 22 },
};

export function GlowView({
  children,
  color = '#FFC857',
  intensity = 'medium',
  style,
}: Props) {
  const cfg = INTENSITY[intensity];
  return (
    <View
      style={[
        styles.wrap,
        {
          shadowColor: color,
          shadowOpacity: cfg.opacity,
          shadowRadius: cfg.radius,
          shadowOffset: { width: 0, height: 0 },
          ...(Platform.OS === 'android' ? { elevation: Math.round(cfg.radius / 2) } : {}),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'visible',
  },
});
