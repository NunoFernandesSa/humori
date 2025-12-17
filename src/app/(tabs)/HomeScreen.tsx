import Container from "@/src/components/common/Container";
import {
  Alert,
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
          <TouchableOpacity style={styles.moodButton}>
            <Text>happy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodButton}>
            <Text>sad</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodButton}>
            <Text>neutral</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.moodButton}>
            <Text>angry</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.moodNote}
          placeholder="Add a note"
          multiline={true}
        ></TextInput>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            Alert.alert("Submit", "Are you sure you want to submit?", [
              { text: "Cancel", style: "cancel" },
              { text: "OK", style: "destructive" },
            ]);
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 60,
  },

  moodButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 20,
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
