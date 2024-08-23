import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Vibration } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import pokemonData from '../data/pokemonData';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skipCount, setSkipCount] = useState(2);
  const [correctCount, setCorrectCount] = useState(0);



  const handlePressCorrect = ( )=> {
    // Trigger vibration
    Vibration.vibrate(100); // Vibrate for 100 milliseconds

    // Update index and correct count
    const nextIndex = (currentIndex + 1) % pokemonData.length;
    setCurrentIndex(nextIndex);
    setCorrectCount(correctCount + 1);
  };

  const handlePressSkip = () => {
    // Trigger vibration
    
    setSkipCount(skipCount - 1);
    if (skipCount > 0) {
      const nextIndex = (currentIndex + 1) % pokemonData.length;
      setCurrentIndex(nextIndex);
      Vibration.vibrate(100); // Vibrate for 100 milliseconds
    }
  };

  const isSkipDisabled = skipCount <= 0;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <PokemonCard {...pokemonData[currentIndex]} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={handlePressCorrect}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, isSkipDisabled ? styles.disabledButton : styles.orangeButton]} onPress={handlePressSkip}>
            <Text style={[styles.buttonText, isSkipDisabled && styles.disabledButtonText]}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Skips remaining: {skipCount > 0 ? skipCount : 0}</Text>
          <Text style={styles.statusText}>Score: {correctCount}</Text>
        </View>
      </View>
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
    marginHorizontal: 5, // Adjusted margin
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
    // textShadowColor: '#000',
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 3,
  },
  statusContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
  },
});
