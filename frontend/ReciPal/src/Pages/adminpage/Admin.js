import { View, Text,Image,TouchableOpacity, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import common from '../../utils/common'
import AdminNav  from '../../Components/adminnav/AdminNavComp'
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
   <View style={style.foodCard}>
    {recipes.slice(0,6).map((recipe, index) => (
            <FoodCard
              key={index}
              source={{ uri: `${BASE_URL}/recipes/${recipe.image}` }}
              text={recipe.name}
            />
        ))}
        <TouchableOpacity> 
          <Text style={[common.white,style.allRecipes]}>Get all recipes</Text>
        </TouchableOpacity>
    </View>
    <AdminNav onPress1={navigatoHome} onPress2={navigateAddrecipes} onPress3={navigateFeedback}
     source1={require("../../../assets/home.png")}
     source2={require("../../../assets/add.png")}
     source3={require("../../../assets/chat.png")}
     source4={require("../../../assets/stats.png")}

     />

   </ScrollView>
  )
}

export default Admin