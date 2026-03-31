import { storageService } from "@/src/services/storageService";
import { Mood, MoodEntry } from "@/src/types/moodType";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useMoodStats = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "all"
  >("week");

  const loadEntries = useCallback(async () => {
    try {
      const allEntries = await storageService.getEntries();
      setEntries(allEntries.sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      console.error("Error loading entries:", error);
      Alert.alert("Erreur", "Échec du chargement des statistiques");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadEntries();
  }, [loadEntries]);

  const getFilteredEntries = useCallback(() => {
    const now = new Date();
    const filtered = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (selectedPeriod === "week") {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return entryDate >= weekAgo;
      } else if (selectedPeriod === "month") {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return entryDate >= monthAgo;
      }
      return true;
    });
    return filtered.sort((a, b) => a.timestamp - b.timestamp);
  }, [entries, selectedPeriod]);

  const getMoodCounts = useCallback(() => {
    const filtered = getFilteredEntries();
    const counts: Record<Mood, number> = {
      happy: 0,
      neutral: 0,
      sad: 0,
      angry: 0,
    };

    filtered.forEach((entry) => {
      counts[entry.mood]++;
    });

    return counts;
  }, [getFilteredEntries]);

  const getMoodPercentage = useCallback(
    (count: number) => {
      const filtered = getFilteredEntries();
      const total = filtered.length;
      return total > 0 ? (count / total) * 100 : 0;
    },
    [getFilteredEntries],
  );

  const getChartData = useCallback(() => {
    const filtered = getFilteredEntries();
    const moodValues: Record<Mood, number> = {
      happy: 4,
      neutral: 3,
      sad: 2,
      angry: 1,
    };

    return {
      labels: filtered.map((entry) =>
        new Date(entry.date).toLocaleDateString("fr-FR", { weekday: "short" }),
      ),
      datasets: [
        {
          data: filtered.map((entry) => moodValues[entry.mood]),
        },
      ],
    };
  }, [getFilteredEntries]);

  const getPieChartData = useCallback(() => {
    const counts = getMoodCounts();
    const MOODS = [
      { value: "happy", label: "Heureux", emoji: "😊", color: "#4CAF50" },
      { value: "neutral", label: "Neutre", emoji: "😐", color: "#FFC107" },
      { value: "sad", label: "Triste", emoji: "😢", color: "#2196F3" },
      { value: "angry", label: "En colère", emoji: "😠", color: "#F44336" },
    ];

    return MOODS.map((mood) => ({
      name: mood.label,
      count: counts[mood.value as Mood],
      color: mood.color,
      legendFontColor: "#333",
      legendFontSize: 12,
    })).filter((item) => item.count > 0);
  }, [getMoodCounts]);

  const getAverageMood = useCallback(() => {
    const filtered = getFilteredEntries();
    if (filtered.length === 0) return "-";

    const moodValues: Record<Mood, number> = {
      happy: 4,
      neutral: 3,
      sad: 2,
      angry: 1,
    };

    const sum = filtered.reduce(
      (acc, entry) => acc + moodValues[entry.mood],
      0,
    );
    const average = sum / filtered.length;

    if (average >= 3.5) return "Bon 😊";
    if (average >= 2.5) return "Neutre 😐";
    if (average >= 1.5) return "Bas 😢";
    return "Très bas 😠";
  }, [getFilteredEntries]);

  const deleteAllEntries = useCallback(() => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer toutes les données ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await storageService.deleteAllEntries();
              await loadEntries();
              Alert.alert("Succès", "Toutes les données ont été supprimées");
            } catch (error) {
              console.error("Error deleting all entries:", error);
              Alert.alert("Erreur", "Impossible de supprimer les données");
            }
          },
        },
      ],
    );
  }, []);

  return {
    entries,
    isLoading,
    refreshing,
    selectedPeriod,
    setSelectedPeriod,
    loadEntries,
    onRefresh,
    getFilteredEntries,
    getMoodCounts,
    getMoodPercentage,
    getChartData,
    getPieChartData,
    getAverageMood,
    deleteAllEntries,
  };
};
