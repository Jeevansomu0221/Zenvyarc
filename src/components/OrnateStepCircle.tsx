import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Path,
  G,
} from 'react-native-svg';
import { CrownEmblem } from './icons/ZenvyIcons';
import { Sparkles } from './Sparkles';
import { colors } from '../theme/colors';

type Props = {
  size?: number;
  children?: React.ReactNode;
};

/** Ornate brushed-gold frame matching the Figma step artifact. */
export function OrnateStepCircle({ size = 168, children }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 3;
  const midR = outerR - 6;
  const innerR = midR - 5;
  const coreR = innerR - 4;

  return (
    <View style={[styles.shell, { width: size + 20, height: size + 32 }]}>
      {/* Atmospheric outer glow */}
      <View
        style={[
          styles.aura,
          {
            width: size + 16,
            height: size + 16,
            borderRadius: (size + 16) / 2,
            top: 10,
            left: 2,
          },
        ]}
      />

      <Sparkles
        width={size + 20}
        height={size + 32}
        sparks={[
          { top: 16, left: size * 0.06, size: 2, opacity: 0.85 },
          { top: 24, left: size * 0.9, size: 1.6, opacity: 0.7 },
          { top: size * 0.38, left: 0, size: 1.4, opacity: 0.6 },
          { top: size * 0.42, left: size * 0.95, size: 1.8, opacity: 0.8 },
          { top: size * 0.75, left: 4, size: 1.4, opacity: 0.5 },
          { top: size * 0.72, left: size * 0.9, size: 2, opacity: 0.75 },
        ]}
      />

      {/* Crown perched on top of the ring */}
      <View style={[styles.crown, { left: (size + 20) / 2 - 12, top: 0 }]}>
        <CrownEmblem size={24} />
      </View>

      <View style={[styles.ringBox, { width: size, height: size, marginTop: 16, marginLeft: 10 }]}>
        <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="ornateOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FFF8E0" />
              <Stop offset="22%" stopColor="#FFC857" />
              <Stop offset="55%" stopColor="#C9852A" />
              <Stop offset="78%" stopColor="#FFB04A" />
              <Stop offset="100%" stopColor="#8A5018" />
            </LinearGradient>
            <LinearGradient id="ornateMid" x1="100%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FFE29A" />
              <Stop offset="40%" stopColor="#E8A84A" />
              <Stop offset="100%" stopColor="#6B3A12" />
            </LinearGradient>
            <LinearGradient id="ornateInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FFF4C2" />
              <Stop offset="50%" stopColor="#D4923A" />
              <Stop offset="100%" stopColor="#5A2E0C" />
            </LinearGradient>
            <RadialGradient id="ornateCore" cx="50%" cy="42%" r="58%">
              <Stop offset="0%" stopColor="rgba(255,180,60,0.22)" />
              <Stop offset="45%" stopColor="rgba(40,24,10,0.55)" />
              <Stop offset="100%" stopColor="rgba(4,3,2,0.96)" />
            </RadialGradient>
            <LinearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FFFBE8" />
              <Stop offset="40%" stopColor="#FFC857" />
              <Stop offset="100%" stopColor="#F07A2A" />
            </LinearGradient>
            <RadialGradient id="gemGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="rgba(255,230,160,0.95)" />
              <Stop offset="55%" stopColor="rgba(255,160,40,0.55)" />
              <Stop offset="100%" stopColor="rgba(255,120,30,0)" />
            </RadialGradient>
          </Defs>

          <Circle
            cx={cx}
            cy={cy}
            r={outerR + 2.5}
            stroke="rgba(255,200,87,0.18)"
            strokeWidth={1}
            fill="none"
          />

          <Circle
            cx={cx}
            cy={cy}
            r={outerR}
            stroke="url(#ornateOuter)"
            strokeWidth={10}
            fill="none"
          />
          <Circle
            cx={cx}
            cy={cy}
            r={outerR + 4}
            stroke="rgba(255,248,220,0.45)"
            strokeWidth={1.1}
            fill="none"
          />
          <Circle
            cx={cx}
            cy={cy}
            r={outerR - 4.5}
            stroke="rgba(80,45,12,0.65)"
            strokeWidth={1}
            fill="none"
          />

          <Circle
            cx={cx}
            cy={cy}
            r={midR}
            stroke="url(#ornateMid)"
            strokeWidth={4}
            fill="none"
          />

          <Circle
            cx={cx}
            cy={cy}
            r={innerR}
            stroke="url(#ornateInner)"
            strokeWidth={2.2}
            fill="none"
          />
          <Circle
            cx={cx}
            cy={cy}
            r={innerR - 2.5}
            stroke="rgba(255,220,140,0.35)"
            strokeWidth={1}
            fill="none"
          />

          <Circle cx={cx} cy={cy} r={coreR} fill="url(#ornateCore)" />
          <Circle
            cx={cx}
            cy={cy}
            r={coreR}
            stroke="rgba(255,200,87,0.22)"
            strokeWidth={1}
            fill="none"
          />

          <Circle cx={cx} cy={size - 8} r={12} fill="url(#gemGlow)" />
          <G transform={`translate(${cx - 7}, ${size - 17})`}>
            <Path d="M7 0 L13.5 7 L7 14 L0.5 7 Z" fill="url(#gemGrad)" />
            <Path d="M7 2 L11 7 L7 12 L3 7 Z" fill="rgba(255,255,255,0.35)" />
          </G>
        </Svg>

        <View style={[styles.center, { width: coreR * 2 - 6, maxWidth: size * 0.64 }]}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'visible',
  },
  aura: {
    position: 'absolute',
    backgroundColor: 'rgba(255,168,40,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.2)',
    ...Platform.select({
      web: { boxShadow: '0 0 28px rgba(255,180,60,0.45)' },
      default: {
        shadowColor: colors.goldBright,
        shadowOpacity: 0.5,
        shadowRadius: 22,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  crown: {
    position: 'absolute',
    zIndex: 4,
    ...Platform.select({
      web: { boxShadow: '0 0 12px rgba(255,200,87,0.7)' },
      default: {
        shadowColor: colors.goldBright,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  ringBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...Platform.select({
      web: { boxShadow: '0 0 22px rgba(255,154,46,0.55)' },
      default: {
        shadowColor: '#FF9A2E',
        shadowOpacity: 0.55,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 0 },
      },
    }),
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 4,
  },
});
