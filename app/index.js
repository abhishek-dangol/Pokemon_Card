import { StyleSheet, Text, SafeAreaView, Platform, ScrollView } from 'react-native'
import React from 'react'
import PokemonCard from '../components/PokemonCard'
import pokemonData from '../data/pokemonData'

const app = () => {

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <PokemonCard {...pokemonData.charmander}/>
            <PokemonCard {...pokemonData.squirtle}/>
            <PokemonCard {...pokemonData.bulbasaur}/>
            <PokemonCard {...pokemonData.pikachu}/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default app

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: Platform.OS === "android" ? 25 : 0,
    }
})