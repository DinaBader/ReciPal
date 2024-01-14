import { View, Text,Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import common from "../../utils/common"
import style from "./style"
import axios from 'axios';
import Input from "../../Components/Inputs/input"
const Admin = () => {
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

const handleSubmit = async () => {
        try {
          const response = await axios.post(
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
      
          const addedRecipeId = response.data.id;
      
          await axios.post(
            `http://192.168.0.100:8000/recipe/addRecipePhoto/${addedRecipeId}`,
            {
              image: file
            }
          );
      
          console.log("Recipe uploaded successfully!");
        } catch (error) {
          console.log("Error adding items", error.response);
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


  return (
    <View style={[common.backgroundColor]}>
      <Text style={[style.text]}>Add Recipes</Text>
      <Input placeholder="name"
                value={name}
               onChangeText={handleNameChange}/>
      <Input placeholder="calories"
                value={calories.toString()}
             onChangeText={handleCaloriesChange} />
      <Input placeholder="country"
                value={country}
              onChangeText={handleCountrychange}/>
      <Input placeholder="total time"
                value={total_time.toString()}
              onChangeText={handleTimeChange}/>
      <Input placeholder="serving"
                value={serving.toString()}
              onChangeText={handleServingChange}/>
      <Input placeholder="difficulty"
                value={difficulty}
              onChangeText={handleDifficultyChange}/>
      <Input placeholder="category"
                value={category}
              onChangeText={handleCategoryChange}/>
      <Input placeholder="ingredients"
         value={ingredients.join(', ')}
         onChangeText={handleIngredientsChange}/>
      <Input placeholder="instructions"
                value={instructions.join(',')}
              onChangeText={handleInstructionsChange}/>
      <TouchableOpacity style={[common.center]} 
                onPress={pickImage}> 
                <Text style={[common.yellow_bg]}> 
                    Choose Image 
                </Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={[common.center]} onPress={handleSubmit}>
        <Text style={[common.yellow_bg]}>Upload Recipe</Text>
      </TouchableOpacity>
            {file ? ( 
                <View style={style.imageContainer}> 
                    <Image source={{ uri: file }} 
                        style={style.image} /> 
                </View> 
            ) : ( 
                <Text style={style.errorText}>{error}</Text> 
            )} 
    </View>
  )
}

export default Admin