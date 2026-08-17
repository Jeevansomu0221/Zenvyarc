import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '../screens/HomeScreen';
import { CityScreen } from '../screens/CityScreen';
import { BeaconScreen } from '../screens/BeaconScreen';
import { WritsScreen } from '../screens/WritsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';
import {
  BeaconIcon,
  CastleIcon,
  HelmetIcon,
  HomeIcon,
  SwordsIcon,
} from '../components/icons/ZenvyIcons';

export type MainTabParamList = {
  Home: undefined;
  City: undefined;
  Beacon: undefined;
  Writs: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({
  name,
  focused,
}: {
  name: keyof MainTabParamList;
  focused: boolean;
}) {
  const color = focused ? colors.goldBright : colors.goldDim;
  const size = 18;
  switch (name) {
    case 'Home':
      return <HomeIcon size={size} color={color} />;
    case 'City':
      return <CastleIcon size={size} color={color} />;
    case 'Beacon':
      return <BeaconIcon size={size} color={color} />;
    case 'Writs':
      return <SwordsIcon size={size} color={color} />;
    case 'Profile':
      return <HelmetIcon size={size} color={color} />;
  }
}

function TabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.barWrap, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <LinearGradient
        colors={['rgba(255,200,87,0.5)', 'rgba(255,200,87,0.12)', 'transparent']}
        style={styles.barGlowLine}
      />
      <View style={styles.bar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const focused = state.index === index;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              onPress={() => navigation.navigate(route.name)}
              style={styles.item}
            >
              {focused ? (
                <LinearGradient
                  colors={['rgba(255,200,87,0.18)', 'rgba(255,140,40,0.04)']}
                  style={styles.activeGlow}
                />
              ) : null}
              <View style={focused ? styles.iconGlow : undefined}>
                <TabIcon name={route.name as keyof MainTabParamList} focused={focused} />
              </View>
              <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
              {focused ? <View style={styles.dot} /> : <View style={styles.dotSpacer} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="City" component={CityScreen} />
      <Tab.Screen name="Beacon" component={BeaconScreen} />
      <Tab.Screen name="Writs" component={WritsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(2, 3, 4, 0.98)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,200,87,0.24)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  barGlowLine: { height: 1, width: '100%' },
  bar: {
    flexDirection: 'row',
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#FFC857',
        shadowOpacity: 0.18,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: -4 },
      },
      android: { elevation: 16 },
      default: {},
    }),
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    position: 'relative',
  },
  iconGlow: {
    shadowColor: colors.goldBright,
    shadowOpacity: 0.85,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  label: {
    color: colors.textDim,
    fontFamily: 'DMSans_500Medium',
    fontSize: 9.5,
    letterSpacing: 0.3,
  },
  labelActive: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.orange,
    marginTop: 2,
    shadowColor: colors.orangeGlow,
    shadowOpacity: 0.95,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  activeGlow: {
    position: 'absolute',
    top: -2,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.18)',
  },
  dotSpacer: { width: 5, height: 5, marginTop: 2 },
});
