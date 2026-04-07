import { SummaryCardsProps } from "@/src/types/summary-cards-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SummaryCards({
  totalEntries,
  averageMood,
}: SummaryCardsProps) {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryNumber}>{totalEntries}</Text>
        <Text style={styles.summaryLabel}>Número total de humores</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryNumber}>{averageMood}</Text>
        <Text style={styles.summaryLabel}>Humor médio</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
});
