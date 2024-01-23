import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { BASE_URL } from '@env';
import axios from 'axios';
import foodCircleData from '../../Components/foodCircleData';
import common from '../../utils/common';
import styles from './style';
import Search from '../../Components/search/searchcomp';
import Foodcircle from '../../Components/foodcircle/food';
import FoodCard from '../../Components/foodcard/FoodCardComp';
import BottomNav from '../../Components/userbottomnav/bottomnavcomp';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width / 0.8;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.2);

const User = ({ navigation }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [parentSearchResults, setParentSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorieRecipes,setCategorieRecipe]=useState([]);

  const handleFoodPress = (food) => {
    setSelectedFood((prevSelectedFood) => {
      const newSelectedFood = prevSelectedFood === food ? null : food;
      axios.get(`${BASE_URL}/recipe/getRecipeByCategory?categorie=${newSelectedFood}`,
      ).then((res)=>{
        setCategorieRecipe(res.data.recipes)
      }).catch((error)=>{
        console.log("error getting recipes by categorie",error)
      })
      return newSelectedFood;
    });
  };

  const NavigateTodetails = (recipeId) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const getRecipes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/recipe/getRecipe`);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.log('Error fetching recipes', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleSearchResultsChange = (results) => {
    setParentSearchResults(results.recipes);
  };

  const handleSearchCancel = () => {
    setParentSearchResults([]);
    setForceRerender((prev) => !prev);
    getRecipes();
  };

  const navigatoHome = () => {
    navigation.navigate('UserPage');
  };

  const navigateAdd = () => {
    navigation.navigate('ImagePage');
  };

  const navgateProfile = () => {
    navigation.navigate('UserProfile');
  };

  return (
    <>
      <ScrollView
        style={[common.backgroundColor, styles.container]}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Text style={styles.text}>What would you like {'\n'} to Eat?</Text>
        <Search
          onSearchResultsChange={handleSearchResultsChange}
          onCancel={handleSearchCancel}
        />
        <View style={styles.foodCircleContainer}>
          <Carousel
            data={foodCircleData}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleFoodPress(item.key)}>
                <View style={styles.foodCircleItem}>
                  <Foodcircle
                    source={item.source}
                    text={item.key}
                    selected={selectedFood === item.key}
                  />
                </View>
              </TouchableOpacity>
            )}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
          />
        </View>
        <Text style={[common.white, styles.recipeText,common.bold]}>Recipes</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFBF4D" />
          </View>
        ) : (
          <View style={styles.foodCard}>
            {Object.values(parentSearchResults).length > 0 ? (
              parentSearchResults.map((recipe, index) => (
                <React.Fragment key={recipe.id}>
                  <FoodCard
                    source={{
                      uri: `${BASE_URL}/recipes/${recipe.image}`,
                    }}
                    text={recipe.name}
                    onPress={() => NavigateTodetails(recipe._id)}
                  />
                </React.Fragment>
              ))
            ) : (
              selectedFood && selectedFood.length > 0 ? (
                categorieRecipes.map((categorieRecipe,index)=>(
                  <FoodCard
                  source={{
                    uri: `${BASE_URL}/recipes/${categorieRecipe.image}`,
                  }}
                  text={categorieRecipe.name}
                  onPress={() => NavigateTodetails(categorieRecipe._id)}
                />
                ))
              ) : (
                recipes.slice(0, 8).map((recipe, index) => (
                  <FoodCard
                    key={index}
                    source={{
                      uri: `${BASE_URL}/recipes/${recipe.image}`,
                    }}
                    text={recipe.name}
                    onPress={() => NavigateTodetails(recipe._id)}
                  />
                ))
              )
            )}
          </View>
        )}
      </ScrollView>
      <BottomNav
        onPress1={navigatoHome}
        onPress2={navigateAdd}
        onPress3={navgateProfile}
        source1={require('../../../assets/home.png')}
        source2={require('../../../assets/add.png')}
        source3={require('../../../assets/settings-black.png')}
      />
    </>
  );
};

export default User;
