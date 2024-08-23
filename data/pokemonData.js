
const pokemonData = [
  {
    name: "Charmander",
    image: require("../assets/images/charmander.png"),
    type: "Fire",
    hp: 39,
    moves: ["Scratch", "Ember", "Growl", "Leer"],
    weaknesses: ["Water", "Rock"],
  },
  {
    name: "Squirtle",
    image: require("../assets/images/squirtle.png"),
    type: "Water",
    hp: 44,
    moves: ["Tackle", "Water Gun", "Tail Whip", "Withdraw"],
    weaknesses: ["Electric", "Grass"],
  },
  {
    name: "Bulbasaur",
    image: require("../assets/images/bulbasaur.png"),
    type: "Grass",
    hp: 45,
    moves: ["Tackle", "Vine Whip", "Growl", "Leech Seed"],
    weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
  },
  {
    name: "Pikachu",
    image: require("../assets/images/pikachu.png"),
    type: "Electric",
    hp: 35,
    moves: ["Quick Attack", "Thunderbolt", "Tail Whip", "Growl"],
    weaknesses: ["Ground"],
  }
];

export default pokemonData;
