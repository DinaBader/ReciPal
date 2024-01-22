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
import BottomNav from "../../Components/userbottomnav/bottomnavcomp"
import Carousel from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width/0.8;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.2);

const User = ({navigation}) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [recipes,setRecipes]=useState([]);
  const [parentSearchResults, setParentSearchResults] = useState([]);

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
        }).catch((error)=>{
          console.log("Error fetching recipes",error);
        })
  };


  useEffect(()=>{
    getRecipes();
  },[])


  const handleSearchResultsChange = (results) => {
    setParentSearchResults(results);
    const recipes=parentSearchResults.recipes;
    console.log(recipes)
  };
  const handleSearchCancel = () => {
    setParentSearchResults([]);
    getRecipes();
  };

  const navigatoHome = () =>{
    navigation.navigate('UserPage');
  }

  const navigateAdd = () =>{
    navigation.navigate('ImagePage');
  }

  const navgateProfile = () =>{
    navigation.navigate('UserProfile');
  }

  
  return (
    <>
    <ScrollView style={[common.backgroundColor,styles.container]}>
      <Text style={styles.text}>What would you like {'\n'} to Eat?</Text>
      <Search onSearchResultsChange={handleSearchResultsChange}  onCancel={handleSearchCancel}
 />
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
         {Object.values(parentSearchResults).length > 0 ? (
          recipes?.map((recipe, index) => (
            <>
             <React.Fragment key={recipe.id}>
              <FoodCard
                source={{ uri: `${BASE_URL}/recipes/${recipe.image}` }}
                text={recipe.name}
                onPress={() => NavigateTodetails(recipe._id)}
              />
            </React.Fragment>
            </>
        ))
      ) : (
        recipes.map((recipe, index) => (
          <FoodCard
            key={index}
            source={{ uri: `${BASE_URL}/recipes/${recipe.image}` }}
            text={recipe.name}
            onPress={() => NavigateTodetails(recipe._id)}
          />
        ))
      )}
    </View>

    </ScrollView>
        <BottomNav onPress1={navigatoHome} onPress2={navigateAdd} onPress3={navgateProfile}
        source1={require("../../../assets/home.png")}
        source2={require("../../../assets/add.png")}
        source3={require("../../../assets/settings-black.png")}
        />
         </> 
  );
}

export default User;
