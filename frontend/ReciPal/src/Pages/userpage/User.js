import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import common from "../../utils/common";
import styles from "./style";
import Search from "../../Components/search/searchcomp"
import Foodcircle from "../../Components/foodcircle/food"
const User = () => {
  const [selectedFood, setSelectedFood] = useState(null);

  const handleFoodPress = (food) => {
    setSelectedFood((prevSelectedFood) =>
    prevSelectedFood === food ? null : food
    );

  };

  return (
    <View style={[common.backgroundColor,styles.container]}>
      <Text style={styles.text}>What would you like {'\n'} to Eat?</Text>
      <Search/>
      <View style={styles.foodCircleContainer}>

        <TouchableOpacity onPress={() => handleFoodPress("Beef")}>
        <Foodcircle source={require("../../../assets/beef.jpg")} text="Beef" selected={selectedFood === "Beef"}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleFoodPress("Fish")}>
        <Foodcircle source={require("../../../assets/fish.jpg")} text="Fish" selected={selectedFood === "Fish"}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleFoodPress("Dips")}>
        <Foodcircle source={require("../../../assets/dips.jpeg")} text="Dips" selected={selectedFood === "Dips"} />
        </TouchableOpacity>


      </View>
      <Text style={[common.white,common.bold,styles.recipeText]}>Recipes</Text>
    </View>
  );
}

export default User;
