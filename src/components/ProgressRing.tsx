import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, RadialGradient } from 'react-native-svg';
import { colors } from '../theme/colors';
import { Sparkles } from './Sparkles';

type Props = {
  progress: number;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
  glowColor?: string;
  premium?: boolean;
};

export function ProgressRing({
  progress,
  size = 140,
  stroke = 10,
  children,
  glowColor = colors.orangeGlow,
  premium = false,
}: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  const offset = circumference * (1 - clamped);
  const gradId = `ringGrad-${size}`;
  const glowId = `ringGlow-${size}`;

  return (
    <View
      style={[
        styles.shell,
        { width: size + (premium ? 28 : 0), height: size + (premium ? 28 : 0) },
      ]}
    >
      {premium ? (
        <>
          <View
            style={[
              styles.halo,
              {
                width: size + 24,
                height: size + 24,
                borderRadius: (size + 24) / 2,
                top: 2,
                left: 2,
              },
            ]}
          />
          <View
            style={[
              styles.haloInner,
              {
                width: size + 10,
                height: size + 10,
                borderRadius: (size + 10) / 2,
                top: 9,
                left: 9,
              },
            ]}
          />
          <Sparkles
            width={size + 28}
            height={size + 28}
            sparks={[
              { top: 4, left: size * 0.12, size: 2.5, opacity: 1 },
              { top: size * 0.08, left: size * 0.82, size: 2, opacity: 0.85 },
              { top: size * 0.22, left: 2, size: 1.5, opacity: 0.7 },
              { top: size * 0.18, left: size * 0.9, size: 2, opacity: 0.9 },
              { top: size * 0.42, left: 0, size: 2, opacity: 0.8 },
              { top: size * 0.38, left: size * 0.94, size: 2.5, opacity: 1 },
              { top: size * 0.62, left: 4, size: 1.5, opacity: 0.65 },
              { top: size * 0.58, left: size * 0.88, size: 2, opacity: 0.85 },
              { top: size * 0.78, left: size * 0.14, size: 2, opacity: 0.75 },
              { top: size * 0.74, left: size * 0.8, size: 1.5, opacity: 0.6 },
            ]}
          />
        </>
      ) : null}

      <View
        style={[
          styles.ringBox,
          {
            width: size,
            height: size,
            marginTop: premium ? 14 : 0,
            marginLeft: premium ? 14 : 0,
          },
        ]}
      >
        <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FFF4C2" />
              <Stop offset="35%" stopColor={colors.goldBright} />
              <Stop offset="100%" stopColor={glowColor} />
            </LinearGradient>
            <RadialGradient id={glowId} cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="rgba(255, 160, 50, 0.38)" />
              <Stop offset="45%" stopColor="rgba(255, 200, 87, 0.18)" />
              <Stop offset="80%" stopColor="rgba(240, 90, 32, 0.08)" />
              <Stop offset="100%" stopColor="rgba(14, 11, 8, 0)" />
            </RadialGradient>
          </Defs>

          {/* Foggy Atmospheric Center Background */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius - stroke / 2}
            fill={`url(#${glowId})`}
          />

          {premium ? (
            <>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius + 9}
                stroke="rgba(255,200,87,0.08)"
                strokeWidth={1}
                fill="none"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius + 6}
                stroke="rgba(255,200,87,0.15)"
                strokeWidth={1}
                fill="none"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius + 3}
                stroke="rgba(255,220,140,0.28)"
                strokeWidth={2}
                fill="none"
              />
            </>
          ) : null}

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(50, 35, 18, 0.85)"
            strokeWidth={stroke}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(120, 80, 30, 0.35)"
            strokeWidth={stroke - 4}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradId})`}
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
  shell: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  halo: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 168, 40, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 200, 87, 0.15)',
    shadowColor: '#FFC857',
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
  },
  haloInner: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 200, 87, 0.28)',
    backgroundColor: 'rgba(255, 168, 40, 0.04)',
  },
  ringBox: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF9A2E',
    shadowOpacity: 0.55,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
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
