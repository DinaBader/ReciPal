import { View, TouchableOpacity,Text } from 'react-native'
import React, { useState } from 'react'
import common from '../../utils/common'
import style from "./style"
const ImageScreen = () => {
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 

  const handleSubmit = async () => {  
    try {
        if (file) {
          const formData = new FormData();
          formData.append("image", {
            uri: file,
            name: `recipe_photo_${addedRecipeId}.jpg`,
            type: "image/jpg",
          });
  
          console.log("FormData created:", formData);
  
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
  


  return (
    <View style={[common.backgroundColor]}>
      <View style={[common.title]}>
          <Text style={[common.white,common.header]}>Suggestion</Text>
      </View>
      <TouchableOpacity>
        <Text style={[common.yellow_bg,common.button_w,style.btn,common.bold]} onPress={pickImage}>Upload image</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ImageScreen