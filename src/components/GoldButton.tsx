import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

type Props = {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function GoldButton({ label, onPress, style }: Props) {
  return (
    <Pressable style={[styles.btn, style]} onPress={onPress}>
      <LinearGradient
        colors={['rgba(255,200,87,0.16)', 'rgba(255,140,40,0.04)', 'rgba(0,0,0,0.35)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.text}>{label} ›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.48)',
    borderRadius: 999,
    paddingVertical: 9,
    alignItems: 'center',
    backgroundColor: 'rgba(12, 9, 6, 0.82)',
    overflow: 'hidden',
    shadowColor: colors.gold,
    shadowOpacity: 0.28,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  text: {
    color: colors.gold,
    fontFamily: 'DMSans_700Bold',
    fontSize: 9.5,
    letterSpacing: 0.95,
  },
});
