import { View, Image,TouchableOpacity,Text } from 'react-native'
import React, { useState } from 'react'
import style from "./style.js"
import common from "../../utils/common.js"
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
const UserProfileComp = ({source}) => {
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 
  const handleSubmit = async () => {
    try {      
      const Token=await AsyncStorage.getItem("jwt");
        if (file) {
          const formData = new FormData();
          formData.append("image", {
            uri: file,
            name: `profile_photo_${addedRecipeId}.jpg`,
            type: "image/jpg",
          });
  
          console.log("FormData created:", formData);
  
          const photoResponse = await axios.post(
            `${BASE_URL}/reward/update_image`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                'Authorization':`Bearer ${Token}`
              },
            }
          );
  
          console.log("Recipe photo uploaded successfully:", photoResponse.data);
        }
  
      } 
     catch (error) {
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
    <View>
        <Image source={source}
        style={style.image} />
        <TouchableOpacity>
        <Text style={[common.white,style.ChangeProfile]} onPress={pickImage}>Change Profile</Text>
        {file ? ( 
                <View style={style.imageContainer}> 
                    <Image source={{ uri: file }} 
                        style={style.image} /> 
                        <TouchableOpacity onPress={handleSubmit}>
                          <Text>Submit</Text>
                        </TouchableOpacity>
                </View> 
            ) : ( 
                <Text style={style.errorText}>{error}</Text> 
            )} 

        </TouchableOpacity>

    </View>
  )
}

export default UserProfileComp