import foodSetOne from "../../data/SetOne/foodSetOne";
import geographySetOne from "../../data/SetOne/geographySetOne";
import hollywoodSetOne from "../../data/SetOne/hollywoodSetOne";
import bollywoodSetOne from "../../data/SetOne/bollywoodSetOne";

import foodSetTwo from "../../data//SetTwo/foodSetTwo";
import geographySetTwo from "../../data//SetTwo/geographySetTwo";
import hollywoodSetTwo from "../../data//SetTwo/hollywoodSetTwo";
import bollywoodSetTwo from "../../data//SetTwo/bollywoodSetTwo";

export const SetOne = "setOne";
export const SetTwo = "setTwo";

export const Food = "Food";
export const Geography = "Geography";
export const Hollywood = "Hollywood";
export const Bollywood = "Bollywood";

export const categories = {
  setOne: [
    { name: Food, data: foodSetOne },
    { name: Geography, data: geographySetOne },
    { name: Hollywood, data: hollywoodSetOne },
    { name: Bollywood, data: bollywoodSetOne },
  ],
  setTwo: [
    { name: Food, data: foodSetTwo },
    { name: Geography, data: geographySetTwo },
    { name: Hollywood, data: hollywoodSetTwo },
    { name: Bollywood, data: bollywoodSetTwo },
  ],
};
