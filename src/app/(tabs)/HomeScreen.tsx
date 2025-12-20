import Container from "@/src/components/common/Container";
import { moods } from "@/src/constants/moods";
import { Mood } from "@/src/types/moodType";
import { useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScaleAnimations = Record<string, Animated.Value>;

export default function HomeScreen() {
  const [moodNote, setMoodNote] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const title = "How are you feeling today ?";

  // create scale animations for each mood button
  const scaleAnimations = useRef<ScaleAnimations>(
    moods.reduce((acc, mood) => {
      acc[mood.key] = new Animated.Value(1);
      return acc;
    }, {} as ScaleAnimations)
  ).current;

  // handle press on a mood button
  const handleMoodPress = (moodKey: Mood): void => {
    // deselect other moods with animation
    moods.forEach((mood) => {
      if (mood.key !== moodKey) {
        Animated.timing(scaleAnimations[mood.key], {
          toValue: 1,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
    });

    // animate selected mood with animation
    const newValue = selectedMood === moodKey ? 1 : 1.2;
    Animated.timing(scaleAnimations[moodKey], {
      toValue: newValue,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    // update selected mood state
    setSelectedMood(selectedMood === moodKey ? "" : moodKey);
  };

  return (
    <SafeAreaView>
      <Container>
        {/* title */}
        <Text style={styles.title}>{title}</Text>

        {/* Select a mood */}
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <Animated.View
              key={mood.key}
              style={[
                styles.moodButtonWrapper,
                {
                  transform: [{ scale: scaleAnimations[mood.key] }],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.moodButton,
                  {
                    backgroundColor: mood.color,
                    borderWidth: selectedMood === mood.key ? 2 : 0,
                    borderColor: "#eae79cff",
                  },
                ]}
                onPress={() => handleMoodPress(mood.key as Mood)}
                activeOpacity={0.8}
              >
                <Text style={styles.moodButtonIcon}>{mood.icon}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Add a note */}
        <TextInput
          style={styles.moodNote}
          placeholder="Add a note"
          multiline={true}
          value={moodNote}
          onChangeText={(text) => setMoodNote(text)}
        ></TextInput>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            console.log("Mood : ", selectedMood);
            console.log("Note : ", moodNote);
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
    gap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 60,
  },

  moodButtonWrapper: {
    flex: 1,
    height: 60,
    marginHorizontal: 5,
  },

  moodButton: {
    width: "100%",
    height: "100%",
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
