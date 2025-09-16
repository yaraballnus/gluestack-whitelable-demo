import { Tabs } from 'expo-router';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:  '#07aea4',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="demo"
        options={{
          title: 'Demo',
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "options" : "options-outline"} size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
