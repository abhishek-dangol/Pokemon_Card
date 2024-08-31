import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'

export const TabooCard = ({
    word,
    hint1,
    hint2,
    hint3,
    hint4,
    hint5,
    cardNumber,
    SetNumber
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardNumber}>{cardNumber}</Text>
      <Text style={[styles.cardNumber, { alignSelf: 'flex-end' } ]}>Set {SetNumber}</Text>
      <Text style={styles.wordText}>{word}</Text>
      <View style={styles.hintsContainer}>
        <Text style={styles.hintText}>{hint1}</Text>
        <Text style={styles.hintText}>{hint2}</Text>
        <Text style={styles.hintText}>{hint3}</Text>
        <Text style={styles.hintText}>{hint4}</Text>
        <Text style={styles.hintText}>{hint5}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FAF3E0",
        borderRadius: 16,
        borderWidth: 2,
        padding: 16,
        margin: 16,
        borderColor: "#E0E0E0",
        ...Platform.select({
            ios: {
                shadowOffset: { width: 2, height: 2 },
                shadowColor: "#333",
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            }
        })
    },
    wordText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 32,
        color: '#6D4C41',
        fontFamily: "Avenir"
    },
    cardNumber: {
        fontSize: 16,
        color: '#6D4C41',
        fontWeight: "bold",

    },
    hintsContainer: {
        marginTop: 16,
        alignItems: 'center'
    },
    hintText: {
        fontSize: 22,
        marginBottom: 8,
        textAlign: 'center',
        color: '#6D4C41',
    },
})
