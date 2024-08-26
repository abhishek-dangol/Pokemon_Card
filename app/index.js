import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Vibration, Modal, Button } from 'react-native';
import TabooCard from '../components/tabooCard';
import foodSetOne from '../data/SetOne/foodSetOne';
import geographySetOne from '../data/SetOne/geographySetOne';
import hollywoodSetOne from '../data/SetOne/hollywoodSetOne';
import bollywoodSetOne from '../data/SetOne/bollywoodSetOne';
import CategorySelector from '../components/categorySelector';
import SettingsModal from '../components/settingsModal';
import { getActionFromState } from '@react-navigation/native';

const getRandomIndex = (length) => {
    return Math.floor(Math.random() * length);
};

const allCategories = {
  Food: foodSetOne,
  Geography: geographySetOne,
  Hollywood: hollywoodSetOne,
  Bollywood: bollywoodSetOne
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skipCount, setSkipCount] = useState(2);
  const [correctCount, setCorrectCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [gameDuration, setGameDuration] = useState(60);
  const [timer, setTimer] = useState(0);
  const [selectedSkips, setSelectedSkips] = useState(2);


  useEffect(() => {
    let interval;
    
    if (isGameStarted) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsButtonDisabled(true);
            Vibration.vibrate(100);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGameStarted, timer]);

  const handlePressCorrect = () => {
    if (isButtonDisabled) return;
    Vibration.vibrate(100);
    const nextIndex = getRandomIndex(selectedData.length);
    setCurrentIndex(nextIndex);
    setCorrectCount(correctCount + 1);
  };

  const handlePressSkip = () => {
    if (isButtonDisabled || skipCount <= 0) return;
    setSkipCount(skipCount - 1);
    if (skipCount > 0) {
      const nextIndex = getRandomIndex(selectedData.length);
      setCurrentIndex(nextIndex);
      Vibration.vibrate(100);
    }
  };

  const handleReset = () => {
    setCorrectCount(0);
    setSkipCount(selectedSkips);
    setTimer(gameDuration);
    setIsButtonDisabled(false);
    setIsGameStarted(true);
    const randomIndex = Math.floor(Math.random() * selectedData.length);
    setCurrentIndex(randomIndex);
    
  };

  const handleStartGame = (categories) => {
    const selected = categories.reduce((acc, category) => {
      return [...acc, ...allCategories[category]];
    }, []);
    setSelectedData(selected);
    setTimer(gameDuration);
    setSkipCount(selectedSkips);
    setIsGameStarted(true);
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalVisible(!isSettingsModalVisible);
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isGameStarted ? (
        <>
          <CategorySelector onCategoriesSelected={handleStartGame} />
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={toggleSettingsModal}
          >
            < Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <SettingsModal
            isVisible={isSettingsModalVisible}
            onClose={toggleSettingsModal}
            onDurationChange={(duration) => setGameDuration(duration)}
            onSkipChange={(skip) => setSelectedSkips(skip)}
          />
        </>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.timerText}>{`Time Elapsed: ${timer}`}</Text>
          </View>
          <View>
            {selectedData.length > 0 && (
              <TabooCard {...selectedData[currentIndex]} index={currentIndex + 1} />
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, isButtonDisabled ? styles.disabledButton : styles.greenButton]} 
                onPress={handlePressCorrect}
                disabled={isButtonDisabled}
              >
                <Text style={[styles.buttonText, isButtonDisabled && styles.disabledButtonText]}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, skipCount <= 0 || isButtonDisabled ? styles.disabledButton : styles.orangeButton]} 
                onPress={handlePressSkip}
                disabled={skipCount <= 0 || isButtonDisabled}
              >
                <Text style={[styles.buttonText, (skipCount <= 0 || isButtonDisabled) && styles.disabledButtonText]}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  timer > 0 ? styles.disabledButton : (styles.greenButton, { backgroundColor: "red" })
                ]}
                onPress={handleReset}
                disabled={timer > 0}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>Skips remaining: {skipCount > 0 ? skipCount : 0}</Text>
              <Text style={styles.statusText}>Score: {correctCount}</Text>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 50
  },
  timerText: {
    fontSize: 32,
    fontWeightBold: 'bold',
    color: 'red',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 5,
  },
  greenButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#2E7D32',
  },
  orangeButton: {
    backgroundColor: '#FFA500',
    borderColor: '#FF8C00',
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
    borderColor: "#A9A9A9",
  },
  disabledButtonText: {
    color: "#A9A9A9",
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
  },
  settingsButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
});
