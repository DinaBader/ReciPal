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
  const [difficulty,setDifficulty]=useState("");
  const [category,setCategory]=useState("");
  const [ingredients,setIngredients]=useState([]);
  const [instructions,setInstructions]=useState([]);

//   const [recipeData, setRecipeData] = useState({
//     name: '',
//     calories: '',
//     country: '',
//     totalTime: '',
//     serving: '',
//     difficulty: '',
//     category: '',
//     ingredients: [],
//     instructions: [],
//   });

const handleNameChange =(text)=>{
        setName(text);
}
const handleCaloriesChange=(text)=>{
        setCalories(text);
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

// const handleUpload = async () => {
//   try {
//     const imageFormData = new FormData();

//     if (file) {
//       const fileExtension = file.split('.').pop();

//       imageFormData.append('image', {
//         uri: file,
//         name: `photo.${fileExtension}`,
//         type: `image/${fileExtension}`,
//       });
//     }
//   const otherData = {
//     name: recipeData.name,
//     calories: recipeData.calories,
//     country: recipeData.country,
//     totalTime: recipeData.totalTime,
//     serving: recipeData.serving,
//     difficulty: recipeData.difficulty,
//     category: recipeData.category,
//     ingredients: recipeData.ingredients,
//     instructions: recipeData.instructions,
//   };

  
//   const queryString = new URLSearchParams(imageFormData).toString();

//   const imageResponse = await fetch(`http://192.168.0.100:8000/recipe/addRecipePhoto/${recipeId}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     body: imageFormData,
//   });

//   if (imageResponse.ok) {
//     console.log('Image uploaded successfully!');
//   } else {
//     console.error('Failed to upload image. Check the backend response.');
//     return; 
//   }

// } catch (error) {
//   console.error('Error uploading image:', error.message);
//   return; 
// }

//   try {
//     const otherDataResponse = await fetch('http://192.168.0.100:8000/recipe/addRecipe', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(otherData),
//     });

//     if (otherDataResponse.ok) {
//       console.log('Other data uploaded successfully!');
//     } else {
//       console.error('Failed to upload other data. Check the backend response.');
//     }
//   } catch (error) {
//     console.error('Error uploading other data:', error.message);
//   }
// };


  return (
    <View style={[common.backgroundColor]}>
      <Text style={[style.text]}>Add Recipes</Text>
      <Input placeholder="name"
               onChangeText={handleNameChange}/>
      <Input placeholder="calories"
             onChangeText={handleCaloriesChange} />
      <Input placeholder="country"
              />
      <Input placeholder="total time"
              />
      <Input placeholder="serving"
              />
      <Input placeholder="difficulty"
              />
      <Input placeholder="category"
              />
      <Input placeholder="ingredients"
         />
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