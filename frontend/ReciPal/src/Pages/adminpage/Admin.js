import { View, Text,Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import common from "../../utils/common"
import style from "./style"
import Input from "../../Components/Inputs/input"
const Admin = () => {
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 
  const [name,setName]=useState("");
  const [calories,setCalories]=useState(0);
  const [country,setCountry]=useState("");
  const [totaltime,setTotalTime]=useState(0);
  const [serving,setServing]=useState("");
  const [difficulty,setDifficulty]=useState("");
  const [category,setCategory]=useState("");
  const [ingredients,setIngredients]=useState([]);
  const [instructions,setInstructions]=useState([]);

const handleNameChange =(text)=>{
        setName(text);
}
const handleCaloriesChange=(text)=>{
        setCalories(text);
}
const handleCountrychange=(text)=>{
        setCountry(text)
}
const handleTimeChange=(text)=>{
        setTotalTime(text)
}
const handleServingChange=(text)=>{
        setServing(text)
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
      if (!result.cancelled) { 
          setFile(result.uri); 
          setError(null); 
      } 
  } 
}; 


  return (
    <View style={[common.backgroundColor]}>
      <Text style={[style.text]}>Add Recipes</Text>
      <Input placeholder="name"
               onChangeText={handleNameChange}/>
      <Input placeholder="calories"
             onChangeText={handleCaloriesChange} />
      <Input placeholder="country"
              onChangeText={handleCountrychange}/>
      <Input placeholder="total time"
              onChangeText={handleTimeChange}/>
      <Input placeholder="serving"
              onChangeText={handleServingChange}/>
      <Input placeholder="difficulty"
              onChangeText={handleDifficultyChange}/>
      <Input placeholder="category"
              onChangeText={handleCategoryChange}/>
      <Input placeholder="ingredients"
         onChangeText={handleIngredientsChange}/>
      <Input placeholder="instructions"
              />
      <TouchableOpacity style={[common.center]} 
                onPress={pickImage}> 
                <Text style={[common.yellow_bg]}> 
                    Choose Image 
                </Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={[common.center]} >
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