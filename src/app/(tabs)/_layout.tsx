// ----- REACT NATIVE -----
import React, { JSX } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
// ----- EXPO -----
import { Tabs } from "expo-router";
// ----- ICONS -----
import Ionicons from "@expo/vector-icons/Ionicons";
// ----- HOOKS -----
import { useMoodStore } from "@/src/store/useMoodStore";

import { COLORS_PALETTE } from "@/src/constants/colors";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * TabsLayout component defines the bottom-tab navigation structure for the MoodTracker app.
 * It renders two tabs: Home and Stats, each with custom headers, icons, and labels.
 * @param props - No props are used in this component.
 * @returns {JSX.Element} The tab navigator layout for the app.
 */
export default function TabsLayout(): JSX.Element {
  const { deleteAllEntries } = useMoodStore();
  const insets = useSafeAreaInsets();
  const tabBarBottom = Math.max(18, insets.bottom + 6);

  // Handle deleting all entries
  const handleDeleteAll = () => {
    Alert.alert(
      "Apagar tudo?",
      "Tem certeza de que deseja excluir todos os dados? Todas as emoções serão suprimidas. Esta ação é irreversível.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAllEntries();
              Alert.alert("Sucesso", "Todos os dados foram apagados.");
            } catch (error) {
              console.error("Error deleting all entries:", error); // TODO: DELETE ON PRODUCTION
              Alert.alert(
                "Erro",
                "Não foi possível eliminar os dados. Por favor, tente mais novamente.",
              );
            }
          },
        },
      ],
    );
  };

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
            fontSize: 12,
            fontWeight: "700",
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
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: COLORS_PALETTE.TEXT_SECONDARY,
                    fontSize: 12,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Humori
                </Text>
                <Text
                  style={{
                    color: COLORS_PALETTE.TEXT_PRIMARY,
                    fontWeight: "800",
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
                <Text style={{ fontSize: 20 }}>H</Text>
              </View>
            ),
            tabBarLabel: ({ color }) => <Text style={{ color }}>Início</Text>,
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
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: COLORS_PALETTE.TEXT_SECONDARY,
                    fontSize: 12,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Humori
                </Text>
                <Text
                  style={{
                    color: COLORS_PALETTE.TEXT_PRIMARY,
                    fontWeight: "800",
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
                onPress={() => handleDeleteAll()}
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
                  name="trash-outline"
                  size={20}
                  color={COLORS_PALETTE.TEXT_SECONDARY}
                />
              </TouchableOpacity>
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color }}>Tendências</Text>
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
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: COLORS_PALETTE.TEXT_SECONDARY,
                    fontSize: 12,
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Humori
                </Text>
                <Text
                  style={{
                    color: COLORS_PALETTE.TEXT_PRIMARY,
                    fontWeight: "800",
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
            tabBarLabel: ({ color }) => <Text style={{ color }}>Univers</Text>,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="planet" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
