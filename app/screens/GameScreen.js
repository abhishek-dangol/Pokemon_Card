import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  SafeAreaView,
} from "react-native";
import { TabooCard } from "../components"; // Import your TabooCard component
import { allSets } from "../../data";
import { useNavigation } from "@react-navigation/native";

const getRandomIndex = (length) => Math.floor(Math.random() * length);

export const GameScreen = ({ route }) => {
  const navigation = useNavigation();

  // Extract params from route
  const {
    gameDuration = 10,
    selectedSkips = 2,
    categories = [],
  } = route.params || {};
  // Prepare selectedData from categories
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    if (categories.length > 0) {
      // Assume allSets is available and properly imported
      const data = categories.reduce((acc, category) => {
        const categoryData = allSets["setOne"]?.[category] || []; // Use 'setOne' or 'setTwo' if needed
        return [...acc, ...categoryData];
      }, []);
      setSelectedData(data);
    }
  }, [categories]);

  const [currentIndex, setCurrentIndex] = useState(
    getRandomIndex(selectedData.length)
  );
  const [skipCount, setSkipCount] = useState(selectedSkips);
  const [correctCount, setCorrectCount] = useState(0);
  const [timer, setTimer] = useState(gameDuration);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(true);

  useEffect(() => {
    let interval;
    if (isGameStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsButtonDisabled(true);
            Vibration.vibrate(100);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameStarted]);

  const handlePressCorrect = () => {
    if (isButtonDisabled) return;
    Vibration.vibrate(100);
    setCorrectCount(correctCount + 1);
    setCurrentIndex(getRandomIndex(selectedData.length));
  };

  const handlePressSkip = () => {
    if (isButtonDisabled || skipCount <= 0) return;
    setSkipCount(skipCount - 1);
    setCurrentIndex(getRandomIndex(selectedData.length));
    Vibration.vibrate(100);
  };

  const handleReset = () => {
    setCorrectCount(0);
    setSkipCount(selectedSkips);
    setTimer(gameDuration);
    setIsButtonDisabled(false);
    setIsGameStarted(true);
    setCurrentIndex(getRandomIndex(selectedData.length));
  };

  const Goto = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timerText}>{`Time Elapsed: ${timer}`}</Text>
      </View>
      <View>
        {selectedData.length > 0 && (
          <TabooCard {...selectedData[currentIndex]} index={currentIndex + 1} />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              isButtonDisabled ? styles.disabledButton : styles.greenButton,
            ]}
            onPress={handlePressCorrect}
            disabled={isButtonDisabled}
          >
            <Text
              style={[
                styles.buttonText,
                isButtonDisabled && styles.disabledButtonText,
              ]}
            >
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              skipCount <= 0 || isButtonDisabled
                ? styles.disabledButton
                : styles.orangeButton,
            ]}
            onPress={handlePressSkip}
            disabled={skipCount <= 0 || isButtonDisabled}
          >
            <Text
              style={[
                styles.buttonText,
                (skipCount <= 0 || isButtonDisabled) &&
                  styles.disabledButtonText,
              ]}
            >
              Skip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              timer > 0
                ? styles.disabledButton
                : (styles.greenButton, { backgroundColor: "red" }),
            ]}
            onPress={handleReset}
            disabled={timer > 0}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Skips remaining: {skipCount > 0 ? skipCount : 0}
          </Text>
          <Text style={styles.statusText}>Score: {correctCount}</Text>
        </View>
        <View style={styles.statusContainer}>
          <TouchableOpacity onPress={Goto}>
            <Text style={styles.button}>Goto Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 50,
  },
  timerText: {
    fontSize: 32,
    fontWeightBold: "bold",
    color: "red",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 5,
  },
  greenButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#2E7D32",
  },
  orangeButton: {
    backgroundColor: "#FFA500",
    borderColor: "#FF8C00",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
    borderColor: "#A9A9A9",
  },
  disabledButtonText: {
    color: "#A9A9A9",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  statusContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
  },
  settingsButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
  },
});
