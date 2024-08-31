import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CategorySelector, SettingsModal } from "../components";
import { allSets } from "../../data";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedSet, setSelectedSet] = useState("setOne");
  const [gameDuration, setGameDuration] = useState(10);
  const [selectedSkips, setSelectedSkips] = useState(2);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const handleStartGame = (categories) => {
    console.log("Selected Categories:", categories); // Log selected categories
    const selectedCategories = categories.reduce((acc, category) => {
      const data = allSets[selectedSet]?.[category] || []; // Fetch data based on category
      return [...acc, ...data];
    }, []);

    navigation.navigate("Game", {
      selectedCategories,
      gameDuration,
      selectedSkips,
    });
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalVisible(!isSettingsModalVisible);
  };

  const handleSetChange = (set) => {
    setSelectedSet(set);
  };

  return (
    <View style={styles.container}>
      <SettingsModal
        isVisible={isSettingsModalVisible}
        onClose={toggleSettingsModal}
        onDurationChange={(duration) => setGameDuration(duration)}
        onSkipChange={(skip) => setSelectedSkips(skip)}
        onSetChange={handleSetChange}
      />
      <CategorySelector onCategoriesSelected={handleStartGame} />
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={toggleSettingsModal}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
