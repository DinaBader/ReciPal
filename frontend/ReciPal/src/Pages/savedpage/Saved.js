import { View, Text, TouchableOpacity,Image, ScrollView } from 'react-native'
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
              const recipesData = savedRecipes.map((item) => ({
                recipeId: item.recipe,
                recipeName: item.title,
                recipeImage: item.image,
              }));
              getRecipes(recipesData);
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

      useEffect(() => {
          getSavedRecipes();
        
      }, [recipes]);
            
    const DeleteRecipe=async(recipeId)=>{
      try {
        await axios.post(`${BASE_URL}/reward/unsaveRecipe/${userId}/${recipeId}`);
        console.log('recipe unsaved');
      } catch (error) {
        console.log('error unsaving recipe', error);
      }
    }

            
            
  return ( 

    <ScrollView style={[common.backgroundColor]}>
        <View style={[common.title]}>
        <TouchableOpacity onPress={navigateToSettings}>
            <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
        </TouchableOpacity>
            <Text style={[common.white,common.header]}>Saved</Text>
        </View>
        {recipes.map((recipe, index) => (
            <View style={[styles.item, styles.background]} key={index}>
              <View style={styles.comp}>
                <FoodCard source={{ uri: recipe.recipeImage }} text={recipe.recipeName} />
                <TouchableOpacity
                  style={[styles.deleteButton, common.center]}
                  onPress={() => DeleteRecipe(recipe.recipeId)}
              >
                      <View style={styles.align}>
                       <Image source={require("../../../assets/trash.png")} style={{width:20,height:20}}/>
                       <Text style={common.bold}>Delete</Text>
                       </View>
                    </TouchableOpacity>
                </View>
              </View>
            ))}
    </ScrollView>
  )
}

export default Saved