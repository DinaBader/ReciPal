import { View, Text, ScrollView,TouchableOpacity, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import common from '../../utils/common';
import ImageHeader from '../../Components/ImageHeader/imageheader';
import Cylinder from '../../Components/cylinder/CylinderComp.js';
import style from './style.js';
import {BASE_URL} from '@env'

const Recipedetail = ({route,navigation}) => {
  const [recipeDetails,setRecipeDetails]=useState([]);
  const [userId, setUserId] = useState(null);
  const [saved,setSaved]=useState('false');
  const navigateToHome=()=>{
    navigation.goBack();
  }
  const { recipeId } = route.params;
  
  const _retrieveData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString !== null) {
        const user = JSON.parse(userString);
        const retrievedUserId = user._id;
        console.log('User ID:', retrievedUserId); 
        setUserId(retrievedUserId);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const getRecipeDetails=()=>{
    axios.get(`${BASE_URL}/recipe/getRecipeById/${recipeId}`
    ).then((res)=>{
      const { recipe } = res.data;
      setRecipeDetails(recipe);
    }).catch((error)=>{
      console.log("error",error);
    })
  }

  const saveRecipe = async () => {
    if (saved === 'false') {
      try {
        await axios.post(`${BASE_URL}/reward/saveRecipe/${userId}/${recipeId}`);
        console.log('recipe saved');
        updateSavedStatus('true');
      } catch (error) {
        console.log('error saving recipe', error);
      }
    } else {
      try {
        await axios.post(`${BASE_URL}/reward/unsaveRecipe/${userId}/${recipeId}`);
        console.log('recipe unsaved');
        updateSavedStatus('false');
      } catch (error) {
        console.log('error unsaving recipe', error);
      }
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await _retrieveData();
      const savedStatus = await AsyncStorage.getItem(`saved_${recipeId}`);
      setSaved(savedStatus || 'false');
      getRecipeDetails();
    };
  
    fetchData();
  }, [userId]);
    
  const updateSavedStatus = async (status) => {
    try {
      await AsyncStorage.setItem(`saved_${recipeId}`, status.toString());
      setSaved(status);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleCompleted=()=>{
    
  }

  return (
      <ScrollView style={[common.backgroundColor,style.container]}>

        <View style={style.backButtonContainer}>
          <TouchableOpacity onPress={navigateToHome}>
            <Image source={require("../../../assets/back.png")} style={[common.back_Icon]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveRecipe}>
          {saved === "true" ? (
            <Image source={require("../../../assets/save-yellow.png")} style={[common.back_Icon]} />
          ) : (
            <Image source={require("../../../assets/save-recipe.png")} style={[common.back_Icon]} />
          )}
          </TouchableOpacity>
        </View>

        <ImageHeader source={require('../../../assets/beefchili.jpeg')} text={recipeDetails.name} />

        <Text style={[common.white, common.bold, style.ingredientsTitle]}>Ingredients</Text>

        {recipeDetails.ingredients && recipeDetails.ingredients.map((ingredient, index) => (
         <Text key={index} style={[common.white, style.ingredientsText]}>
              {ingredient}
          </Text>
        ))}

        <Text style={[common.white, common.bold, style.ingredientsTitle]}>Instructions</Text>

        {recipeDetails.instructions && recipeDetails.instructions.map((instruction,index)=>(
             <Text key={index} style={[common.white, style.ingredientsText]}>
                  {instruction}
              </Text>
        ))}

      <View style={[common.flex,style.cylinder]}>
        <Cylinder  text={recipeDetails.total_time ? recipeDetails.total_time.toString() : 'N/A'} />
        <Cylinder text={recipeDetails.serving ? recipeDetails.serving.toString() : 'N/A'}/>
        <Cylinder text={recipeDetails.calories ? recipeDetails.calories.toString() : 'N/A'}/>
        <Cylinder text={recipeDetails.difficulty ? recipeDetails.difficulty.toString() : 'N/A'}/>
      </View>
      <TouchableOpacity
       style={[common.yellow_bg,common.button_h,common.button_w,common.center,style.button]}
       onPress={handleCompleted}
       >
        <Text style={[common.bold]}>Completed Recipe</Text>
      </TouchableOpacity>
      </ScrollView>

  );
};

export default Recipedetail;
