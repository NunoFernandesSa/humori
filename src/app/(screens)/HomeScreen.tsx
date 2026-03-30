import Container from "@/src/components/common/Container";
import SubmitButton from "@/src/components/common/SubmitButton";
import { Title } from "@/src/components/common/Title";
import { MoodSelector } from "@/src/components/features/mood/MoodSelector";
import { storageService } from "@/src/services/storageService";
import { Mood, MoodEntry } from "@/src/types/moodType";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [moodNote, setMoodNote] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysEntry, setTodaysEntry] = useState<MoodEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodaysEntry();
  }, []);

  const loadTodaysEntry = async () => {
    try {
      const entry = await storageService.getTodaysEntry();
      if (entry) {
        setTodaysEntry(entry);
        setSelectedMood(entry.mood);
        setMoodNote(entry.note || "");
      }
    } catch (error) {
      console.error("Error loading today's entry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      Alert.alert("Please select a mood", "You must select a mood to submit.");
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
        Alert.alert("Success", "Your mood has been updated!");
      } else {
        await storageService.saveEntry(newEntry);
        Alert.alert("Success", "Your mood has been saved!");
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
        <Title title="How are you feeling today?" />

        {todaysEntry && (
          <View style={styles.updateMessage}>
            <Text style={styles.updateText}>✏️ Updating today's entry</Text>
          </View>
        )}

        <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />

        <TextInput
          style={styles.moodNote}
          placeholder="Add a note about your day... (optional)"
          multiline={true}
          numberOfLines={4}
          value={moodNote}
          onChangeText={setMoodNote}
          editable={!isSubmitting}
        />

        <SubmitButton
          text={todaysEntry ? "Update Mood" : "Save Mood"}
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
