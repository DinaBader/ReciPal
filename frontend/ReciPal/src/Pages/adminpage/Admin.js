import { View, Text,Image,TouchableOpacity, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import common from '../../utils/common'
import BottomNav  from '../../Components/userbottomnav/bottomnavcomp'
import style from "./style"
import axios from 'axios'
import FoodCard from '../../Components/foodcard/FoodCardComp'
import {BASE_URL} from "@env"
const Admin = ({navigation}) => {
  const [recipes,setRecipes]=useState([]); 
  const navigatoHome=()=>{
    navigation.navigate('AdminPage');
  } 
  const navigateAddrecipes=()=>{
    navigation.navigate('AddRecipePage');
  }
  const navigateFeedback=()=>{
    navigation.navigate('UserFeedbackPage')
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
     getRecipes()
  },[])

  return (
   <ScrollView style={common.backgroundColor}> 
   <Text style={[common.header,common.white]}>Admin Panel</Text>
   <Text style={[common.white,style.recipes]}>Recipes</Text>
   {recipes.map((recipe, index) => (
          <FoodCard
            key={index}
            source={{ uri: `${BASE_URL}/recipes/${recipe.image}` }}
            text={recipe.name}
            onPress={() => NavigateTodetails(recipe._id)}
          />
      ))}
    <BottomNav onPress1={navigatoHome} onPress2={navigateAddrecipes} onPress3={navigateFeedback}
     source1={require("../../../assets/home.png")}
     source2={require("../../../assets/add.png")}
     source3={require("../../../assets/chat.png")}
     />

   </ScrollView>
  )
}

export default Admin