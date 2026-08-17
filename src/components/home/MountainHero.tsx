import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';

type Props = {
  name?: string;
  tagline?: string;
  onViewMountain?: () => void;
};

const BANNER = require('../../../assets/art/crimson-peak-banner.png');
const BANNER_ASPECT = 830 / 235;

export function MountainHero({ onViewMountain }: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const width = Math.min(windowWidth, 430);
  const height = width / BANNER_ASPECT;

  return (
    <View style={[styles.shell, { width: '100%', height }]}>
      <Image source={BANNER} style={styles.banner} resizeMode="cover" />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="View mountain"
        onPress={onViewMountain}
        style={styles.hitArea}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    alignSelf: 'center',
    overflow: 'hidden',
    marginHorizontal: -8,
    marginBottom: 2,
  },
  banner: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  /** Invisible tap target over the VIEW MOUNTAIN pill in the artwork. */
  hitArea: {
    position: 'absolute',
    left: '3.5%',
    bottom: '10%',
    width: '34%',
    height: '22%',
  },
});
