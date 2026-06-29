// ----- REACT NATIVE -----
import React, { JSX } from "react";
import { Text, TouchableOpacity, View } from "react-native";
// ----- EXPO -----
import { router, Tabs } from "expo-router";
// ----- ICONS -----
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS_PALETTE } from "@/src/constants/colors";
import { getTabBarBottom } from "@/src/constants/layout";
import { FONT_FAMILIES } from "@/src/constants/theme";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * TabsLayout component defines the bottom-tab navigation structure for the MoodTracker app.
 * It renders two tabs: Home and Stats, each with custom headers, icons, and labels.
 * @param props - No props are used in this component.
 * @returns {JSX.Element} The tab navigator layout for the app.
 */
export default function TabsLayout(): JSX.Element {
  const insets = useSafeAreaInsets();
  const tabBarBottom = getTabBarBottom(insets.bottom);

  return (
    <>
      <StatusBar style="dark" />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS_PALETTE.ACCENT_2,
          tabBarInactiveTintColor: COLORS_PALETTE.TEXT_TERTIARY,
          tabBarStyle: {
            backgroundColor: COLORS_PALETTE.CARD_BG,
            borderTopColor: "transparent",
            position: "absolute",
            left: 18,
            right: 18,
            bottom: tabBarBottom,
            borderRadius: 28,
            height: 84,
            paddingTop: 8,
            paddingBottom: 8,
            elevation: 8,
            shadowColor: COLORS_PALETTE.ACCENT_2,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.12,
            shadowRadius: 20,
          },
          tabBarLabelStyle: {
            fontFamily: FONT_FAMILIES.bodySemiBold,
            fontSize: 12,
            marginBottom: 4,
          },
          tabBarItemStyle: {
            borderRadius: 20,
            marginHorizontal: 6,
            marginVertical: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS_PALETTE.BACKGROUND,
            },
            headerTitle: () => (
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILIES.headingExtraBold,
                    color: COLORS_PALETTE.TEXT_SECONDARY,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Humori
                </Text>
                <Text
                  style={{
                    fontFamily: FONT_FAMILIES.headingExtraBold,
                    color: COLORS_PALETTE.TEXT_PRIMARY,
                    fontSize: 20,
                  }}
                >
                  Check-in diário
                </Text>
              </View>
            ),
            headerLeft: () => (
              <View
                style={{
                  width: 44,
                  height: 44,
                  marginHorizontal: 18,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS_PALETTE.CARD_SOFT,
                }}
              >
                <Ionicons
                  name="home"
                  size={20}
                  color={COLORS_PALETTE.ACCENT_2}
                />
              </View>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/settings")}
                style={{
                  marginRight: 18,
                  width: 44,
                  height: 44,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS_PALETTE.CARD_BG,
                  borderWidth: 1,
                  borderColor: COLORS_PALETTE.BORDER_DEFAULT,
                }}
              >
                <Ionicons
                  name="settings-outline"
                  size={20}
                  color={COLORS_PALETTE.TEXT_SECONDARY}
                />
              </TouchableOpacity>
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontFamily: FONT_FAMILIES.bodySemiBold }}>
                Início
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="stats"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS_PALETTE.BACKGROUND,
            },
            headerTitle: () => (
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILIES.headingExtraBold,
                    color: COLORS_PALETTE.TEXT_SECONDARY,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Humori
                </Text>
                <Text
                  style={{
                    fontFamily: FONT_FAMILIES.headingExtraBold,
                    color: COLORS_PALETTE.TEXT_PRIMARY,
                    fontSize: 20,
                  }}
                >
                  Tendências
                </Text>
              </View>
            ),
            headerLeft: () => (
              <View
                style={{
                  width: 44,
                  height: 44,
                  marginHorizontal: 18,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS_PALETTE.CARD_HIGHLIGHT,
                }}
              >
                <Ionicons
                  name="stats-chart"
                  size={20}
                  color={COLORS_PALETTE.ACCENT_2}
                />
              </View>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/settings")}
                style={{
                  marginRight: 18,
                  width: 44,
                  height: 44,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS_PALETTE.CARD_BG,
                  borderWidth: 1,
                  borderColor: COLORS_PALETTE.BORDER_DEFAULT,
                }}
              >
                <Ionicons
                  name="settings-outline"
                  size={20}
                  color={COLORS_PALETTE.TEXT_SECONDARY}
                />
              </TouchableOpacity>
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontFamily: FONT_FAMILIES.bodySemiBold }}>
                Tendências
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="universe"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS_PALETTE.BACKGROUND,
            },
            headerTitle: () => (
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILIES.headingExtraBold,
                    color: COLORS_PALETTE.TEXT_SECONDARY,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Humori
                </Text>
                <Text
                  style={{
                    fontFamily: FONT_FAMILIES.headingExtraBold,
                    color: COLORS_PALETTE.TEXT_PRIMARY,
                    fontSize: 20,
                  }}
                >
                  Meu universo
                </Text>
              </View>
            ),
            headerLeft: () => (
              <View
                style={{
                  width: 44,
                  height: 44,
                  marginHorizontal: 18,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS_PALETTE.CARD_SOFT,
                }}
              >
                <Ionicons
                  name="planet"
                  size={20}
                  color={COLORS_PALETTE.ACCENT_2}
                />
              </View>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/settings")}
                style={{
                  marginRight: 18,
                  width: 44,
                  height: 44,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS_PALETTE.CARD_BG,
                  borderWidth: 1,
                  borderColor: COLORS_PALETTE.BORDER_DEFAULT,
                }}
              >
                <Ionicons
                  name="settings-outline"
                  size={20}
                  color={COLORS_PALETTE.TEXT_SECONDARY}
                />
              </TouchableOpacity>
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color, fontFamily: FONT_FAMILIES.bodySemiBold }}>
                Universo
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="planet" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
