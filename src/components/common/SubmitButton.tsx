import { SubmitButtonProps } from "@/src/types/submit-button-props-types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SubmitButton({
  text,
  style,
  textStyle,
  handleSubmit,
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.submitButton, style]}
      onPress={() => {
        handleSubmit();
      }}
    >
      <Text style={[styles.submitButtonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

// ---------- SubmitButton styles ----------
const styles = StyleSheet.create({
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
