import { View, Text, TouchableOpacity,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env'
import common from "../../utils/common"
import FoodCard from "../../Components/foodcard/FoodCardComp"
import styles from "./style"
const Saved = ({navigation}) => { 
    const [recipes,getRecipes]=useState([]);
    const [userId, setUserId] = useState(null);
    const [recipeImage,setRecipeImage]=useState([]);
    const [recipeName,setRecipeName]=useState([]);
    const navigateToSettings=()=>{
        navigation.goBack();
    }


    const _retrieveData = async () => {
        try {
          const userString = await AsyncStorage.getItem('user');
          if (userString !== null) {
            const user = JSON.parse(userString);
            const retrievedUserId = user._id;
            setUserId(retrievedUserId);
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };
        
      const getSavedRecipes = () => {
        if (userId === null) {
          console.error('User ID is null. Unable to fetch saved recipes.');
          return;
        }
    
        axios
          .get(`${BASE_URL}/reward/getSavedRecipes/${userId}`)
          .then((res) => {
            const { savedRecipes } = res.data;
            console.log('Saved Recipes:', savedRecipes);
            
            if (savedRecipes && savedRecipes.length > 0) {
              const recipeName = savedRecipes.map((item) => item.title);
              setRecipeName(recipeName);
              const recipeImage = savedRecipes.map((item) => item.image);
              setRecipeImage(recipeImage);
              const recipeIds = savedRecipes.map((item) => item.recipe);
              getRecipes(recipeIds); 
            }
          })
          .catch((error) => {
            console.log('Error fetching saved recipes', error);
          });
      };
    
      useEffect(() => {
        const fetchData = async () => {
          await _retrieveData();
        };
        fetchData();
      }, []);
    
      useEffect(() => {
        if (userId !== null) {
          getSavedRecipes();
        }
      }, [userId]);
            
            
            
  return ( 

    <View style={[common.backgroundColor]}>
        <View style={[common.title]}>
        <TouchableOpacity onPress={navigateToSettings}>
            <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
        </TouchableOpacity>
            <Text style={[common.white,common.header]}>Saved</Text>
        </View>
        <View style={[styles.item,styles.background ]}>
          {recipeName.map((name, index) => (
              <View key={index} style={styles.comp}>
                  <FoodCard source={{uri: recipeImage[index]}} text={name}/>
                  <TouchableOpacity style={[styles.deleteButton, common.center]}>
                      <Text style={common.bold}>Delete </Text>
                  </TouchableOpacity>
              </View>
            ))}
        </View>


    </View>
  )
}

export default Saved