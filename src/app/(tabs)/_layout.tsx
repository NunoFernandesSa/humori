import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="HomeScreen"
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
        name="HistoryScreen"
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
        name="StatsScreen"
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
