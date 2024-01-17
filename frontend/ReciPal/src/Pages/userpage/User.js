import { View, Text, ScrollView,TouchableOpacity,Dimensions} from 'react-native';
import React,{useState,useEffect} from 'react';
import {BASE_URL} from '@env'
import axios from 'axios'
import foodCircleData from "../../Components/foodCircleData"
import common from "../../utils/common";
import styles from "./style";
import Search from "../../Components/search/searchcomp"
import Foodcircle from "../../Components/foodcircle/food"
import FoodCard from  "../../Components/foodcard/FoodCardComp"
import Carousel from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width/0.8;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.2);

const User = ({navigation}) => {
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
        <Carousel
          data={foodCircleData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleFoodPress(item.key)}>
              <View style={styles.foodCircleItem}>
                <Foodcircle source={item.source} text={item.key} selected={selectedFood === item.key} />
              </View>
            </TouchableOpacity>
          )}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
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
