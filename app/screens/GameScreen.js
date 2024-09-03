import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  SafeAreaView,
  Modal,
} from "react-native";
import { TabooCard } from "../components"; // Import your TabooCard component
import { allSets } from "../../data";
import { useNavigation } from "@react-navigation/native";




export const GameScreen = ({ route }) => {
  const navigation = useNavigation();


  // Extract params from route
  const {
    gameDuration = 10,
    selectedSkips = 2,
    categories = [],
    selectedSet = "setOne",
  } = route.params || {};

  // Prepare selectedData from categories
  const [selectedData, setSelectedData] = useState([]);
  const [usedIndices, setUsedIndices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

useEffect(() => {
  if (categories.length > 0) {
    const data = categories.reduce((acc, category) => {
      const categoryData = allSets[selectedSet]?.[category] || [];
      return [...acc, ...categoryData];
    }, []);
    setSelectedData(data);
    if (data.length > 0) {
      const initialIndex = getRandomIndex(data.length, []);
      setCurrentIndex(initialIndex);
      setUsedIndices([initialIndex]); // Optionally set the initial index as used
    }
  }
}, [categories]);


  const getRandomIndex = (length, usedIndices) => {
    let index;
    do {
      index = Math.floor(Math.random() * length);
    } while (usedIndices.includes(index));
    return index;
  }

  //console.log("Selected Data:", selectedData);

  const [currentIndex, setCurrentIndex] = useState(
    selectedData.length ? getRandomIndex(selectedData.length, usedIndices) : 0
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
    if (isButtonDisabled || usedIndices.length >= selectedData.length) return;
    Vibration.vibrate(100);
    setCorrectCount(correctCount + 1);
    updateCardIndex();
  };

  const handlePressSkip = () => {
    if (isButtonDisabled || skipCount <= 0 || usedIndices.length >= selectedData.length) return;
    Vibration.vibrate(100);
    setSkipCount(skipCount - 1);
    updateCardIndex();
    
  };

  const updateCardIndex = () => {
    if (usedIndices.length >= selectedData.length){
      setIsModalVisible(true);
      setIsGameStarted(false);
      return;
    }
    const newIndex = getRandomIndex(selectedData.length, usedIndices);
    setCurrentIndex(newIndex);
    setUsedIndices([...usedIndices, newIndex]);
  }

  console.log(usedIndices);

  const handleReset = () => {
    setCorrectCount(0);
    setSkipCount(selectedSkips);
    setTimer(gameDuration);
    setIsButtonDisabled(false);
    setIsGameStarted(true);
    setIsModalVisible(false);
    setCurrentIndex(getRandomIndex(selectedData.length, []));
    setUsedIndices([]);
  };

  const Goto = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>All Cards have been used</Text>
            <TouchableOpacity style={[styles.button, styles.buttonClose]}
            onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
              isButtonDisabled || usedIndices.length >= selectedData.length ? styles.disabledButton : styles.greenButton,
            ]}
            onPress={handlePressCorrect}
            disabled={isButtonDisabled || usedIndices.length >= selectedData.length}
          >
            <Text
              style={[
                styles.buttonText,
                isButtonDisabled || usedIndices.length >= selectedData.length && styles.disabledButtonText,
              ]}
            >
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              skipCount <= 0 || isButtonDisabled || usedIndices.length >= selectedData.length
                ? styles.disabledButton
                : styles.orangeButton,
            ]}
            onPress={handlePressSkip}
            disabled={skipCount <= 0 || isButtonDisabled || usedIndices.length >= selectedData.length}
          >
            <Text
              style={[
                styles.buttonText,
                (skipCount <= 0 || isButtonDisabled || usedIndices.length >= selectedData.length) &&
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
