import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { LoginScreen } from '../screens/LoginScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { WeeklyAscentScreen } from '../screens/WeeklyAscentScreen';
import { MainTabs } from './MainTabs';
import { colors } from '../theme/colors';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined | { screen?: string };
  Rewards: undefined;
  WeeklyAscent: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.bg,
    primary: colors.gold,
    text: colors.text,
    border: colors.border,
  },
};

export function RootNavigator() {
  const { user, loading } = useApp();

  if (loading) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={colors.gold} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Rewards" component={RewardsScreen} />
            <Stack.Screen name="WeeklyAscent" component={WeeklyAscentScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
