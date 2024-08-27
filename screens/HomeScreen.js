import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategorySelector from '../components/categorySelector';
import SettingsModal from '../components/settingsModal';
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
      Bollywood: bollywoodSetOne
    },
    setTwo: {
      Food: foodSetTwo,
      Geography: geographySetTwo,
      Hollywood: hollywoodSetTwo,
      Bollywood: bollywoodSetTwo
    }
  };
  

  const HomeScreen = () => {
    const navigation = useNavigation();
    const [selectedSet, setSelectedSet] = useState('setOne');
    const [gameDuration, setGameDuration] = useState(10);
    const [selectedSkips, setSelectedSkips] = useState(2);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  
    const handleStartGame = (categories) => {
        console.log('Selected Categories:', categories); // Log selected categories
        const selectedData = categories.reduce((acc, category) => {
          const data = allSets[selectedSet]?.[category] || []; // Fetch data based on category
          return [...acc, ...data];
        }, []);
      
        console.log('Final Selected Data:', selectedData); // Log final selected data
      
        // Navigate to GameScreen and pass selectedData, gameDuration, and selectedSkips as params
        navigation.navigate('Game', {
          selectedData: selectedData,
          gameDuration: gameDuration,
          selectedSkips: selectedSkips,
        });
      };
      
  
    const toggleSettingsModal = () => {
      setIsSettingsModalVisible(!isSettingsModalVisible);
    };
  
    const handleSetChange = (set) => {
      setSelectedSet(set);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <CategorySelector onCategoriesSelected={handleStartGame} />
        <TouchableOpacity style={styles.settingsButton} onPress={toggleSettingsModal}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <SettingsModal
          isVisible={isSettingsModalVisible}
          onClose={toggleSettingsModal}
          onDurationChange={(duration) => setGameDuration(duration)}
          onSkipChange={(skip) => setSelectedSkips(skip)}
          onSetChange={handleSetChange}
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
