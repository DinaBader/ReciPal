import { View, Text,Image,TouchableOpacity, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import common from "../../utils/common"
import style from "./style"
import axios from 'axios';
import Input from "../../Components/Inputs/input"
import AdminNav from "../../Components/adminnav/AdminNavComp"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
// import {BASE_URL} from "@env"
const AddRecipe = ({navigation}) => {
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 
  const [name,setName]=useState("");
  const [calories,setCalories]=useState(0);
  const [country,setCountry]=useState("");
  const [total_time,setTotalTime]=useState(0);
  const [serving,setServing]=useState(0);
  const [difficulty,setDifficulty]=useState("");
  const [category,setCategory]=useState("");
  const [ingredients,setIngredients]=useState([]);
  const [instructions,setInstructions]=useState([]);

const handleNameChange =(text)=>{
        setName(text);
}
const handleCaloriesChange=(text)=>{
        setCalories(/^\d+$/.test(text) ? parseInt(text, 10) : "");

}
const handleCountrychange=(text)=>{
        setCountry(text)
}
const handleTimeChange=(text)=>{
        setTotalTime(/^\d+$/.test(text) ? parseInt(text, 10) : "")
}
const handleServingChange=(text)=>{
        setServing(/^\d+$/.test(text) ? parseInt(text, 10) : "")
}
const handleDifficultyChange=(text)=>{
        setDifficulty(text)
}
const handleCategoryChange=(text)=>{
        setCategory(text)
}
const handleIngredientsChange=(text)=>{
        const ingredientsArray = text.split(',').map(item => item.trim());
        setIngredients(ingredientsArray)
}
const handleInstructionsChange=(text)=>{
        const instructionsArray = text.split(',').map(item => item.trim());
        setInstructions(instructionsArray)
}

const navigateToLogin=()=>{
  AsyncStorage.clear();
  navigation.navigate('Login')
}

const navigateToStats=()=>{
  navigation.navigate('StatsPage');
}

const handleSubmit = async () => {
  let recipeResponse;  

  try {
    recipeResponse = await axios.post(
      "http://192.168.0.100:8000/recipe/addRecipe",
      {
        name,
        calories,
        country,
        total_time,
        serving,
        category,
        ingredients,
        instructions,
        difficulty
      }
    );


    if (recipeResponse.data.recipe && recipeResponse.data.recipe._id) {
      const addedRecipeId = recipeResponse.data.recipe._id;
    
      if (file) {
        const formData = new FormData();
        formData.append("image", {
          uri: file,
          name: `recipe_photo_${addedRecipeId}.jpg`,
          type: "image/jpg",
        });

        const photoResponse = await axios.post(
          `http://192.168.0.100:8000/recipe/addRecipePhoto/${addedRecipeId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

      }

    } else {
      console.error("Error adding recipe. Response:", recipeResponse);
    }
  } catch (error) {
    if (error.response) {
      console.log("BASE_URL:", BASE_URL);

      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.log("BASE_URL:", BASE_URL);

      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
  
    console.error("Error config:", error.config);
  }
};
                        
const pickImage = async () => { 
  const { status } = await ImagePicker. 
      requestMediaLibraryPermissionsAsync(); 

  if (status !== "granted") { 
      Alert.alert( 
          "Permission Denied", 
          `Sorry, we need camera  
           roll permission to upload images.` 
      ); 
  } else { 
      const result = 
          await ImagePicker.launchImageLibraryAsync(); 
      if (!result.canceled) { 
          setFile(result.uri); 
          setError(null); 
      } 
  } 
}; 
  const navigatoHome=()=>{
    navigation.navigate('AdminPage');
  }

  const navigateAddrecipes=()=>{
    navigation.navigate('AddRecipePage');
  }

  const navigateFeedback=()=>{
    navigation.navigate('UserFeedbackPage')
  }


  return (
    <ScrollView style={[common.backgroundColor]}>
      <Text style={[style.text]}>Add Recipes</Text>
      <View style={[style.inputs]}>
          <TextInput placeholder="name"
                    value={name}
                  onChangeText={handleNameChange}
                  style={style.input}
                  />
          <TextInput placeholder="calories"
                    value={calories.toString()}
                onChangeText={handleCaloriesChange} 
                style={style.input}/>
          <TextInput placeholder="country"
                    value={country}
                  onChangeText={handleCountrychange}
                  style={style.input}/>
          <TextInput placeholder="total time"
                    value={total_time.toString()}
                  onChangeText={handleTimeChange}
                  style={style.input}/>
          <TextInput placeholder="serving"
                    value={serving.toString()}
                  onChangeText={handleServingChange}
                  style={style.input}/>
          <TextInput placeholder="difficulty"
                    value={difficulty}
                  onChangeText={handleDifficultyChange}
                  style={style.input}/>
          <TextInput placeholder="category"
                    value={category}
                  onChangeText={handleCategoryChange}
                  style={style.input}/>
          <TextInput placeholder="ingredients"
            value={ingredients.join(', ')}
            onChangeText={handleIngredientsChange}
            style={style.input}/>
          <TextInput placeholder="instructions"
                    value={instructions.join(',')}
                  onChangeText={handleInstructionsChange}
                  style={style.input}/>
      </View>
      <TouchableOpacity style={[common.center]} 
                onPress={pickImage}> 
                <Text style={[common.yellow_bg,common.btn,common.bold,style.btn]}> 
                    Choose Image 
                </Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={[common.center]} onPress={handleSubmit}>
        <Text style={[common.yellow_bg,common.btn,common.bold,style.btn]}>Upload Recipe</Text>
      </TouchableOpacity>
            {file ? ( 
                <View style={style.imageContainer}> 
                    <Image source={{ uri: file }} 
                        style={style.image} /> 
                </View> 
            ) : ( 
                <Text style={style.errorText}>{error}</Text> 
            )} 
            <TouchableOpacity onPress={navigateToLogin}>
              <Text>Logout</Text>
            </TouchableOpacity>
            <AdminNav onPress1={navigatoHome} onPress2={navigateAddrecipes} onPress3={navigateFeedback} onPress4={navigateToStats}
     source1={require("../../../assets/home.png")}
     source2={require("../../../assets/add.png")}
     source3={require("../../../assets/chat.png")}
     source4={require("../../../assets/stats.png")}
     />
    </ScrollView>
  )
}

export default AddRecipe