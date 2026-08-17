import React from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
  Rect,
} from 'react-native-svg';
import { colors } from '../../theme/colors';

type IconProps = {
  size?: number;
  color?: string;
  secondary?: string;
};

export function LogoMarkSvg({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Defs>
        <LinearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFF4C2" />
          <Stop offset="45%" stopColor="#FFC857" />
          <Stop offset="100%" stopColor="#F07A2A" />
        </LinearGradient>
      </Defs>
      <Path
        d="M32 4 L56 52 L44 52 L32 28 L20 52 L8 52 Z"
        fill="url(#logoGold)"
      />
      <Path
        d="M32 18 L40 36 L32 30 L24 36 Z"
        fill="#1A1208"
        opacity={0.55}
      />
    </Svg>
  );
}

export function SumiCoinIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Defs>
        <LinearGradient id="sumiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFF4C2" />
          <Stop offset="50%" stopColor="#FFC857" />
          <Stop offset="100%" stopColor="#C9852A" />
        </LinearGradient>
      </Defs>
      <Circle cx={16} cy={16} r={15} fill="url(#sumiGrad)" />
      <Circle cx={16} cy={16} r={12} stroke="#7A4E14" strokeWidth={1.2} fill="#E8A84A" />
      <Path
        d="M16 7 L22 21 H19.2 L17.6 16.5 H14.4 L12.8 21 H10 Z M15.1 14.2 H16.9 L16 11.4 Z"
        fill="#3A240A"
      />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 12, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M6 3 L11 8 L6 13"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CitizensIcon({ size = 14, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={9} cy={8} r={3} stroke={color} strokeWidth={1.6} />
      <Circle cx={16.5} cy={9} r={2.4} stroke={color} strokeWidth={1.5} />
      <Path
        d="M3.5 19 C3.5 15.8 5.8 13.8 9 13.8 C12.2 13.8 14.5 15.8 14.5 19"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Path
        d="M14.2 19 C14.4 16.6 16 15.2 18.4 15.2 C20.4 15.2 21.8 16.4 22 18.4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function BellIcon({ size = 15, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3 C9 3 7 5.2 7 8.2 V11.5 C7 13.2 6.2 14.6 5 15.5 H19 C17.8 14.6 17 13.2 17 11.5 V8.2 C17 5.2 15 3 12 3 Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path
        d="M10 18.2 C10.4 19.4 11.1 20 12 20 C12.9 20 13.6 19.4 14 18.2"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function DiamondIcon({ size = 8, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12">
      <Path d="M6 1 L11 6 L6 11 L1 6 Z" fill={color} />
    </Svg>
  );
}

export function ChartIcon({ size = 12, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 19 V11" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M10 19 V7" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M15 19 V10" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M20 19 V4" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ShieldIcon({ size = 13, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3 L19 6.2 V12.2 C19 16.4 16.2 19.8 12 21 C7.8 19.8 5 16.4 5 12.2 V6.2 Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path
        d="M9 12.2 L11.1 14.3 L15.2 9.8"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SwordsIcon({ size = 13, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 4 L11 10 M4 5 L10 11"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Path d="M9.5 11.5 L7 19" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path
        d="M19 4 L13 10 M20 5 L14 11"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Path d="M14.5 11.5 L17 19" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M8 14 H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function BeaconIcon({ size = 13, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 21 H15" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M10 21 V14 H14 V21" stroke={color} strokeWidth={1.6} />
      <Path
        d="M8 14 H16 L15 9 H9 Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Path d="M12 9 V5" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M9 4.5 H15" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M12 3 V2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function HomeIcon({ size = 18, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CastleIcon({ size = 18, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 20 V10 L7 7 V10 L10 7 V10 L14 7 V10 L17 7 V10 L20 10 V20 Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Path d="M10 20 V15 H14 V20" stroke={color} strokeWidth={1.6} />
      <Path d="M4 7 V4 M7 7 V4 M10 7 V4 M14 7 V4 M17 7 V4 M20 7 V4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function HelmetIcon({ size = 18, color = colors.gold }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 14 C5 8.5 8 5 12 5 C16 5 19 8.5 19 14"
        stroke={color}
        strokeWidth={1.7}
      />
      <Path
        d="M4 15 H20 L18.5 20 H5.5 Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path d="M12 5 V8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M9 12 H15" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 12, color = colors.success }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3.5 8.2 L6.5 11.2 L12.5 4.8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function NavArrowIcon({ size = 12, color = '#90CAF9' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 3 L20 20 L12 16 L4 20 Z" fill={color} />
    </Svg>
  );
}

export function CrownEmblem({ size = 22 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Defs>
        <LinearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFF4C2" />
          <Stop offset="55%" stopColor="#FFC857" />
          <Stop offset="100%" stopColor="#F07A2A" />
        </LinearGradient>
      </Defs>
      <Path
        d="M6 22 L8 10 L13 16 L16 8 L19 16 L24 10 L26 22 Z"
        fill="url(#crownGrad)"
      />
      <Rect x={6} y={22} width={20} height={3.5} rx={1} fill="url(#crownGrad)" />
      <Circle cx={8} cy={10} r={1.6} fill="#FFF8E0" />
      <Circle cx={16} cy={8} r={1.8} fill="#FFF8E0" />
      <Circle cx={24} cy={10} r={1.6} fill="#FFF8E0" />
    </Svg>
  );
}

export function MountainPeakIcon({
  size = 26,
  color = colors.mountains.crimsonSoft,
}: IconProps) {
  const gradId = `peakGrad-${color.replace('#', '')}`;
  const glowId = `peakGlow-${color.replace('#', '')}`;
  return (
    <Svg width={size} height={size} viewBox="0 0 48 40">
      <Defs>
        <LinearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.55} />
          <Stop offset="18%" stopColor={color} />
          <Stop offset="100%" stopColor="#0A0604" />
        </LinearGradient>
        <LinearGradient id={glowId} x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={color} stopOpacity={0.9} />
          <Stop offset="100%" stopColor={color} stopOpacity={0.15} />
        </LinearGradient>
      </Defs>
      {/* Left peak */}
      <Path d="M8 34 L16 14 L24 34 Z" fill={`url(#${glowId})`} />
      {/* Right peak */}
      <Path d="M24 34 L32 16 L40 34 Z" fill={`url(#${glowId})`} />
      {/* Center peak (tallest) */}
      <Path
        d="M14 34 L24 4 L34 34 Z"
        fill={`url(#${gradId})`}
        stroke={color}
        strokeWidth={1.2}
      />
      <Path d="M24 10 L28 22 H20 Z" fill="#FFF8E0" opacity={0.4} />
    </Svg>
  );
}

export function CrimsonShieldBadge({ size = 16 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <LinearGradient id="shieldCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FF6B6B" />
          <Stop offset="55%" stopColor="#C62828" />
          <Stop offset="100%" stopColor="#7A1212" />
        </LinearGradient>
      </Defs>
      <Path
        d="M12 2 L20 5.5 V12 C20 16.8 16.6 20.6 12 22 C7.4 20.6 4 16.8 4 12 V5.5 Z"
        fill="url(#shieldCrimson)"
        stroke="#FFC857"
        strokeWidth={1}
      />
      <Path
        d="M12 7 V15 M8.5 11 H15.5"
        stroke="#FFF4C2"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function LaurelSide({
  size = 18,
  flip = false,
  color = colors.gold,
}: {
  size?: number;
  flip?: boolean;
  color?: string;
}) {
  return (
    <Svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 24 34"
      style={flip ? { transform: [{ scaleX: -1 }] } : undefined}
    >
      <Path
        d="M14 32 C8 26 5 18 7 10 C9 14 12 18 14 22"
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path d="M8 11 C5 9.5 4 7 5.5 5.5 C8 7.2 9 9.5 8 11 Z" fill={color} />
      <Path d="M7 15 C4 13.8 3 11.2 4.6 9.8 C7.2 11.4 8 13.6 7 15 Z" fill={color} />
      <Path d="M6.5 19.5 C3.4 18.5 2.4 15.8 4 14.4 C6.8 16 7.6 18.2 6.5 19.5 Z" fill={color} />
      <Path d="M6.8 24 C3.8 23.2 2.8 20.5 4.4 19 C7.2 20.6 7.8 22.8 6.8 24 Z" fill={color} />
      <Path d="M8 28 C5.2 27.5 4.2 25 5.6 23.6 C8.2 25 8.8 27 8 28 Z" fill={color} />
    </Svg>
  );
}

export function TimerIcon({ size = 11, color = colors.goldBright }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M5 2 H11" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
      <Path
        d="M5 3.5 L7.2 7 L5 10.5 H11 L8.8 7 L11 3.5 Z"
        stroke={color}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <Path d="M8 10.5 V13.5" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

export function FlagIcon({ size = 12, color = colors.orangeGlow }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M3 2 V14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M3.5 3 H12 L9.5 6 L12 9 H3.5 Z" fill={color} />
    </Svg>
  );
}
