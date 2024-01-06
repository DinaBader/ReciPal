import { View, Text,Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import common from "../../utils/common"
import style from "./style"
import Input from "../../Components/Inputs/input"
const Admin = () => {
//   const [file, setFile] = useState(null); 
//   const [error, setError] = useState(null); 
  
//   const [recipeData, setRecipeData] = useState({
//     name: '',
//     calories: '',
//     country: '',
//     totalTime: '',
//     serving: '',
//     difficulty: '',
//     category: '',
//     ingredients: '',
//     instructions: '',
//   });


// const pickImage = async () => { 
//   const { status } = await ImagePicker. 
//       requestMediaLibraryPermissionsAsync(); 

//   if (status !== "granted") { 
//       Alert.alert( 
//           "Permission Denied", 
//           `Sorry, we need camera  
//            roll permission to upload images.` 
//       ); 
//   } else { 
//       const result = 
//           await ImagePicker.launchImageLibraryAsync(); 
//       if (!result.cancelled) { 
//           setFile(result.uri); 
//           setError(null); 
//       } 
//   } 
// }; 

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

//   // Make API call for image upload
  
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
//     return; // Stop execution if image upload fails
//   }

//   // Continue with the other data upload...
// } catch (error) {
//   console.error('Error uploading image:', error.message);
//   return; // Stop execution if there's an error
// }

//   // Make API call for other data
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
              value={recipeData.name}
              onChangeText={(text)=>setRecipeData({ ...recipeData, name: text })} />
      <Input placeholder="calories"
              value={recipeData.calories}
              onChangeText={(text)=>setRecipeData({...recipeData,calories:text})}/>
      <Input placeholder="country"
              value={recipeData.country}
              onChangeText={(text)=>setRecipeData({...recipeData,country:text})}/>
      <Input placeholder="total time"
              value={recipeData.totalTime}
              onChangeText={(text)=>setRecipeData({...recipeData,totalTime:text})}/>
      <Input placeholder="serving"
              value={recipeData.serving}
              onChangeText={(text)=>setRecipeData({...recipeData,serving:text})}/>
      <Input placeholder="difficulty"
              value={recipeData.difficulty}
              onChangeText={(text)=>setRecipeData({...recipeData,difficulty:text})}/>
      <Input placeholder="category"
              value={recipeData.category}
              onChangeText={(text)=>setRecipeData({...recipeData,category:text})}/>
      <Input placeholder="ingredients"
            value={recipeData.ingredients}
            onChangeText={(text)=>setRecipeData({...recipeData,ingredients:text})}/>
      <Input placeholder="instructions"
              value={recipeData.instructions}
              onChangeText={(text)=>setRecipeData({...recipeData,instructions:text})}/>
      <TouchableOpacity style={[common.center]} 
                onPress={pickImage}> 
                <Text style={[common.yellow_bg]}> 
                    Choose Image 
                </Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={[common.center]} onPress={handleUpload}>
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