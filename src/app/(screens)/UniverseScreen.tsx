import Container from "@/src/components/common/Container";
import { Title } from "@/src/components/common/Title";
import { COLORS_PALETTE } from "@/src/constants/colors";
import {
  getContentBottomPadding,
  SCREEN_CONTENT_TOP,
} from "@/src/constants/layout";
import {
  FONT_FAMILIES,
  RADII,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from "@/src/constants/theme";
import {
  getCurrentStreak,
  getDominantMood,
  getLongestStreak,
  getWeeklyCompletion,
} from "@/src/helpers/progress";
import { useMoodStore } from "@/src/store/useMoodStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { JSX, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

/**
 * Universe screen.
 * Displays the universe screen with the user's progress and badges.
 */
export default function UniverseScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const { entries } = useMoodStore();
  const currentStreak = getCurrentStreak(entries);
  const longestStreak = getLongestStreak(entries);
  const weeklyCompletion = getWeeklyCompletion(entries);
  const dominantMood = getDominantMood(entries);
  const contentBottomPadding = useMemo(
    () => getContentBottomPadding(insets.bottom),
    [insets.bottom],
  );

  const badges = [
    {
      id: "first-entry",
      icon: "sparkles",
      title: "Primeiro passo",
      description: "Desbloqueado depois do teu primeiro check-in.",
      unlocked: entries.length >= 1,
    },
    {
      id: "three-day-streak",
      icon: "flame",
      title: "Série de 3 dias",
      description: "Voltas para partilhar o teu humor em vários dias seguidos.",
      unlocked: longestStreak >= 3,
    },
    {
      id: "weekly-rhythm",
      icon: "calendar",
      title: "Ritmo semanal",
      description: "Pelo menos 5 dias concluídos numa semana.",
      unlocked: weeklyCompletion >= 70,
    },
    {
      id: "mood-explorer",
      icon: "planet",
      title: "Explorador emocional",
      description: "Já preencheste 14 dias de acompanhamento.",
      unlocked: entries.length >= 14,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: SCREEN_CONTENT_TOP,
            paddingBottom: contentBottomPadding,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>Meu universo</Text>
            <Title title="A tua progressão emocional" />
            <Text style={styles.heroText}>
              Aqui encontras a tua regularidade, os teus badges e a energia
              dominante do teu diário.
            </Text>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{currentStreak}</Text>
              <Text style={styles.metricLabel}>dias seguidos</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{weeklyCompletion}%</Text>
              <Text style={styles.metricLabel}>semana concluída</Text>
            </View>
          </View>

          <View style={styles.storyCard}>
            <View style={styles.storyHeader}>
              <Ionicons
                name="planet"
                size={20}
                color={COLORS_PALETTE.ACCENT_2}
              />
              <Text style={styles.storyTitle}>A tua energia dominante</Text>
            </View>
            <Text style={styles.storyText}>
              {dominantMood
                ? `${dominantMood.emoji} ${dominantMood.label} aparece mais vezes nas tuas entradas. ${dominantMood.description}`
                : "Começa o teu diário para revelar a tua energia dominante."}
            </Text>
            <View style={styles.storyStats}>
              <Text style={styles.storyChip}>
                Total de check-ins: {entries.length}
              </Text>
              <Text style={styles.storyChip}>
                Melhor série: {longestStreak}
              </Text>
            </View>
          </View>

          <Animated.View
            entering={FadeInDown.delay(120).duration(450)}
            style={styles.badgesCard}
          >
            <Text style={styles.sectionTitle}>Badges</Text>
            <Text style={styles.sectionText}>
              Uma progressão suave e positiva, sem julgamento.
            </Text>

            <View style={styles.badgesGrid}>
              {badges.map((badge, index) => (
                <Animated.View
                  key={badge.id}
                  entering={ZoomIn.delay(180 + index * 60).duration(320)}
                  style={[
                    styles.badgeCard,
                    !badge.unlocked && styles.badgeRowLocked,
                  ]}
                >
                  <View
                    style={[
                      styles.badgeMedal,
                      badge.unlocked
                        ? styles.badgeMedalUnlocked
                        : styles.badgeMedalLocked,
                    ]}
                  >
                    <View
                      style={[
                        styles.badgeCore,
                        badge.unlocked
                          ? styles.badgeCoreUnlocked
                          : styles.badgeCoreLocked,
                      ]}
                    >
                      <Ionicons
                        name={badge.icon as keyof typeof Ionicons.glyphMap}
                        size={22}
                        color={
                          badge.unlocked
                            ? COLORS_PALETTE.TEXT_LIGHT
                            : COLORS_PALETTE.TEXT_TERTIARY
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.badgeContent}>
                    <Text style={styles.badgeTitle}>
                      {badge.title}{" "}
                      {badge.unlocked ? "• desbloqueado" : "• por conquistar"}
                    </Text>
                    <Text style={styles.badgeDescription}>
                      {badge.description}
                    </Text>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---- Styles ----
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS_PALETTE.BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS_PALETTE.BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: SPACING.xl,
    marginBottom: 18,
    ...SHADOWS.card,
  },
  eyebrow: {
    ...TYPOGRAPHY.eyebrow,
    color: COLORS_PALETTE.ACCENT_2,
    marginBottom: 8,
  },
  heroText: {
    ...TYPOGRAPHY.body,
    marginTop: 10,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: RADII.lg,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 8,
  },
  metricLabel: {
    ...TYPOGRAPHY.body,
  },
  storyCard: {
    backgroundColor: COLORS_PALETTE.CARD_HIGHLIGHT,
    borderRadius: RADII.xl,
    padding: SPACING.xl,
    marginBottom: 18,
  },
  storyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  storyTitle: {
    ...TYPOGRAPHY.bodyStrong,
  },
  storyText: {
    ...TYPOGRAPHY.body,
  },
  storyStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
  },
  storyChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: RADII.pill,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    fontSize: 12,
    fontWeight: "700",
  },
  badgesCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: RADII.xl,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: SPACING.xl,
    ...SHADOWS.card,
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleMd,
    fontSize: 20,
    marginBottom: 6,
  },
  sectionText: {
    ...TYPOGRAPHY.body,
    marginBottom: 18,
  },
  badgeCard: {
    width: "48.2%",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    backgroundColor: COLORS_PALETTE.BACKGROUND_ALT,
  },
  badgeRowLocked: {
    opacity: 0.72,
  },
  badgeMedal: {
    width: 64,
    height: 64,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  badgeMedalUnlocked: {
    backgroundColor: COLORS_PALETTE.ACCENT_2,
  },
  badgeMedalLocked: {
    backgroundColor: COLORS_PALETTE.BACKGROUND_ALT,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
  },
  badgeCore: {
    width: 44,
    height: 44,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeCoreUnlocked: {
    backgroundColor: COLORS_PALETTE.ACCENT_4,
  },
  badgeCoreLocked: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
  },
  badgeContent: {
    flex: 1,
  },
  badgeTitle: {
    ...TYPOGRAPHY.bodyStrong,
    marginBottom: 4,
    fontFamily: FONT_FAMILIES.bodySemiBold,
  },
  badgeDescription: {
    ...TYPOGRAPHY.body,
    fontSize: 13,
    lineHeight: 18,
  },
});
