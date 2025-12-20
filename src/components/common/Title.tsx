import { TitleProps } from "@/src/types/title-props-types";
import React from "react";
import { StyleSheet, Text } from "react-native";

export function Title({ title, style }: TitleProps) {
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
