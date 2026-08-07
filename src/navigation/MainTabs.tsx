import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '../screens/HomeScreen';
import { CityScreen } from '../screens/CityScreen';
import { BeaconScreen } from '../screens/BeaconScreen';
import { WritsScreen } from '../screens/WritsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

export type MainTabParamList = {
  Home: undefined;
  City: undefined;
  Beacon: undefined;
  Writs: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, string> = {
  Home: '⌂',
  City: '🏯',
  Beacon: '🗼',
  Writs: '⚔',
  Profile: '⛑',
};

function TabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const focused = state.index === index;
        const icon = ICONS[route.name as keyof MainTabParamList];

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={styles.item}
          >
            <Text style={[styles.icon, focused && styles.iconActive]}>{icon}</Text>
            <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
            {focused ? <View style={styles.dot} /> : <View style={styles.dotSpacer} />}
          </Pressable>
        );
      })}
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
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 8, 6, 0.96)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 12,
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
  },
  icon: {
    fontSize: 18,
    color: colors.textDim,
    opacity: 0.7,
  },
  iconActive: {
    color: colors.goldBright,
    opacity: 1,
  },
  label: {
    color: colors.textDim,
    fontFamily: 'DMSans_500Medium',
    fontSize: 10,
  },
  labelActive: {
    color: colors.goldBright,
    fontFamily: 'DMSans_700Bold',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.orange,
    marginTop: 2,
  },
  dotSpacer: {
    width: 4,
    height: 4,
    marginTop: 2,
  },
});
