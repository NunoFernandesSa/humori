import { TitleProps } from "@/src/types/title-props-types";
import React, { JSX } from "react";
import { StyleSheet, Text } from "react-native";

/**
 * Title component
 *
 * A reusable component that displays a title with customizable text and styles.
 *
 * @param {string} props.title - The title text to be displayed
 * @param {StyleProp<TextStyle>} [props.style] - Optional additional styles for the title text
 * @returns {JSX.Element} The rendered Title component
 * @example
 * <Title title="Welcome to Mood" style={{ color: "red" }} />
 */
export function Title({ title, style }: TitleProps): JSX.Element {
  return <Text style={[styles.title, style]}>{title}</Text>;
}

// ---------- styles ----------
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
