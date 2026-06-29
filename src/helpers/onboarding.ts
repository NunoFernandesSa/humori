import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_STORAGE_KEY } from "../constants/LocalStorage";

export const getHasCompletedOnboarding = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
    return value === "true";
  } catch (error) {
    console.error("Error reading onboarding state:", error);
    return false;
  }
};

export const setHasCompletedOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
  } catch (error) {
    console.error("Error saving onboarding state:", error);
  }
};
