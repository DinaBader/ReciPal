import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {BASE_URL} from "@env"
import axios from 'axios';
import foodCircleData from '../../Components/foodCircleData';
import common from '../../utils/common';
import styles from './style';
import Search from '../../Components/search/searchcomp';
import Foodcircle from '../../Components/foodcircle/food';
import FoodCard from '../../Components/foodcard/FoodCardComp';
import BottomNav from '../../Components/userbottomnav/bottomnavcomp';
import Carousel from 'react-native-snap-carousel';
import { useTranslation } from 'react-i18next';
import '../../localization/i18n'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const SLIDER_WIDTH = Dimensions.get('window').width / 0.8;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.2);

const User = ({ navigation }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [parentSearchResults, setParentSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorieRecipes,setCategorieRecipe]=useState([]);
  const [forceRerender, setForceRerender] = useState(false);
  const [currentLanguage,setLanguage] =useState("en"); 
  const {t, i18n} = useTranslation(); 

  const changeLanguage = (value) => { 
    i18n 
      .changeLanguage(value) 
      .then(() => {
        setLanguage(value);
      })
      .catch(err => console.error(err)); 
  }; 
  
  useEffect(() => {
    getRecipes();
    const retreiveLang=async()=>{
      const lang=await AsyncStorage.getItem("language")||"en";
      changeLanguage(lang)
    }
    retreiveLang()
  }, []);

  const handleFoodPress = (food) => {
    setSelectedFood((prevSelectedFood) => {
      const newSelectedFood = prevSelectedFood === food ? null : food;
      axios.get(`${BASE_URL}/recipe/getRecipeByCategory?categorie=${newSelectedFood}`,
      ).then((res)=>{
        setCategorieRecipe(res.data.recipes)
      }).catch((error)=>{
        console.error("error getting recipes by categorie",error)
      })
      return newSelectedFood;
    });
  };

  const NavigateTodetails = (recipeId) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const getRecipes = async () => {
    try {
      if(BASE_URL){
        const response = await axios.get(`${BASE_URL}/recipe/getRecipe`);
        setRecipes(response.data.recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes', error);
    } finally {
      setLoading(false);
    }
  };


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
        <Text style={[currentLanguage==="en"?styles.text:[styles.text,styles.arabic]]}>{t('UserPage.title')}</Text>
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
                    text={t(`UserPage.${item.key}`)}
                    selected={selectedFood === item.key}
                  />
                </View>
              </TouchableOpacity>
            )}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
          />
        </View>
        <Text style={[currentLanguage==="en"?[common.white, styles.recipeText,common.bold]:[common.white, styles.recipeText,common.bold,styles.arabic]]}>{t('UserPage.Recipes')}</Text>
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
                  key={index}
                    source={{
                      uri: `${BASE_URL}/recipes/${recipe.image}`,
                    }}
                    text={currentLanguage==="en"?recipe.name:recipe.name_ar}
                    onPress={() => NavigateTodetails(recipe._id)}
                  />
                </React.Fragment>
              ))
            ) : (
              selectedFood && selectedFood.length > 0 ? (
                categorieRecipes.map((categorieRecipe,index)=>(
                  <FoodCard
                  key={index}
                  source={{
                    uri: `${BASE_URL}/recipes/${categorieRecipe.image}`,
                  }}
                  text={currentLanguage==="en"?categorieRecipe.name:categorieRecipe.name_ar}
                  onPress={() => NavigateTodetails(categorieRecipe._id)}
                />
                ))
              ) : (
                recipes.map((recipe, index) => (
                  <FoodCard
                    key={index}
                    source={{
                      uri: `${BASE_URL}/recipes/${recipe.image}`,
                    }}
                    text={currentLanguage==="en"?recipe.name:recipe.name_ar}
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
