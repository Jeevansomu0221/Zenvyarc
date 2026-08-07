import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '../theme/colors';

type Props = {
  progress: number;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
  glowColor?: string;
};

export function ProgressRing({
  progress,
  size = 140,
  stroke = 10,
  children,
  glowColor = colors.orangeGlow,
}: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  const offset = circumference * (1 - clamped);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.goldBright} />
            <Stop offset="100%" stopColor={glowColor} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(80, 55, 25, 0.55)"
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center}>{children}</View>
    </View>
  );
}

export function RingLabel({
  eyebrow,
  value,
  sub,
}: {
  eyebrow?: string;
  value: string;
  sub?: string;
}) {
  return (
    <View style={styles.labelWrap}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.value}>{value}</Text>
      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  labelWrap: { alignItems: 'center' },
  eyebrow: {
    color: colors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 8,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  value: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 13,
    textAlign: 'center',
  },
  sub: {
    color: colors.gold,
    fontFamily: 'DMSans_500Medium',
    fontSize: 9,
    marginTop: 4,
    textAlign: 'center',
  },
});
