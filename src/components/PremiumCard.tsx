import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, Spark } from './Sparkles';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glow?: boolean;
  sparks?: boolean;
};

const CORNER_SPARKS: Spark[] = [
  { top: 6, left: 8, size: 2, opacity: 0.85, color: '#FFC857' },
  { top: 6, left: '92%', size: 1.5, opacity: 0.55 },
  { top: '88%', left: 10, size: 1.5, opacity: 0.5 },
  { top: '90%', left: '90%', size: 2, opacity: 0.7, color: '#FF8A3D' },
];

export function PremiumCard({ children, style, glow = false, sparks = false }: Props) {
  return (
    <View style={[styles.outer, glow && styles.outerGlow, style]}>
      <LinearGradient
        colors={[
          'rgba(255,220,140,0.55)',
          'rgba(255,160,50,0.22)',
          'rgba(255,200,87,0.38)',
          'rgba(180,120,40,0.25)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.border}
      >
        <View style={[styles.inner, glow && styles.innerGlow]}>
          <LinearGradient
            colors={['rgba(255,255,255,0.08)', 'transparent', 'rgba(0,0,0,0.45)']}
            style={styles.innerSheen}
          />
          <LinearGradient
            colors={['rgba(255,168,40,0.12)', 'transparent']}
            style={styles.topBloom}
          />
          {sparks ? <Sparkles sparks={CORNER_SPARKS} /> : null}
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  outerGlow: {
    shadowColor: '#FFC857',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  border: {
    borderRadius: 14,
    padding: 1.5,
  },
  inner: {
    backgroundColor: 'rgba(6, 5, 4, 0.96)',
    borderRadius: 12.5,
    padding: 9,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.12)',
  },
  innerGlow: {
    shadowColor: '#FF9A2E',
    shadowOpacity: 0.22,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
  },
  innerSheen: {
    ...StyleSheet.absoluteFill,
    borderRadius: 12.5,
  },
  topBloom: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    borderTopLeftRadius: 12.5,
    borderTopRightRadius: 12.5,
  },
});
