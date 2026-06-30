import Container from "@/src/components/common/Container";
import { Title } from "@/src/components/common/Title";
import { COLORS_PALETTE } from "@/src/constants/colors";
import { FONT_FAMILIES } from "@/src/constants/theme";
import { useMoodStore } from "@/src/store/useMoodStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { router } from "expo-router";
import React, { JSX } from "react";
import {
  Alert,
  Linking,
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
  const appVersion = Constants.expoConfig?.version ?? "1.0.0";
  const buildVersion = String(
    Constants.expoConfig?.android?.versionCode ?? "-",
  );
  const supportEmail = "humori.app@gmail.com";

  const handleOpenSupport = async () => {
    try {
      await Linking.openURL(
        `mailto:${supportEmail}?subject=Humori%20-%20Suporte`,
      );
    } catch (error) {
      console.error("Erro ao abrir o email de suporte:", error);
      Alert.alert(
        "Erro",
        "Não foi possível abrir o email de suporte neste dispositivo.",
      );
    }
  };

  const handleOpenPrivacySummary = () => {
    Alert.alert(
      "Privacidade",
      "Nesta versão, os teus registos ficam guardados localmente no dispositivo. Podes apagar todos os dados nesta página sempre que quiseres.",
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Apagar todos os dados?",
      "Esta ação remove todos os registos, séries e progressos guardados no dispositivo. Esta ação é irreversível e, depois de apagares os dados, não será possível recuperá-los.",
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
              console.error("Erro ao apagar todos os dados:", error);
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
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              accessibilityHint="Regressa ao ecrã anterior"
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color={COLORS_PALETTE.TEXT_PRIMARY}
              />
            </Pressable>
            <View style={styles.headerCopy}>
              <Text style={styles.eyebrow}>Definições</Text>
              <Title title="Definições da aplicação" />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sobre o Humori</Text>
            <Text style={styles.cardText}>
              O Humori ajuda-te a registar o teu humor, acompanhar tendências e
              criar um ritual diário simples, leve e positivo.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Versão</Text>
            <Text style={styles.cardText}>Versão da app: {appVersion}</Text>
            <Text style={styles.metaText}>
              Version code Android: {buildVersion}
            </Text>
            <Text style={styles.metaText}>
              Registos guardados neste dispositivo: {entries.length}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Suporte</Text>
            <Text style={styles.cardText}>
              Se precisares de ajuda ou quiseres reportar um problema, podes
              usar o contacto de suporte da app.
            </Text>

            <View style={styles.infoRow}>
              <Ionicons
                name="mail-outline"
                size={18}
                color={COLORS_PALETTE.ACCENT_2}
              />
              <Text style={styles.infoText}>{supportEmail}</Text>
            </View>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleOpenSupport}
              accessibilityRole="button"
              accessibilityLabel="Contactar o suporte"
              accessibilityHint="Abre a tua aplicação de email para enviar uma mensagem ao suporte"
            >
              <Ionicons
                name="open-outline"
                size={18}
                color={COLORS_PALETTE.TEXT_PRIMARY}
              />
              <Text style={styles.secondaryButtonText}>
                Contactar o suporte
              </Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Privacidade</Text>
            <Text style={styles.cardText}>
              Nesta versão, os teus dados emocionais são guardados localmente no
              dispositivo. Não precisas de conta para começar.
            </Text>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleOpenPrivacySummary}
              accessibilityRole="button"
              accessibilityLabel="Ver resumo de privacidade"
              accessibilityHint="Mostra um resumo sobre como os teus dados são guardados no dispositivo"
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={COLORS_PALETTE.TEXT_PRIMARY}
              />
              <Text style={styles.secondaryButtonText}>
                Ver resumo de privacidade
              </Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Os teus dados</Text>
            <Text style={styles.cardText}>
              Se quiseres recomeçar do zero, podes apagar aqui os teus registos.
              Vamos pedir uma confirmação antes de continuar.
            </Text>

            <Pressable
              style={styles.dangerButton}
              onPress={handleDeleteAll}
              accessibilityRole="button"
              accessibilityLabel="Apagar os meus dados"
              accessibilityHint="Abre uma confirmação antes de apagar os teus registos"
            >
              <Ionicons
                name="trash-outline"
                size={18}
                color={COLORS_PALETTE.TEXT_LIGHT}
              />
              <Text style={styles.dangerText}>Apagar os meus dados</Text>
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
  metaText: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
  },
  infoText: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  secondaryButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: COLORS_PALETTE.BACKGROUND_ALT,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    fontSize: 14,
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
