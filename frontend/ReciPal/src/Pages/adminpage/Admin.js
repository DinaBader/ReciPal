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
  const navigateToStats=()=>{
    navigation.navigate('StatsPage');
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
    {recipes.map((recipe, index) => (
            <View style={style.container}>
              <FoodCard
                key={index}
                source={{ uri: `${BASE_URL}/recipes/${recipe.image}` }}
                text={recipe.name}
              />
              <TouchableOpacity
                  style={[style.deleteButton, common.center]}
                  onPress={() => DeleteRecipe(recipe.recipeId)}>
                      <View style={style.align}>
                       <Image source={require("../../../assets/trash.png")} style={{width:20,height:20}}/>
                       <Text style={common.bold}>Delete</Text>
                       </View>
                    </TouchableOpacity>
            </View>
        ))}
    </View>
    <AdminNav onPress1={navigatoHome} onPress2={navigateAddrecipes} onPress3={navigateFeedback} onPress4={navigateToStats}
     source1={require("../../../assets/home.png")}
     source2={require("../../../assets/add.png")}
     source3={require("../../../assets/chat.png")}
     source4={require("../../../assets/stats.png")}

     />

   </ScrollView>
  )
}

export default Admin