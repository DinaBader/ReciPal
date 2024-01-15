import { View, Text, ScrollView,TouchableOpacity } from 'react-native';
import React,{useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {BASE_URL} from '@env'
import axios from 'axios'
import common from "../../utils/common";
import styles from "./style";
import Search from "../../Components/search/searchcomp"
import Foodcircle from "../../Components/foodcircle/food"
import FoodCard from  "../../Components/foodcard/FoodCardComp"
const User = () => {
  const navigation = useNavigation();
  const [selectedFood, setSelectedFood] = useState(null);
  const [recipes,setRecipes]=useState([]);
  const handleFoodPress = (food) => {
    setSelectedFood((prevSelectedFood) => (prevSelectedFood === food ? null : food));
  };

  const NavigateTodetails=(recipeId)=>{
    navigation.navigate('RecipeDetail', { recipeId });
  }

  const getRecipes = async () => {
   
      axios.get(
        `${BASE_URL}/recipe/getRecipe`).then(function(res){
          setRecipes(res.data.recipes)
          console.log(res.data.recipes)
        })
  };

  useEffect(()=>{
    getRecipes()
  },[])
  
  return (
    <ScrollView style={[common.backgroundColor,styles.container]}>
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
      <Text style={[common.white,styles.recipeText]}>Recipes</Text>
      <View style={styles.foodCard}>
        {recipes.map((recipe, index) => (
          <FoodCard
            key={index}
            source={{ uri: `${BASE_URL}/public/recipe/${recipe.image}` }}
            text={recipe.name}
            onPress={() => NavigateTodetails(recipe._id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default User;
