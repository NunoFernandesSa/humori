import { Title } from "@/src/components/common/Title";
import { COLORS_PALETTE } from "@/src/constants/colors";
import { MOODS } from "@/src/constants/moods";
import { FONT_FAMILIES } from "@/src/constants/theme";
import { setHasCompletedOnboarding } from "@/src/helpers/onboarding";
import { router } from "expo-router";
import React, { JSX } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen(): JSX.Element {
  const highlightedMoods = MOODS.slice(0, 4);

  const handleContinue = async () => {
    await setHasCompletedOnboarding();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Bem-vindo ao Humori</Text>
          <Title title="Um diário emocional mais vivo, leve e divertido." />
          <Text style={styles.subtitle}>
            Regista como te sentes, acompanha a tua energia e transforma o
            hábito num pequeno ritual diário.
          </Text>
        </View>

        <View style={styles.stepsCard}>
          <Text style={styles.sectionTitle}>Como funciona</Text>

          <View style={styles.stepRow}>
            <Text style={styles.stepNumber}>1</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Escolhe uma emoção</Text>
              <Text style={styles.stepText}>
                Toca na carta que mais combina contigo neste momento.
              </Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <Text style={styles.stepNumber}>2</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Adiciona contexto</Text>
              <Text style={styles.stepText}>
                Usa uma nota curta, uma sensação ou apenas passa à frente.
              </Text>
            </View>
          </View>

          <View style={styles.stepRow}>
            <Text style={styles.stepNumber}>3</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Constrói a tua progressão</Text>
              <Text style={styles.stepText}>
                Ganha ritmo, badges e uma visão mais clara do teu mês.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.moodPreviewCard}>
          <Text style={styles.sectionTitle}>Exemplo de emoções</Text>
          <View style={styles.moodPreviewGrid}>
            {highlightedMoods.map((mood) => (
              <View
                key={mood.value}
                style={[
                  styles.moodPreviewItem,
                  {
                    backgroundColor: `${mood.color}18`,
                    borderColor: `${mood.color}45`,
                  },
                ]}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.ctaButton} onPress={handleContinue}>
          <Text style={styles.ctaText}>Começar a minha aventura</Text>
        </Pressable>
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
    padding: 20,
    paddingBottom: 40,
    gap: 18,
  },
  heroCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 22,
  },
  eyebrow: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 12,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: COLORS_PALETTE.ACCENT_2,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.body,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    marginTop: 10,
  },
  stepsCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 20,
    gap: 14,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 20,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 14,
    overflow: "hidden",
    textAlign: "center",
    lineHeight: 34,
    backgroundColor: COLORS_PALETTE.CARD_HIGHLIGHT,
    color: COLORS_PALETTE.ACCENT_2,
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 15,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 4,
  },
  stepText: {
    fontFamily: FONT_FAMILIES.body,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  moodPreviewCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 20,
  },
  moodPreviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  moodPreviewItem: {
    width: "48%",
    minHeight: 92,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodLabel: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  ctaButton: {
    backgroundColor: COLORS_PALETTE.BUTTON_PRIMARY,
    borderRadius: 24,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    color: COLORS_PALETTE.TEXT_LIGHT,
    fontSize: 16,
  },
});
