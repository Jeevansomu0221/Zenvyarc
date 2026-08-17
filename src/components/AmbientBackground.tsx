import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { Sparkles, Spark } from './Sparkles';

const EMBERS: Spark[] = [
  { top: '6%', left: '10%', size: 1.8, opacity: 0.35, color: colors.orangeGlow },
  { top: '12%', left: '82%', size: 2.2, opacity: 0.28, color: colors.goldBright },
  { top: '24%', left: '4%', size: 1.2, opacity: 0.2 },
  { top: '38%', left: '94%', size: 1.6, opacity: 0.3, color: colors.orange },
  { top: '52%', left: '16%', size: 1, opacity: 0.16 },
  { top: '64%', left: '88%', size: 2, opacity: 0.22, color: colors.orangeGlow },
  { top: '76%', left: '42%', size: 1.2, opacity: 0.14 },
  { top: '86%', left: '72%', size: 1.6, opacity: 0.2, color: colors.goldBright },
  { top: '20%', left: '48%', size: 1, opacity: 0.12, color: colors.gold },
];

export function AmbientBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={['#050607', '#020304', '#010203']}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(255,80,25,0.09)', 'transparent', 'transparent']}
        start={{ x: 0.6, y: 0 }}
        end={{ x: 0.4, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.7)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.6)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <Sparkles sparks={EMBERS} />
    </View>
  );
}
