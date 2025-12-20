import Container from "@/src/components/common/Container";
import SubmitButton from "@/src/components/common/SubmitButton";
import { Title } from "@/src/components/common/Title";
import { MoodSelector } from "@/src/components/features/mood/MoodSelector";
import { Mood } from "@/src/types/moodType";
import { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [moodNote, setMoodNote] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");

  const title = "How are you feeling today ?";

  // handle submit button press
  const handleSubmt = () => {
    if (!selectedMood) {
      Alert.alert("Please select a mood", "You must select a mood to submit.");
      return;
    }

    // TODO: Send data to AsyncStorage or SQLite. Note is not required.
    console.log("Mood : ", selectedMood);
  };

  return (
    <SafeAreaView>
      <Container>
        <Title title={title} />

        {/* Select a mood */}
        <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />

        {/* Add a note */}
        <TextInput
          style={styles.moodNote}
          placeholder="Add a note ..."
          multiline={true}
          value={moodNote}
          onChangeText={(text) => setMoodNote(text)}
        ></TextInput>

        {/* submit button */}
        <SubmitButton text="Save Mood " handleSubmit={handleSubmt} />
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;

// ---------- styles ----------
const styles = StyleSheet.create({
  moodNote: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
});
