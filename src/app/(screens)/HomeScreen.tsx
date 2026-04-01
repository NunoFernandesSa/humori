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
import { getCurrentMood, isValidEntry } from "@/src/helpers/helpers";

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

  const handleSubmit = async () => {
    if (!selectedMood) {
      Alert.alert(
        "Por favor, selecione um humor.",
        "Você deve selecionar um humor para enviar.",
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
          ? "Seu humor foi atualizado!"
          : "Seu humor foi registrado!",
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível registrar seu humor. Por favor, tente mais novamente.",
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
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Container>
            <Title
              title={homeTitle}
              style={{
                color: "#4CAF50",
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
              selectedMood={selectedMood}
              onSelect={setSelectedMood}
            />

            <TextInput
              ref={textAreaRef}
              style={styles.moodNote}
              placeholder="Adiciona uma breve nota sobre o teu dia..."
              multiline={true}
              numberOfLines={4}
              value={moodNote}
              onChangeText={setMoodNote}
              onFocus={handleFocus}
              editable={!isSubmitting}
              maxLength={500}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  moodNote: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 16,
    marginVertical: 20,
    backgroundColor: "#FFF",
  },
  charCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: -12,
    marginBottom: 12,
  },
});

export default HomeScreen;
