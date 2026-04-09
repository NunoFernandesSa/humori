// ----- REACT NATIVE ----------
import React, { JSX, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import { getCurrentMood, isValidEntry } from "@/src/helpers/helpers";
import Ionicons from "@expo/vector-icons/Ionicons";

/**
 * HomeScreen component for mood tracking.
 * Allows users to select their mood, add a note, and submit/update their daily mood entry.
 * Displays existing mood entry if one exists for today.
 *
 * @returns {JSX.Element} The rendered HomeScreen component
 */
const HomeScreen = (): JSX.Element => {
  // ----- STATES -----
  const [moodNote, setMoodNote] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ----- STORE -----
  const { todaysEntry, isLoading, saveEntry } = useMoodStore();
  // ----- REF'S -----
  const scrollViewRef = useRef<ScrollView>(null);
  const textAreaRef = useRef<TextInput>(null);
  // ----- Helpers -----
  const entryIsValid = isValidEntry(todaysEntry);
  const currentMoodValue = getCurrentMood(todaysEntry);

  // ----- VARIABLES -----
  const homeTitle = "Como te sentes hoje?";
  const date = new Date();
  const formattedDate = date.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Handle text area focus
  const handleFocus = () => {
    // Measure the position of the text area and scroll to it
    if (textAreaRef.current && scrollViewRef.current) {
      textAreaRef.current.measureLayout(
        scrollViewRef.current as any, // Need to cast to any to avoid type issues with measureLayout
        (x: number, y: number) => {
          scrollViewRef.current?.scrollTo({ y: y - 100, animated: true });
        },
        () => {},
      );
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedMood) {
      Alert.alert(
        "Oops! 🎈",
        "Escolhe primeiro o teu humor antes de continuar.",
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

  // ----- USEFFECTS -----
  useEffect(() => {
    if (entryIsValid && todaysEntry) {
      setSelectedMood(todaysEntry.mood);
      setMoodNote(todaysEntry.note || "");
    } else {
      setSelectedMood("");
      setMoodNote("");
    }
  }, [todaysEntry, entryIsValid]);

  // Loading state while fetching data
  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS_PALETTE.ACCENT_2} />
      </SafeAreaView>
    );
  }

  return (
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
          {/* Display the current date in the top of the screen */}
          <Text style={styles.dateContainer}>
            <Ionicons
              name="calendar"
              size={18}
              color={COLORS_PALETTE.ACCENT_2}
            />{" "}
            {formattedDate}
          </Text>

          <Title
            title={homeTitle}
            style={{
              color: COLORS_PALETTE.ACCENT_2,
            }}
          />

          {/* display existing entry if there is one for today */}
          {entryIsValid && currentMoodValue && todaysEntry && (
            <ExistingEntryCard
              currentMood={currentMoodValue}
              todaysEntry={todaysEntry}
            />
          )}

          {/* Mood selector component for mood selection */}
          <MoodSelector
            selectedMood={selectedMood as Mood}
            onSelect={setSelectedMood}
          />

          <TextInput
            ref={textAreaRef}
            style={styles.moodNote}
            placeholder="Queres partilhar mais alguma coisa? (opcional)"
            multiline={true}
            numberOfLines={4}
            value={moodNote}
            onChangeText={setMoodNote}
            onFocus={handleFocus}
            editable={!isSubmitting}
            maxLength={500}
            accessibilityLabel="Nota sobre o teu dia"
            accessibilityHint="Escreve uma breve nota sobre como foi o teu dia"
          />

          {typeof moodNote === "string" && moodNote.length > 0 && (
            <Text style={styles.charCount}>
              {moodNote.length}/500 caracteres
            </Text>
          )}

          <SubmitButton
            text={
              entryIsValid ? "Atualizar o meu humor" : "Registrar o meu humor"
            }
            handleSubmit={handleSubmit}
            disabled={isSubmitting}
          />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_PALETTE.BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 30,
  },
  dateContainer: {
    textAlign: "center",
    color: COLORS_PALETTE.ACCENT_2,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    fontWeight: "bold",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 16,
    alignSelf: "center",
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    borderWidth: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  moodNote: {
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 16,
    marginVertical: 20,
    backgroundColor: COLORS_PALETTE.CARD_BG,
    color: COLORS_PALETTE.TEXT_SECONDARY,
  },
  charCount: {
    fontSize: 12,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    textAlign: "right",
    marginTop: -12,
    marginBottom: 12,
  },
});

export default HomeScreen;
