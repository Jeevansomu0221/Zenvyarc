import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { AmbientBackground } from '../components/AmbientBackground';
import { MountainHero } from '../components/home/MountainHero';
import { StepProgressArtifact } from '../components/home/StepProgressArtifact';
import { WeeklyReportCard } from '../components/home/WeeklyReportCard';
import { GeoGuardCard } from '../components/home/GeoGuardCard';
import { WeeklyRivalryCard } from '../components/home/WeeklyRivalryCard';
import { BeaconCard } from '../components/home/BeaconCard';
import { useApp, useTodaySumi } from '../context/AppContext';
import { useStepTracking } from '../hooks/useStepTracking';
import { useWalkTracking } from '../hooks/useWalkTracking';
import { getMountain, WEEKLY } from '../data/mockData';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/RootNavigator';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const stackColumns = width < 340;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, sumi, hubBadge, stepGoal } = useApp();
  const steps = useStepTracking();
  const walk = useWalkTracking({ steps });
  const todaySumi = useTodaySumi(steps);
  const mountain = getMountain(user!.mountainId);

  const goWeekly = () => navigation.navigate('WeeklyAscent');
  const goRewards = () => navigation.navigate('Rewards');
  const goCity = () => navigation.navigate('Main', { screen: 'City' } as never);
  const goBeacon = () => navigation.navigate('Main', { screen: 'Beacon' } as never);
  const goWrits = () => navigation.navigate('Main', { screen: 'Writs' } as never);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AmbientBackground />

      <AppHeader
        sumi={sumi}
        hubBadge={hubBadge}
        onSumi={goRewards}
        onHub={() => Alert.alert('Citizens Hub', '3 unread messages from your mountain.')}
        onBell={() => Alert.alert('Notifications', 'Rivalry update · Beacon ceremony in 2D')}
      />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 118 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <MountainHero
          name={mountain.name}
          tagline={mountain.tagline}
          onViewMountain={goCity}
        />

        <View style={[styles.row, stackColumns && styles.rowStack]}>
          <View style={[styles.col, stackColumns && styles.colStack]}>
            <StepProgressArtifact
              steps={steps}
              stepGoal={stepGoal}
              vsYesterday={WEEKLY.vsYesterday}
              sumiEarned={todaySumi}
              distanceKm={walk.displayKm}
              fromGps={walk.fromGps}
              onSumiPress={goRewards}
            />
          </View>
          <View style={[styles.col, stackColumns && styles.colStack]}>
            <WeeklyReportCard onViewReport={goWeekly} />
          </View>
        </View>

        <GeoGuardCard
          active={walk.active}
          verified={walk.verified}
          title={walk.title}
          message={walk.message}
          accuracyM={walk.accuracyM}
          lastSync={walk.lastSync}
          distanceKm={walk.displayKm}
          fromGps={walk.fromGps}
        />

        <View style={[styles.row, stackColumns && styles.rowStack]}>
          <View style={[styles.col, stackColumns && styles.colStack]}>
            <WeeklyRivalryCard onViewBattle={goWrits} />
          </View>
          <View style={[styles.col, stackColumns && styles.colStack]}>
            <BeaconCard onViewBeacon={goBeacon} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: {
    paddingHorizontal: 8,
    gap: 7,
    ...(Platform.OS === 'web' ? { maxWidth: 430, alignSelf: 'center', width: '100%' } : {}),
  },
  row: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'stretch',
  },
  rowStack: { flexDirection: 'column' },
  col: { flex: 1, minWidth: 0 },
  colStack: { flex: undefined, width: '100%' },
});
