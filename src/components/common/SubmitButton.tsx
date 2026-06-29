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
    backgroundColor: COLORS_PALETTE.BUTTON_PRIMARY,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    marginTop: 20,
    shadowColor: COLORS_PALETTE.ACCENT_2,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: COLORS_PALETTE.TEXT_TERTIARY,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: COLORS_PALETTE.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});

export default SubmitButton;
