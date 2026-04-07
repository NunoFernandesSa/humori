import { Stack } from "expo-router";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * Root layout component that checks for and applies OTA updates on mount.
 * Renders a loading indicator while updating, otherwise the main navigation stack.
 */
export default function RootLayout() {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();

        // Check if there is an update available
        if (update.isAvailable) {
          // If there is an update available, set isUpdating to true
          setIsUpdating(true);
          // Fetch the update package from the server
          await Updates.fetchUpdateAsync();
          // After fetching the update package, set isUpdating to false
          setIsUpdating(false);
          // Show an alert to the user about the available update
          Alert.alert(
            "Nova versão disponível! 🎉",
            "Uma atualização foi descarregada. Queres reiniciar agora para aplicar?",
            [
              {
                text: "Mais tarde",
                style: "cancel",
              },
              {
                text: "Reiniciar agora",
                onPress: () => Updates.reloadAsync(),
              },
            ],
          );
        }
      } catch (error) {
        // If there is an error checking for updates, log it in development mode
        if (__DEV__) {
          console.error("Error checking for updates:", error);
        }
      }
    }

    checkForUpdates();
  }, []);

  // If isUpdating is true, render a loading indicator
  // Otherwise, render the main navigation stack
  if (isUpdating) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
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
    backgroundColor: "#FFF",
  },
});
