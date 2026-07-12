import React from 'react';
import { Image, useColorScheme, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { Colors } from '@/constants/theme';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.backgroundElement,
          borderTopWidth: 1,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconSource;
          if (route.name === 'Home') {
            iconSource = require('@/assets/images/tabIcons/home.png');
          } else if (route.name === 'Explore') {
            iconSource = require('@/assets/images/tabIcons/explore.png');
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.tabIcon,
                {
                  tintColor: color,
                  width: size,
                  height: size,
                  opacity: focused ? 1 : 0.6,
                },
              ]}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {},
});
