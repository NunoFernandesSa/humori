import { COLORS_PALETTE } from "@/src/constants/colors";
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
        <Text style={styles.summaryEyebrow}>Registos</Text>
        <Text style={styles.summaryNumber}>{totalEntries}</Text>
        <Text style={styles.summaryLabel}>Registos no período selecionado</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryEyebrow}>Clima geral</Text>
        <Text style={styles.summaryNumber}>{averageMood}</Text>
        <Text style={styles.summaryLabel}>Síntese rápida do teu momento</Text>
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
    backgroundColor: COLORS_PALETTE.CARD_BG,
    borderRadius: 24,
    padding: 18,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS_PALETTE.BORDER_DEFAULT,
  },
  summaryEyebrow: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    marginBottom: 12,
  },
  summaryNumber: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS_PALETTE.TEXT_PRIMARY,
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS_PALETTE.TEXT_SECONDARY,
    lineHeight: 20,
  },
});
