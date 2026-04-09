// ----- REACT NATIVE -----
import React, { JSX } from "react";
import { Alert, Image, Text, TouchableOpacity } from "react-native";
// ----- EXPO -----
import { Tabs } from "expo-router";
// ----- ICONS -----
import Ionicons from "@expo/vector-icons/Ionicons";
// ----- HOOKS -----
import { useMoodStore } from "@/src/store/useMoodStore";

import { COLORS_PALETTE } from "@/src/constants/colors";
import { StatusBar } from "expo-status-bar";

/**
 * TabsLayout component defines the bottom-tab navigation structure for the MoodTracker app.
 * It renders two tabs: Home and Stats, each with custom headers, icons, and labels.
 * @param props - No props are used in this component.
 * @returns {JSX.Element} The tab navigator layout for the app.
 */
export default function TabsLayout(): JSX.Element {
  const { deleteAllEntries } = useMoodStore();

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
          tabBarStyle: {
            backgroundColor: COLORS_PALETTE.CARD_BG,
            borderTopColor: COLORS_PALETTE.BORDER_DEFAULT,
            elevation: 0,
            shadowOpacity: 0,
            minHeight: 100,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
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
              <Text
                style={{
                  color: COLORS_PALETTE.TEXT_PRIMARY,
                  fontWeight: "bold",
                }}
              >
                Início
              </Text>
            ),
            headerLeft: () => (
              <Image
                source={require("../../assets/images/icon.png")}
                style={{
                  width: 56,
                  height: 56,
                  marginHorizontal: 16,
                }}
              />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleDeleteAll()}>
                <Ionicons
                  name="trash-outline"
                  size={22}
                  style={{
                    marginHorizontal: 16,
                    color: COLORS_PALETTE.TEXT_SECONDARY,
                    backgroundColor: COLORS_PALETTE.BACKGROUND,
                    borderRadius: 12,
                    padding: 8,
                  }}
                />
              </TouchableOpacity>
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
              <Text
                style={{
                  color: COLORS_PALETTE.TEXT_PRIMARY,
                  fontWeight: "bold",
                }}
              >
                Tendências
              </Text>
            ),
            headerLeft: () => (
              <Image
                source={require("../../assets/images/icon.png")}
                style={{ width: 56, height: 56, marginHorizontal: 16 }}
              />
            ),
            tabBarLabel: ({ color }) => (
              <Text style={{ color }}>Tendências</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
