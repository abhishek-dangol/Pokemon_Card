import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import foodSetOne from '../../../data/SetOne/foodSetOne';
import geographySetOne from '../../../data/SetOne/geographySetOne';
import hollywoodSetOne from '../../../data/SetOne/hollywoodSetOne';
import bollywoodSetOne from '../../../data/SetOne/bollywoodSetOne';

const categories = [
  { name: 'Food', data: foodSetOne },
  { name: 'Geography', data: geographySetOne },
  { name: 'Hollywood', data: hollywoodSetOne },
  { name: 'Bollywood', data: bollywoodSetOne }
];

export const CategorySelector = ({ onCategoriesSelected }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(item => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleStartGame = () => {
    if (selectedCategories.length < 2) {
      alert('Please select at least two categories.');
      return;
    }
    onCategoriesSelected(selectedCategories);
  };

  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.name}
          style={[
            styles.button,
            selectedCategories.includes(cat.name) && styles.selectedButton
          ]}
          onPress={() => toggleCategory(cat.name)}
        >
          <Text style={styles.buttonText}>{cat.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartGame}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 5,
  },
  selectedButton: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  startButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
});
