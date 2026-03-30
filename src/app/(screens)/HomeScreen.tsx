// ----- REACT NATIVE ----------
import React, { JSX, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { MoodSelector } from "@/src/components/features/mood/MoodSelector";
// ----- CONSTANTS -----
import { MOODS } from "@/src/constants/moods";
// ----- SERVICES -----
import { storageService } from "@/src/services/storageService";
// ----- TYPES -----
import { Mood, MoodEntry } from "@/src/types/moodType";

const HomeScreen = (): JSX.Element => {
  const [moodNote, setMoodNote] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysEntry, setTodaysEntry] = useState<MoodEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodaysEntry();
  }, []);

  const loadTodaysEntry = async (): Promise<void> => {
    try {
      const entry = await storageService.getTodaysEntry();
      if (entry) {
        setTodaysEntry(entry);
        setSelectedMood(entry.mood);
        setMoodNote(entry.note || "");
      } else {
        setTodaysEntry(null);
        setSelectedMood("");
        setMoodNote("");
      }
    } catch (error) {
      console.error("Error loading today's entry:", error);
      Alert.alert(
        "Erreur",
        "Impossible de charger l'humeur du jour. Veuillez réessayer plus tard.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      Alert.alert(
        "Veuillez sélectionner une humeur",
        "Vous devez sélectionner une humeur pour soumettre.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const newEntry: MoodEntry = {
        id: todaysEntry?.id || Date.now().toString(),
        mood: selectedMood as Mood,
        note: moodNote.trim(),
        date: new Date().toISOString(),
        timestamp: Date.now(),
      };

      await storageService.saveEntry(newEntry);

      Alert.alert(
        "Succès",
        todaysEntry
          ? "Votre humeur a été mise à jour !"
          : "Votre humeur a été enregistrée !",
      );

      await loadTodaysEntry();
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible d'enregistrer votre humeur. Veuillez réessayer.",
      );
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get the current mood details for display
  const currentMood = MOODS.find((m) => m.value === todaysEntry?.mood);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Container>
          <Title
            title="Comment te sens-tu aujourd'hui ?"
            style={{
              color: "#4CAF50",
            }}
          />

          {todaysEntry && (
            <View style={styles.updateMessage}>
              <View style={styles.updateHeader}>
                <Text style={styles.updateIcon}>✏️</Text>
                <Text style={styles.updateTitle}>
                  Mise à jour de l'entrée du jour
                </Text>
              </View>
              <View style={styles.updateDetails}>
                <Text style={styles.updateText}>
                  Vous avez déjà enregistré votre humeur aujourd'hui
                </Text>
                <View style={styles.currentMoodContainer}>
                  <Text style={styles.currentMoodLabel}>Humeur actuelle :</Text>
                  <View
                    style={[
                      styles.currentMoodBadge,
                      { backgroundColor: currentMood?.color + "20" },
                    ]}
                  >
                    <Text style={styles.currentMoodEmoji}>
                      {currentMood?.emoji}
                    </Text>
                    <Text
                      style={[
                        styles.currentMoodText,
                        { color: currentMood?.color },
                      ]}
                    >
                      {currentMood?.label}
                    </Text>
                  </View>
                </View>
                {todaysEntry.note && (
                  <View style={styles.currentNoteContainer}>
                    <Text style={styles.currentNoteLabel}>Note actuelle :</Text>
                    <Text style={styles.currentNoteText} numberOfLines={2}>
                      "{todaysEntry.note}"
                    </Text>
                  </View>
                )}
                <Text style={styles.updateHint}>
                  Vous pouvez modifier votre humeur et votre note ci-dessous
                </Text>
              </View>
            </View>
          )}

          <MoodSelector
            selectedMood={selectedMood}
            onSelect={setSelectedMood}
          />

          <TextInput
            style={styles.moodNote}
            placeholder="Ajoutez un petit mot sur votre journée... (facultatif)"
            multiline={true}
            numberOfLines={4}
            value={moodNote}
            onChangeText={setMoodNote}
            editable={!isSubmitting}
            maxLength={500}
          />

          {moodNote.length > 0 && (
            <Text style={styles.charCount}>
              {moodNote.length}/500 caractères
            </Text>
          )}

          <SubmitButton
            text={
              todaysEntry
                ? "Mettre à jour mon humeur"
                : "Enregistrer mon humeur"
            }
            handleSubmit={handleSubmit}
            disabled={isSubmitting}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
  updateMessage: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#FFE082",
    overflow: "hidden",
  },
  updateHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE082",
    padding: 12,
    gap: 8,
  },
  updateIcon: {
    fontSize: 18,
  },
  updateTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F57C00",
  },
  updateDetails: {
    padding: 12,
  },
  updateText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  currentMoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  currentMoodLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  currentMoodBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  currentMoodEmoji: {
    fontSize: 14,
  },
  currentMoodText: {
    fontSize: 13,
    fontWeight: "500",
  },
  currentNoteContainer: {
    marginBottom: 12,
  },
  currentNoteLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
    marginBottom: 4,
  },
  currentNoteText: {
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 8,
  },
  updateHint: {
    fontSize: 12,
    color: "#F57C00",
    marginTop: 8,
    fontStyle: "italic",
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
