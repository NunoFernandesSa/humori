import { COLORS_PALETTE } from "@/src/constants/colors";
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
        <ActivityIndicator color={COLORS_PALETTE.ACCENT_2} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS_PALETTE.BUTTON_SECONDARY,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: COLORS_PALETTE.BUTTON_TEXT,
  },
  buttonText: {
    color: COLORS_PALETTE.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SubmitButton;
