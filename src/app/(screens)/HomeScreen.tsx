// ----- REACT NATIVE ----------
import React, { JSX, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
// ----- SERVICES -----
import { storageService } from "@/src/services/storageService";
// ----- TYPES -----
import { Mood, MoodEntry } from "@/src/types/moodType";

/**
 * HomeScreen component displays a simple form to record a mood entry.
 * It fetches the today's entry from storage and updates it if the user submits a new mood.
 * The component also handles errors and loading states gracefully.
 * @returns {JSX.Element} The HomeScreen component.
 */
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
        note: moodNote,
        date: new Date().toISOString(),
        timestamp: Date.now(),
      };

      if (todaysEntry) {
        await storageService.updateEntry(newEntry);
        Alert.alert("Succès", "Votre humeur a été mise à jour !");
      } else {
        await storageService.saveEntry(newEntry);
        Alert.alert("Succès", "Votre humeur a été enregistrée !");
      }

      // Reset form if it's a new entry
      if (!todaysEntry) {
        setSelectedMood("");
        setMoodNote("");
      } else {
        loadTodaysEntry(); // Reload to get updated entry
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save your mood. Please try again.");
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <Title
          title="Comment te sens-tu aujourd'hui ?"
          style={{
            color: "#4CAF50",
          }}
        />

        {todaysEntry && (
          <View style={styles.updateMessage}>
            <Text style={styles.updateText}>
              ✏️ Mise à jour de l'entrée du jour
            </Text>
          </View>
        )}

        <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />

        <TextInput
          style={styles.moodNote}
          placeholder="Ajoutez un petit mot sur votre journée... (facultatif)"
          multiline={true}
          numberOfLines={4}
          value={moodNote}
          onChangeText={setMoodNote}
          editable={!isSubmitting}
        />

        <SubmitButton
          text={
            todaysEntry ? "Mise à jour de l'humeur" : "Enregistrer l'humeur"
          }
          handleSubmit={handleSubmit}
          disabled={isSubmitting}
        />
      </Container>
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
    backgroundColor: "#E3F2FD",
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  updateText: {
    color: "#1976D2",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default HomeScreen;
