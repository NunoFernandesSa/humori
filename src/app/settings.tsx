import Container from "@/src/components/common/Container";
import { Title } from "@/src/components/common/Title";
import { COLORS_PALETTE } from "@/src/constants/colors";
import { FONT_FAMILIES } from "@/src/constants/theme";
import { useMoodStore } from "@/src/store/useMoodStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { JSX } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * SettingsScreen component for mood tracking.
 * Allows users to delete all mood entries, streaks, and progress.
 */
export default function SettingsScreen(): JSX.Element {
  const { deleteAllEntries, entries } = useMoodStore();

  const handleDeleteAll = () => {
    Alert.alert(
      "Apagar todos os dados?",
      "Esta ação remove todas as entradas, streaks e progressos guardados no dispositivo.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar tudo",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAllEntries();
              Alert.alert("Tudo limpo", "Todos os dados foram apagados.");
              router.back();
            } catch (error) {
              console.error("Error deleting all data:", error);
              Alert.alert(
                "Erro",
                "Não foi possível apagar os dados. Tenta novamente.",
              );
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Container>
          <View style={styles.headerRow}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={20}
                color={COLORS_PALETTE.TEXT_PRIMARY}
              />
            </Pressable>
            <View style={styles.headerCopy}>
              <Text style={styles.eyebrow}>Definições</Text>
              <Title title="Gestão dos dados" />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dados guardados</Text>
            <Text style={styles.cardText}>
              Tens atualmente {entries.length} registos emocionais guardados
              neste dispositivo.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Zona segura</Text>
            <Text style={styles.cardText}>
              A ação de apagar tudo fica aqui para evitar toques acidentais e
              manter as tendências focadas na leitura do teu histórico.
            </Text>

            <Pressable style={styles.dangerButton} onPress={handleDeleteAll}>
              <Ionicons
                name="trash-outline"
                size={18}
                color={COLORS_PALETTE.TEXT_LIGHT}
              />
              <Text style={styles.dangerText}>Apagar todos os dados</Text>
            </Pressable>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_PALETTE.BACKGROUND,
  },
  content: {
    paddingTop: 18,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
    marginBottom: 18,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    color: COLORS_PALETTE.ACCENT_2,
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 18,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 8,
  },
  cardText: {
    fontFamily: FONT_FAMILIES.body,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  dangerButton: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: COLORS_PALETTE.ANGRY,
    borderRadius: 22,
    paddingVertical: 16,
  },
  dangerText: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    color: COLORS_PALETTE.TEXT_LIGHT,
    fontSize: 15,
  },
});
