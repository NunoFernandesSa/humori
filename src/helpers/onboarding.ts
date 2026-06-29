import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_STORAGE_KEY } from "../constants/LocalStorage";

export const getHasCompletedOnboarding = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
    return value === "true";
  } catch (error) {
    console.error("Erro ao ler o estado do onboarding:", error);
    return false;
  }
};

export const setHasCompletedOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
  } catch (error) {
    console.error("Erro ao guardar o estado do onboarding:", error);
  }
};
