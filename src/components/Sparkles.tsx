import React from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import { colors } from '../theme/colors';

export type Spark = {
  top: DimensionValue;
  left: DimensionValue;
  size?: number;
  opacity?: number;
  color?: string;
};

type Props = {
  sparks?: Spark[];
  width?: number | string;
  height?: number | string;
  style?: object;
};

const DEFAULT_SPARKS: Spark[] = [
  { top: '6%', left: '18%', size: 2.5, opacity: 1 },
  { top: '12%', left: '78%', size: 1.5, opacity: 0.7 },
  { top: '22%', left: '8%', size: 1.5, opacity: 0.6 },
  { top: '18%', left: '88%', size: 2, opacity: 0.85 },
  { top: '38%', left: '4%', size: 2, opacity: 0.9 },
  { top: '32%', left: '92%', size: 1.5, opacity: 0.65 },
  { top: '58%', left: '6%', size: 1.5, opacity: 0.55 },
  { top: '52%', left: '90%', size: 2.5, opacity: 0.95 },
  { top: '72%', left: '14%', size: 1.5, opacity: 0.7 },
  { top: '68%', left: '82%', size: 2, opacity: 0.8 },
  { top: '84%', left: '28%', size: 1.5, opacity: 0.5 },
  { top: '80%', left: '72%', size: 2, opacity: 0.75 },
  { top: '46%', left: '50%', size: 1, opacity: 0.4 },
];

export function Sparkles({ sparks = DEFAULT_SPARKS, width = '100%', height = '100%', style }: Props) {
  return (
    <View style={[styles.wrap, { width, height }, style]} pointerEvents="none">
      {sparks.map((s, i) => (
        <View
          key={i}
          style={[
            styles.spark,
            {
              top: s.top,
              left: s.left,
              width: s.size ?? 2,
              height: s.size ?? 2,
              opacity: s.opacity ?? 0.8,
              backgroundColor: s.color ?? colors.goldBright,
              shadowColor: s.color ?? colors.goldBright,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'visible',
  },
  spark: {
    position: 'absolute',
    borderRadius: 99,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
});
