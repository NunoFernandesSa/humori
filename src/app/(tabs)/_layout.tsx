import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

/**
 * TabsLayout component defines the bottom-tab navigation structure for the MoodTracker app.
 * It renders three tabs: Home, Historical, and Stats, each with custom headers, icons, and labels.
 */
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text style={{ color: "gray" }}>Welcome to MoodTracker</Text>
          ),
          headerLeft: () => (
            <Ionicons
              name="grid"
              size={32}
              color="gray"
              style={{ marginHorizontal: 16 }}
            />
          ),
          headerBackground: () => <View style={{ backgroundColor: "white" }} />,
          tabBarLabel: ({ color }) => <Text style={{ color }}>Home</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          headerShown: true,
          headerTitle: () => <Text style={{ color: "gray" }}>Historical</Text>,
          headerLeft: () => (
            <Ionicons
              name="grid"
              size={32}
              color="gray"
              style={{ marginHorizontal: 16 }}
            />
          ),
          headerBackground: () => <View style={{ backgroundColor: "white" }} />,
          tabBarLabel: ({ color }) => <Text style={{ color }}>Historical</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          headerShown: true,
          headerTitle: () => <Text style={{ color: "gray" }}>Stats</Text>,
          headerLeft: () => (
            <Ionicons
              name="grid"
              size={32}
              color="gray"
              style={{ marginHorizontal: 16 }}
            />
          ),
          headerBackground: () => <View style={{ backgroundColor: "white" }} />,
          tabBarLabel: ({ color }) => <Text style={{ color }}>Stats</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
