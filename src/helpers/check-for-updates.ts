import * as Updates from "expo-updates";
import { Alert } from "react-native";

/**
 * Check for available OTA updates.
 * If an update is available, fetch it and show an alert to the user.
 * If there is an error, log it in development mode.
 * @param setIsUpdating A callback function to update the state of isUpdating.
 */
export const checkForUpdates = async (
  setIsUpdating: (isUpdating: boolean) => void,
) => {
  try {
    const update = await Updates.checkForUpdateAsync();

    // Check if there is an update available
    if (update.isAvailable) {
      setIsUpdating(true); // If there is an update available, set isUpdating to true

      await Updates.fetchUpdateAsync(); // Fetch the update package from the server

      setIsUpdating(false); // After fetching the update package, set isUpdating to false
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
};
