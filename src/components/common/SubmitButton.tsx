import { SubmitButtonProps } from "@/src/types/submit-button-props-types";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  handleSubmit,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={handleSubmit}
      disabled={disabled}
    >
      {disabled ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#C8E6C9",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SubmitButton;
