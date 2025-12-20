import { SubmitButtonProps } from "@/src/types/submit-button-props-types";
import React, { JSX } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

/**
 * SubmitButton component
 *
 * A reusable button component that triggers a submit action when pressed.
 * Accepts customizable text, styles, and an on-press handler.
 *
 * @param {string} props.text - The label text displayed on the button
 * @param {StyleProp<ViewStyle>} [props.style] - Optional additional styles for the button container
 * @param {StyleProp<TextStyle>} [props.textStyle] - Optional additional styles for the button text
 * @param {() => void} props.handleSubmit - Callback function invoked when the button is pressed
 * @returns {JSX.Element} The rendered SubmitButton component
 * @example
 * <SubmitButton
 *   text="Submit"
 *   style={{ width: 200 }}
 *   textStyle={{ fontSize: 18 }}
 *   handleSubmit={() => console.log("Submitting...")}
 * />
 */
export default function SubmitButton({
  text,
  style,
  textStyle,
  handleSubmit,
}: SubmitButtonProps): JSX.Element {
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
