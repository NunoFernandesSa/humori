// ----- REACT NATIVE ----------
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { MOODS } from "@/src/constants/moods";
import { getCurrentMood, isValidEntry } from "@/src/helpers/helpers";
import { storageService } from "@/src/services/storageService";
import Ionicons from "@expo/vector-icons/Ionicons";

/**
 * HomeScreen component for mood tracking.
 * Allows users to select their mood, add a note, and submit/update their daily mood entry.
 * Displays existing mood entry if one exists for today.
 *
 * @returns {JSX.Element} The rendered HomeScreen component
 */
const HomeScreen = (): JSX.Element => {
  const [moodNote, setMoodNote] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { todaysEntry, isLoading, saveEntry } = useMoodStore();
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
        "Oops! 🎈",
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
        "🎉 Sucesso!",
        entryIsValid
          ? "O teu humor foi atualizado!"
          : "O teu humor foi registrado!",
      );
    } catch (error) {
      Alert.alert(
        "Ops! 😕",
        "Não foi possível registrar teu humor. Tenta novamente!",
      );
      console.error("Submit error:", error);
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={styles.container}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Container>
            <View style={styles.heroCard}>
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
                Faz o teu check-in em menos de um minuto. Escolhe a emoção, adiciona
                um contexto se quiseres e guarda o momento.
              </Text>

              <View style={styles.heroHighlights}>
                <View style={styles.highlightChip}>
                  <Ionicons
                    name="flash-outline"
                    size={16}
                    color={COLORS_PALETTE.ACCENT_2}
                  />
                  <Text style={styles.highlightChipText}>Rápido</Text>
                </View>
                <View style={styles.highlightChip}>
                  <Ionicons
                    name="hand-left-outline"
                    size={16}
                    color={COLORS_PALETTE.ACCENT_3}
                  />
                  <Text style={styles.highlightChipText}>Táctil</Text>
                </View>
                <View style={styles.highlightChip}>
                  <Ionicons
                    name="happy-outline"
                    size={16}
                    color={COLORS_PALETTE.ACCENT_4}
                  />
                  <Text style={styles.highlightChipText}>Expressivo</Text>
                </View>
              </View>
            </View>

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

            <View style={styles.noteCard}>
              <Text style={styles.sectionEyebrow}>Etapa 2</Text>
              <Text style={styles.sectionTitle}>Queres acrescentar um contexto?</Text>
              <Text style={styles.sectionSubtitle}>
                A nota é opcional, mas ajuda a perceber melhor o teu dia.
              </Text>

              <View style={styles.quickNotesRow}>
                {quickNotes.map((note) => (
                  <Pressable
                    key={note}
                    style={styles.quickNoteChip}
                    onPress={() => handleQuickNote(note)}
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
            </View>

            <View style={styles.ctaCard}>
              <View style={styles.ctaTextBlock}>
                <Text style={styles.ctaTitle}>Pronto para guardar este momento?</Text>
                <Text style={styles.ctaSubtitle}>
                  Vais poder rever tendências e voltar a editar a entrada de hoje.
                </Text>
              </View>

              <SubmitButton
                text={
                  entryIsValid
                    ? "Atualizar o meu check-in"
                    : "Guardar o meu check-in"
                }
                handleSubmit={handleSubmit}
                disabled={isSubmitting}
              />
            </View>
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
    paddingVertical: 18,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    gap: 12,
  },
  datePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS_PALETTE.CARD_HIGHLIGHT,
  },
  dateText: {
    color: COLORS_PALETTE.TEXT_PRIMARY,
    fontSize: 13,
    fontWeight: "700",
  },
  oneEntryPill: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: COLORS_PALETTE.CARD_SOFT,
  },
  oneEntryText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  heroSubtitle: {
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
    fontSize: 13,
    fontWeight: "700",
    color: COLORS_PALETTE.TEXT_PRIMARY,
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
    fontSize: 12,
    fontWeight: "800",
    color: COLORS_PALETTE.ACCENT_2,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  sectionSubtitle: {
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
    fontSize: 13,
    fontWeight: "700",
    color: COLORS_PALETTE.TEXT_PRIMARY,
  },
  moodNote: {
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
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    fontWeight: "600",
  },
  charCount: {
    fontSize: 12,
    color: COLORS_PALETTE.TEXT_TERTIARY,
    fontWeight: "700",
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
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 6,
  },
  ctaSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
});

export default HomeScreen;
