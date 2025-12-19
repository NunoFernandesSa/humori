import Container from "@/src/components/common/Container";
import { moods } from "@/src/constants/moods";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Container>
        <Text style={styles.title}>How are you feeling today ?</Text>

        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.key}
              style={[styles.moodButton, { backgroundColor: mood.color }]}
            >
              <Text style={styles.moodButtonIcon}>{mood.icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.moodNote}
          placeholder="Add a note"
          multiline={true}
        ></TextInput>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            console.log("Save Mood");
          }}
        >
          <Text style={styles.submitButtonText}>Save Mood</Text>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  moodContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 60,
  },

  moodButton: {
    flex: 1,
    height: 60,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  moodButtonIcon: {
    fontSize: 36,
  },

  moodNote: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },

  submitButton: {
    marginTop: 30,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});
