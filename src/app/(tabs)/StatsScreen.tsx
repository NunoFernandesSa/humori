import Container from "@/src/components/common/Container";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatsScreen() {
  return (
    <SafeAreaView>
      <Container>
        <Text>Stats Screen</Text>
      </Container>
    </SafeAreaView>
  );
}
