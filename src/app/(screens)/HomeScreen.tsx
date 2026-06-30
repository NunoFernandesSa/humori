// ----- REACT NATIVE ----------
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
// ----- COMPONENTS -----
import Container from "@/src/components/common/Container";
import SubmitButton from "@/src/components/common/SubmitButton";
import { Title } from "@/src/components/common/Title";
import ExistingEntryCard from "@/src/components/features/mood/ExistingEntryCard";
import { MoodSelector } from "@/src/components/features/mood/MoodSelector";
// ----- STORE -----
import { useMoodStore } from "@/src/store/useMoodStore";
// ----- TYPES -----
import { Mood, MoodEntry } from "@/src/types/moodType";
// ----- HELPERS -----
import { COLORS_PALETTE } from "@/src/constants/colors";
import {
  getContentBottomPadding,
  SCREEN_CONTENT_TOP,
} from "@/src/constants/layout";
import { MOODS } from "@/src/constants/moods";
import { FONT_FAMILIES } from "@/src/constants/theme";
import { getCurrentMood, isValidEntry } from "@/src/helpers/helpers";
import {
  getCurrentStreak,
  getLongestStreak,
  getWeeklyCompletion,
} from "@/src/helpers/progress";
import { storageService } from "@/src/services/storageService";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

/**
 * HomeScreen component for mood tracking.
 * Allows users to select their mood, add a note, and submit/update their daily mood entry.
 * Displays existing mood entry if one exists for today.
 *
 * @returns {JSX.Element} The rendered HomeScreen component
 */
const HomeScreen = (): JSX.Element => {
  const insets = useSafeAreaInsets();
  const [moodNote, setMoodNote] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { todaysEntry, entries, isLoading, saveEntry } = useMoodStore();
  const scrollViewRef = useRef<ScrollView>(null);
  const textAreaRef = useRef<TextInput>(null);
  const entryIsValid = isValidEntry(todaysEntry);
  const currentMoodValue = getCurrentMood(todaysEntry);
  const date = new Date();
  const formattedDate = date.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const selectedMoodData = useMemo(
    () => MOODS.find((mood) => mood.value === selectedMood),
    [selectedMood],
  );
  const quickNotes = [
    "Hoje foi divertido",
    "Preciso de descanso",
    "Aconteceu algo inesperado",
    "Quero falar sobre isto depois",
  ];
  const currentStreak = useMemo(() => getCurrentStreak(entries), [entries]);
  const longestStreak = useMemo(() => getLongestStreak(entries), [entries]);
  const weeklyCompletion = useMemo(
    () => getWeeklyCompletion(entries),
    [entries],
  );
  const pulseScale = useSharedValue(1);

  const handleFocus = () => {
    if (textAreaRef.current && scrollViewRef.current) {
      textAreaRef.current.measureLayout(
        scrollViewRef.current as any,
        (x: number, y: number) => {
          scrollViewRef.current?.scrollTo({ y: y - 100, animated: true });
        },
        () => {},
      );
    }
  };

  const handleQuickNote = (note: string) => {
    setMoodNote((previousNote) => {
      if (!previousNote.trim()) {
        return note;
      }

      if (previousNote.includes(note)) {
        return previousNote;
      }

      return `${previousNote.trim()}. ${note}`;
    });
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      Alert.alert(
        "Ups! 🎈",
        "Escolhe primeiro o teu humor antes de continuar.",
      );
      return;
    }

    const alreadyExists = await storageService.hasTodayEntry();

    if (alreadyExists && !entryIsValid) {
      Alert.alert(
        "Atenção! ⚠️",
        "Já registaste o teu humor hoje. Só podes ter uma entrada por dia!",
        [{ text: "OK" }],
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const newEntry: MoodEntry = {
        id: todaysEntry?.id || Date.now().toString(),
        mood: selectedMood as Mood,
        note: moodNote?.trim() || undefined,
        date: new Date().toISOString(),
        timestamp: Date.now(),
      };

      await saveEntry(newEntry);

      Alert.alert(
        "Sucesso",
        entryIsValid
          ? "O teu humor foi atualizado!"
          : "O teu humor foi registado!",
      );
    } catch (error) {
      Alert.alert(
        "Ups! 😕",
        "Não foi possível registar o teu humor. Tenta novamente!",
      );
      console.error("Erro ao submeter o registo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (entryIsValid && todaysEntry) {
      setSelectedMood(todaysEntry.mood);
      setMoodNote(todaysEntry.note || "");
    } else {
      setSelectedMood("");
      setMoodNote("");
    }
  }, [todaysEntry, entryIsValid]);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 900 }),
        withTiming(1, { duration: 900 }),
      ),
      -1,
      false,
    );
  }, [pulseScale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));
  const contentBottomPadding = useMemo(
    () => getContentBottomPadding(insets.bottom),
    [insets.bottom],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS_PALETTE.BUTTON_PRIMARY} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS_PALETTE.BACKGROUND,
      }}
    >
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={20}
        style={styles.container}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: SCREEN_CONTENT_TOP,
              paddingBottom: contentBottomPadding,
            },
          ]}
        >
          <Container>
            <Animated.View
              entering={FadeInDown.duration(420)}
              style={styles.heroCard}
            >
              <View style={styles.heroTopRow}>
                <View style={styles.datePill}>
                  <Ionicons
                    name="sparkles"
                    size={16}
                    color={COLORS_PALETTE.ACCENT_2}
                  />
                  <Text style={styles.dateText}>{formattedDate}</Text>
                </View>
                <View style={styles.oneEntryPill}>
                  <Text style={styles.oneEntryText}>1 registo por dia</Text>
                </View>
              </View>

              <Title title="Como te sentes hoje?" />
              <Text style={styles.heroSubtitle}>
                Faz o teu registo em menos de um minuto. Escolhe a emoção,
                adiciona um contexto se quiseres e guarda o momento.
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(70).duration(420)}
              style={styles.progressCard}
            >
              <View style={styles.progressHeader}>
                <View style={styles.progressHeaderLeft}>
                  <Text style={styles.progressEyebrow}>Progressão</Text>
                  <Text style={styles.progressTitle}>
                    O teu ritmo emocional
                  </Text>
                </View>
                <Animated.View style={[styles.progressBadge, pulseStyle]}>
                  <Ionicons
                    name="flame"
                    size={16}
                    color={COLORS_PALETTE.ACCENT_1}
                  />
                  <Text
                    style={styles.progressBadgeText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {currentStreak} dias seguidos
                  </Text>
                </Animated.View>
              </View>

              <View style={styles.progressStatsRow}>
                <View style={styles.progressStat}>
                  <Text style={styles.progressStatValue}>
                    {weeklyCompletion}%
                  </Text>
                  <Text style={styles.progressStatLabel}>semana concluída</Text>
                </View>
                <View style={styles.progressStat}>
                  <Text style={styles.progressStatValue}>{longestStreak}</Text>
                  <Text style={styles.progressStatLabel}>melhor série</Text>
                </View>
                <View style={styles.progressStat}>
                  <Text style={styles.progressStatValue}>{entries.length}</Text>
                  <Text style={styles.progressStatLabel}>registos</Text>
                </View>
              </View>
            </Animated.View>

            {entryIsValid && currentMoodValue && todaysEntry && (
              <ExistingEntryCard
                currentMood={currentMoodValue}
                todaysEntry={todaysEntry}
              />
            )}

            <MoodSelector
              selectedMood={selectedMood as Mood}
              onSelect={setSelectedMood}
            />

            <Animated.View
              entering={FadeInDown.delay(140).duration(420)}
              style={styles.noteCard}
            >
              <Text style={styles.sectionEyebrow}>Etapa 2</Text>
              <Text style={styles.sectionTitle}>
                Queres acrescentar um contexto?
              </Text>
              <Text style={styles.sectionSubtitle}>
                A nota é opcional, mas ajuda a perceber melhor o teu dia.
              </Text>

              <View style={styles.quickNotesRow}>
                {quickNotes.map((note) => (
                  <Pressable
                    key={note}
                    style={styles.quickNoteChip}
                    onPress={() => handleQuickNote(note)}
                    accessibilityRole="button"
                    accessibilityLabel={`Adicionar nota rápida: ${note}`}
                    accessibilityHint="Adiciona este texto a nota opcional do teu registo"
                  >
                    <Text style={styles.quickNoteText}>{note}</Text>
                  </Pressable>
                ))}
              </View>

              <TextInput
                ref={textAreaRef}
                style={styles.moodNote}
                placeholder="Queres partilhar mais alguma coisa? (opcional)"
                placeholderTextColor={COLORS_PALETTE.TEXT_TERTIARY}
                multiline={true}
                numberOfLines={5}
                value={moodNote}
                onChangeText={setMoodNote}
                onFocus={handleFocus}
                editable={!isSubmitting}
                maxLength={500}
                accessibilityLabel="Nota sobre o teu dia"
                accessibilityHint="Escreve uma breve nota sobre como foi o teu dia"
              />

              <View style={styles.noteFooter}>
                <Text style={styles.noteHint}>
                  {selectedMoodData
                    ? `Selecionaste: ${selectedMoodData.emoji} ${selectedMoodData.label}`
                    : "Seleciona uma emoção para continuar"}
                </Text>
                <Text style={styles.charCount}>{moodNote.length}/500</Text>
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(210).duration(420)}
              style={styles.ctaCard}
            >
              <View style={styles.ctaTextBlock}>
                <Text style={styles.ctaTitle}>
                  Pronto para guardar este momento?
                </Text>
                <Text style={styles.ctaSubtitle}>
                  Vais poder rever tendências e voltar a editar a entrada de
                  hoje.
                </Text>
              </View>

              <SubmitButton
                text={
                  entryIsValid
                    ? "Atualizar o meu registo"
                    : "Guardar o meu registo"
                }
                handleSubmit={handleSubmit}
                disabled={isSubmitting}
              />
            </Animated.View>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_PALETTE.BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 22,
    marginBottom: 18,
    shadowColor: COLORS_PALETTE.ACCENT_2,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 18,
    gap: 12,
  },
  datePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
    maxWidth: "100%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS_PALETTE.CARD_HIGHLIGHT,
  },
  dateText: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    fontSize: 13,
  },
  oneEntryPill: {
    flexShrink: 1,
    maxWidth: "100%",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: COLORS_PALETTE.CARD_SOFT,
    alignSelf: "flex-start",
  },
  oneEntryText: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 12,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    flexShrink: 1,
  },
  heroSubtitle: {
    fontFamily: FONT_FAMILIES.body,
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  heroHighlights: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },
  highlightChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: COLORS_PALETTE.BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
  },
  highlightChipText: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 13,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  progressCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 20,
    marginBottom: 18,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  progressHeaderLeft: {
    flex: 1,
    minWidth: 0,
  },
  progressEyebrow: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 12,
    color: COLORS_PALETTE.ACCENT_2,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  progressTitle: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 20,
    lineHeight: 26,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  progressBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS_PALETTE.WARNING_BG,
    maxWidth: "55%",
    flexShrink: 1,
    alignSelf: "flex-start",
  },
  progressBadgeText: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 12,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    flexShrink: 1,
  },
  progressStatsRow: {
    flexDirection: "row",
    gap: 10,
  },
  progressStat: {
    flex: 1,
    backgroundColor: COLORS_PALETTE.BACKGROUND_ALT,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  progressStatValue: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 24,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 6,
  },
  progressStatLabel: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  noteCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 20,
    marginBottom: 18,
  },
  sectionEyebrow: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 12,
    color: COLORS_PALETTE.ACCENT_2,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 22,
    lineHeight: 28,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  sectionSubtitle: {
    fontFamily: FONT_FAMILIES.body,
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  quickNotesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
    marginBottom: 14,
  },
  quickNoteChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS_PALETTE.BACKGROUND_ALT,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
  },
  quickNoteText: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 13,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  moodNote: {
    fontFamily: FONT_FAMILIES.body,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    borderRadius: 22,
    padding: 16,
    minHeight: 130,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
    backgroundColor: COLORS_PALETTE.BACKGROUND_ALT,
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  noteFooter: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  noteHint: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  charCount: {
    fontFamily: FONT_FAMILIES.bodySemiBold,
    fontSize: 12,
    color: COLORS_PALETTE.TEXT_TERTIARY,
  },
  ctaCard: {
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    padding: 20,
  },
  ctaTextBlock: {
    marginBottom: 4,
  },
  ctaTitle: {
    fontFamily: FONT_FAMILIES.headingExtraBold,
    fontSize: 20,
    lineHeight: 26,
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 6,
  },
  ctaSubtitle: {
    fontFamily: FONT_FAMILIES.body,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
});

export default HomeScreen;
