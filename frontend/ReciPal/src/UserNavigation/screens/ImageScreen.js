import { View, TouchableOpacity,Text,Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import common from '../../utils/common'
import * as ImagePicker from 'expo-image-picker';
import style from "./style"
import axios from 'axios'
import {BASE_URL} from "@env"
import FoodCardComp from '../../Components/foodcard/FoodCardComp';
const ImageScreen = () => {
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 
  const [tags,setTags] = useState([]);
  const [recipes,setRecipes]=useState([]);
  const food=[];
  const handleSubmit = async () => {  
    try {
        // if (file) {
        //   const formData = new FormData();
        //   formData.append("image", {
        //     uri: file,
        //     name: `recipe_photo.jpg`,
        //     type: "image/jpg",
        //   });
  
        //   console.log("FormData created:", formData);
  
          const photoResponse = await axios.post(
            `${BASE_URL}/tags/getImageTags`,
            // formData,
            // {
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
            // }
          );
        // }
        const tagsres = photoResponse.data.tags;
        console.log(tagsres);
        setTags(tagsres);
        filter_ingredients(tagsres);
        getRecipes(food)
        // console.log(tags)
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

  const getRecipes = async (tags) => {
    try {
      const response = await axios.get(`${BASE_URL}/recipe/getRecipeByIngredients`, {
        params: {
          tags: tags.join(',')
        }
      });
  
      const res = response.data.recipes;
      setRecipes(res);
      console.log(res);
    } catch (error) {
      console.log("Error getting recipes", error.message);
    }
  };
    
  const handleCancel=()=>{
    setFile(null);
    setError(null); 
  }

  const filter_ingredients=(tags)=>{
    tags.map((tag)=>{
      food.push(tag.tag.en);
    })
  }

  return (
    <ScrollView style={[common.backgroundColor]}>
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
                          <Text style={common.bold}>Analyze</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCancel} style={[common.center,common.yellow_bg,style.btn]}>
                          <Text style={common.bold}>Cancel</Text>
                        </TouchableOpacity>
                        {tags.length > 0 && (
                    <View style={style.tagsContainer}>
                      <Text style={[common.white,common.bold]}>Found:</Text>
                      {tags.map((tag, index) => (
                        <>
                        <Text key={index} style={[common.white]}>{tag.tag.en}</Text>
                        </>
                      ))}
                  </View>
                )}
          {recipes && recipes.length > 0 && (
            <View>
              {recipes.map((recipe, index) => (
                <FoodCardComp
                  key={index}
                  source={{ uri: `${BASE_URL}/recipes/${recipe.image}` }}
                  text={recipe.name}
                  onPress={() => NavigateToDetails(recipe._id)}
                />
              ))}
            </View>
          )}
        </View>
            ) : ( 
                <Text style={style.errorText}>{error}</Text> 
      )} 
    </ScrollView>
  )
}

export default ImageScreen