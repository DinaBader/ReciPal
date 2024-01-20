import { View, TouchableOpacity,Text,Image } from 'react-native'
import React, { useState } from 'react'
import common from '../../utils/common'
import * as ImagePicker from 'expo-image-picker';
import style from "./style"
import {BASE_URL} from "@env"
const ImageScreen = () => {
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 

  const handleSubmit = async () => {  
    try {
        if (file) {
          const formData = new FormData();
          formData.append("image", {
            uri: file,
            name: `recipe_photo.jpg`,
            type: "image/jpg",
          });
  
          console.log("FormData created:", formData);
  
          const photoResponse = await axios.post(
            `${BASE_URL}/tags/getImageTags`,
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
  
  const handleCancel=()=>{
    setFile(null);
    setError(null);

  }

  return (
    <View style={[common.backgroundColor]}>
      <View style={[common.title]}>
          <Text style={[common.white,common.header]}>Suggestion</Text>
      </View>
      <TouchableOpacity>
        <Text style={[common.yellow_bg,common.button_w,style.btn,common.bold]} onPress={pickImage}>Upload image</Text>
      </TouchableOpacity>
      {file ? ( 
                <View style={style.imageContainer}> 
                    <Image source={{ uri: file }} 
                        style={style.image} /> 
                        <TouchableOpacity onPress={handleSubmit} style={[common.center,common.yellow_bg,style.btn]}>
                          <Text style={common.bold}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCancel} style={[common.center,common.yellow_bg,style.btn]}>
                          <Text style={common.bold}>Cancel</Text>
                        </TouchableOpacity>
                </View> 
            ) : ( 
                <Text style={style.errorText}>{error}</Text> 
      )} 
    </View>
  )
}

export default ImageScreen