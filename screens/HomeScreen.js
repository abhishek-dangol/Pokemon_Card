import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import CategorySelector from '../components/categorySelector';  // Make sure the path is correct
import SettingsModal from '../components/settingsModal';  // Make sure the path is correct
import foodSetOne from '../data/SetOne/foodSetOne';
import geographySetOne from '../data/SetOne/geographySetOne';
import hollywoodSetOne from '../data/SetOne/hollywoodSetOne';
import bollywoodSetOne from '../data/SetOne/bollywoodSetOne';
import foodSetTwo from '../data/SetTwo/foodSetTwo';
import geographySetTwo from '../data/SetTwo/geographySetTwo';
import hollywoodSetTwo from '../data/SetTwo/hollywoodSetTwo';
import bollywoodSetTwo from '../data/SetTwo/bollywoodSetTwo';

const allSets = {
  setOne: {
    Food: foodSetOne,
    Geography: geographySetOne,
    Hollywood: hollywoodSetOne,
    Bollywood: bollywoodSetOne,
  },
  setTwo: {
    Food: foodSetTwo,
    Geography: geographySetTwo,
    Hollywood: hollywoodSetTwo,
    Bollywood: bollywoodSetTwo,
  },
};

const HomeScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({ selectedSet: 'setOne', selectedDuration: 10, selectedSkips: 2 });
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const handleStartGame = (categories) => {
    const selectedData = categories.reduce((acc, category) => {
      const data = allSets[settings.selectedSet]?.[category] || []; // Use the selected set from settings
      return [...acc, ...data];
    }, []);

    navigation.navigate('Game', {
      settings,
      selectedData,
    });
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setIsSettingsModalVisible(false);
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalVisible(!isSettingsModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CategorySelector onCategoriesSelected={handleStartGame} />
      <TouchableOpacity style={styles.settingsButton} onPress={toggleSettingsModal}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <SettingsModal
        isVisible={isSettingsModalVisible}
        settings={settings}
        onSave={handleSaveSettings}
        onClose={() => setIsSettingsModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
