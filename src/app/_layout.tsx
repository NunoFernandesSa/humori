import { checkForUpdates } from "@/src/helpers/check-for-updates";
import { Fredoka_700Bold } from "@expo-google-fonts/fredoka";
import {
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS_PALETTE } from "../constants/colors";

void SplashScreen.preventAutoHideAsync();

/**
 * Root layout component that checks for and applies OTA updates on mount.
 * Renders a loading indicator while updating, otherwise the main navigation stack.
 */
export default function RootLayout() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [fontsLoaded] = useFonts({
    Fredoka_700Bold,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (!__DEV__) {
      checkForUpdates(setIsUpdating);
    }
    return;
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If isUpdating is true, render a loading indicator
  // Otherwise, render the main navigation stack
  if (!fontsLoaded || isUpdating) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={COLORS_PALETTE.BUTTON_SECONDARY}
        />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}

// ----- Styles for the loading container -----
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS_PALETTE.BACKGROUND,
  },
});
