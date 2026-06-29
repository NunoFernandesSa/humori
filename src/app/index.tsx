import { getHasCompletedOnboarding } from "@/src/helpers/onboarding";
import { Redirect } from "expo-router";
import React, { JSX, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { COLORS_PALETTE } from "../constants/colors";

export default function Index(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const loadOnboardingState = async () => {
      const isCompleted = await getHasCompletedOnboarding();
      setOnboardingCompleted(isCompleted);
      setIsLoading(false);
    };

    loadOnboardingState();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS_PALETTE.BACKGROUND,
        }}
      >
        <ActivityIndicator size="large" color={COLORS_PALETTE.BUTTON_PRIMARY} />
      </View>
    );
  }

  return <Redirect href={hasCompletedOnboarding ? "/(tabs)" : "/onboarding"} />;
}
