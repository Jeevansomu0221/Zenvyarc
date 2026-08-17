import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumCard } from '../PremiumCard';
import { GlowView } from '../GlowView';
import { Sparkles } from '../Sparkles';
import {
  CheckIcon,
  FlagIcon,
  NavArrowIcon,
  ShieldIcon,
} from '../icons/ZenvyIcons';
import { colors } from '../../theme/colors';
import { formatKm } from '../../utils/geo';

type Props = {
  active: boolean;
  verified: boolean;
  title: string;
  message: string;
  accuracyM: number | null;
  lastSync: string | null;
  distanceKm: number;
  fromGps: boolean;
};

export function GeoGuardCard({
  active,
  verified,
  title,
  message,
  accuracyM,
  lastSync,
  distanceKm,
  fromGps,
}: Props) {
  const statusLabel = active ? 'Geo-Guard Active' : 'Geo-Guard Idle';
  const accuracyLabel =
    accuracyM != null ? `${accuracyM.toFixed(1)} m` : '—';
  const syncLabel = lastSync ?? '—';
  const kmLabel = `${formatKm(distanceKm)} km`;
  const kmHint = fromGps ? 'GPS today' : 'est. from steps';

  return (
    <PremiumCard sparks>
      <View style={styles.geoHeader}>
        <View style={styles.titleRow}>
          <ShieldIcon size={13} color={colors.gold} />
          <Text style={styles.cardTitle}>LIVE STEP VERIFICATION</Text>
        </View>
        <View style={styles.geoActiveRow}>
          <View style={[styles.greenDot, !active && styles.idleDot]} />
          <Text style={[styles.geoActive, !active && styles.idleText]}>
            {statusLabel}
          </Text>
        </View>
      </View>

      <View style={styles.geoBody}>
        <View style={styles.geoMap}>
          <LinearGradient
            colors={['#060504', '#100E0A', '#18140E']}
            style={StyleSheet.absoluteFill}
          />
          <Sparkles
            sparks={[
              { top: 10, left: 24, size: 1.5, opacity: 0.4 },
              { top: 40, left: 70, size: 2, opacity: 0.65, color: colors.orangeGlow },
              { top: 72, left: 40, size: 1.5, opacity: 0.35 },
            ]}
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View key={`h${i}`} style={[styles.gridH, { top: 12 + i * 15 }]} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <View key={`v${i}`} style={[styles.gridV, { left: 10 + i * 22 }]} />
          ))}
          <GlowView intensity="medium" style={styles.geoPathGlow}>
            <View style={[styles.geoSeg, { left: 10, top: 68, width: 40, transform: [{ rotate: '-12deg' }] }]} />
            <View style={[styles.geoSeg, { left: 46, top: 56, width: 42, transform: [{ rotate: '-22deg' }] }]} />
            <View style={[styles.geoSeg, { left: 84, top: 40, width: 44, transform: [{ rotate: '-8deg' }] }]} />
          </GlowView>
          <View style={[styles.geoNode, { left: 10, top: 68 }]} />
          <View style={[styles.geoNode, { left: 50, top: 54 }]} />
          <GlowView intensity="strong" style={{ position: 'absolute', left: 86, top: 36 }}>
            <View style={[styles.geoNode, { left: 0, top: 0 }]} />
          </GlowView>
          <View style={styles.geoFlag}>
            <FlagIcon size={12} />
          </View>
          <GlowView intensity="strong" color="#42A5F5" style={styles.geoRadarWrap}>
            <View style={styles.geoRadar}>
              <View style={styles.geoRadarPulse} />
              <View style={styles.geoRadarPulseOuter} />
              <View style={styles.geoArrow}>
                <NavArrowIcon size={11} />
              </View>
            </View>
          </GlowView>
        </View>

        <View style={styles.geoInfo}>
          <View style={styles.verifyBox}>
            <View style={styles.verifyRow}>
              <View
                style={[
                  styles.checkCircle,
                  !verified && styles.checkCircleIdle,
                ]}
              >
                <CheckIcon
                  size={11}
                  color={verified ? colors.success : colors.goldDim}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.verifyTitle,
                    !verified && { color: colors.gold },
                  ]}
                >
                  {title}
                </Text>
                <Text style={styles.verifySub}>{message}</Text>
              </View>
            </View>
            <View style={styles.geoMetaRow}>
              <View style={styles.geoMetaCol}>
                <Text style={styles.geoMetaLabel}>DISTANCE</Text>
                <Text style={styles.geoMetaValGreen}>{kmLabel}</Text>
                <Text style={styles.geoMetaHint}>{kmHint}</Text>
              </View>
              <View style={styles.geoMetaDivider} />
              <View style={styles.geoMetaCol}>
                <Text style={styles.geoMetaLabel}>GPS ACCURACY</Text>
                <Text
                  style={
                    verified ? styles.geoMetaValGreen : styles.geoMetaVal
                  }
                >
                  {accuracyLabel}
                </Text>
              </View>
              <View style={styles.geoMetaDivider} />
              <View style={styles.geoMetaCol}>
                <Text style={styles.geoMetaLabel}>LAST SYNC</Text>
                <Text style={styles.geoMetaVal}>{syncLabel}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.geoFootRow}>
        <ShieldIcon size={12} color={colors.goldDim} />
        <Text style={styles.geoFoot}>
          {fromGps
            ? 'GPS path confirms movement so every kilometre is earned.'
            : 'Enable location for live km tracking and walk verification.'}
        </Text>
      </View>
    </PremiumCard>
  );
}

const styles = StyleSheet.create({
  geoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  cardTitle: {
    color: colors.gold,
    fontFamily: 'Cinzel_700Bold',
    fontSize: 10.5,
    letterSpacing: 1.1,
  },
  geoActiveRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOpacity: 0.95,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  idleDot: {
    backgroundColor: colors.goldDim,
    shadowColor: colors.goldDim,
    shadowOpacity: 0.4,
  },
  geoActive: {
    color: colors.success,
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
  },
  idleText: { color: colors.goldDim },
  geoBody: { flexDirection: 'row', gap: 10 },
  geoMap: {
    flex: 1.15,
    height: 108,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.22)',
    shadowColor: colors.orangeGlow,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  gridH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(232,176,74,0.08)',
  },
  gridV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(232,176,74,0.08)',
  },
  geoPathGlow: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  geoSeg: {
    position: 'absolute',
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.orangeGlow,
  },
  geoNode: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.orange,
    borderWidth: 1,
    borderColor: colors.goldBright,
    shadowColor: colors.orangeGlow,
    shadowOpacity: 0.95,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  geoFlag: { position: 'absolute', right: 8, top: 6 },
  geoRadarWrap: { position: 'absolute', left: 54, top: 38 },
  geoRadar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(66,165,245,0.85)',
    backgroundColor: 'rgba(30,111,191,0.38)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  geoRadarPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(66,165,245,0.4)',
    backgroundColor: 'rgba(66,165,245,0.1)',
  },
  geoRadarPulseOuter: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(66,165,245,0.18)',
  },
  geoArrow: {
    transform: [{ rotate: '-35deg' }],
  },
  geoInfo: { flex: 1, justifyContent: 'center' },
  verifyBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.32)',
    borderRadius: 10,
    padding: 8,
    backgroundColor: 'rgba(8,6,4,0.72)',
    justifyContent: 'center',
    gap: 10,
  },
  verifyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.success,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  checkCircleIdle: {
    borderColor: colors.goldDim,
    shadowColor: colors.goldDim,
    shadowOpacity: 0.25,
  },
  verifyTitle: {
    color: colors.success,
    fontFamily: 'DMSans_700Bold',
    fontSize: 10.5,
    letterSpacing: 0.5,
  },
  verifySub: { color: colors.text, fontFamily: 'DMSans_400Regular', fontSize: 10.5 },
  geoMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  geoMetaCol: { flex: 1 },
  geoMetaDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(232,176,74,0.2)',
  },
  geoMetaLabel: {
    color: colors.textDim,
    fontFamily: 'DMSans_500Medium',
    fontSize: 7,
    letterSpacing: 0.6,
  },
  geoMetaHint: {
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 7,
    marginTop: 1,
  },
  geoMetaValGreen: {
    color: colors.success,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    marginTop: 2,
  },
  geoMetaVal: {
    color: colors.text,
    fontFamily: 'DMSans_700Bold',
    fontSize: 12,
    marginTop: 2,
  },
  geoFootRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(232,176,74,0.14)',
    paddingTop: 8,
    marginTop: 10,
  },
  geoFoot: {
    flex: 1,
    color: colors.textMuted,
    fontFamily: 'DMSans_400Regular',
    fontSize: 9.5,
    lineHeight: 13,
  },
});
