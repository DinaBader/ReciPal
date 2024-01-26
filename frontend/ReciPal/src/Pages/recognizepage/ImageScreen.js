import { View, TouchableOpacity,Text,Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import common from '../../utils/common'
import * as ImagePicker from 'expo-image-picker';
import style from "./style"
import axios from 'axios'
import {BASE_URL} from "@env"
import FoodCardComp from '../../Components/foodcard/FoodCardComp';
import BottomNav from "../../Components/userbottomnav/bottomnavcomp"
import { useTranslation } from 'react-i18next';
import '../../localization/i18n'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageScreen = ({navigation}) => {
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 
  const [tags,setTags] = useState([]);
  const [recipes,setRecipes]=useState([]);
  const [currentLanguage,setLanguage] =useState('en'); 
  const food=[];
  const {t, i18n} = useTranslation(); 

  const changeLanguage = (value) => { 
    i18n 
      .changeLanguage(value) 
      .then(() => {
        setLanguage(value);
      })
      .catch(err => console.error(err)); 
  }; 
  useEffect(() => {
    const retreiveLang=async()=>{
      const lang=await AsyncStorage.getItem("language")||"en";
      changeLanguage(lang)
    }
    retreiveLang()
  }, []);
  const handleSubmit = async () => {  
    try {
        // if (file) {
        //   const formData = new FormData();
        //   formData.append("image", {
        //     uri: file,
        //     name: `recipe_photo.jpg`,
        //     type: "image/jpg",
        //   });
  
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
        setTags(tagsres);
        filter_ingredients(tagsres);
        getRecipes(food)
    } catch (error) {
      if (error.response) {
        console.error("BASE_URL:", BASE_URL);
  
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
  
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    
      console.error("Error config:", error.config);
    }
  };

  const navigatoHome = () =>{
    navigation.navigate('UserPage');
  }

  const navigateAdd = () =>{
    navigation.navigate('ImagePage');
  }

  const navgateProfile = () =>{
    navigation.navigate('UserProfile');
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
            if (!result.canceled && result.assets.length > 0) {
              const selectedImage = result.assets[0];
              setFile(selectedImage.uri);
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
    } catch (error) {
      console.error("Error getting recipes", error.message);
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
    <>
    <ScrollView style={[common.backgroundColor ]}>
    <View style={[common.title]}>
      <Text style={[common.white, common.header]}>{t("SuggestionPage.Suggestion")}</Text>
    </View>

    <TouchableOpacity onPress={pickImage} style={style.button}>
      <Text style={[common.yellow_bg, common.btn, common.bold,style.btn,common.font]}>{t("SuggestionPage.Upload image")}</Text>
    </TouchableOpacity>

    {file ? (
      <>
      <View style={style.imageContainer}>
        <Image source={{ uri: file }} style={style.image} />

        <TouchableOpacity onPress={handleSubmit} style={[style.options,common.yellow_bg,common.button_w,common.button_h,common.raduis,common.center]}>
          <Text style={[common.bold,common.font]}>{t("SuggestionPage.Analyze")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={[style.options,common.yellow_bg,common.button_w,common.button_h,common.raduis,common.center]}>
          <Text style={[common.bold,common.font]}>{t("SuggestionPage.Cancel")}</Text>
        </TouchableOpacity>

        {tags.length > 0 && (
          <View style={style.tagsContainer}>
            <Text style={[common.white, common.bold]}>Found:</Text>
            <View style={[style.tag,common.raduis]}>
              {tags.map((tag, index) => (
                <Text key={index} style={[style.indTag]}>
                  {tag.tag.en}
                </Text>
              ))}
            </View>
          </View>
        )}
        </View>
        {recipes && recipes.length > 0 && (
          <View style={style.foodCard}>
            {recipes.map((recipe, index) => (
              <FoodCardComp
                key={index}
                source={{ uri: `${BASE_URL}/recipes/${recipe.image}` }}
                text={currentLanguage==="en"?recipe.name:recipe.name_ar}
                onPress={() => NavigateToDetails(recipe._id)}
              />
            ))}
          </View>
        )}
      </>
    ) : (
      <Text style={style.errorText}>{error}</Text>
    )}

  </ScrollView>
      <BottomNav onPress1={navigatoHome} onPress2={navigateAdd} onPress3={navgateProfile}
      source1={require("../../../assets/home.png")}
      source2={require("../../../assets/add.png")}
      source3={require("../../../assets/settings-black.png")}
       />
</> 

  )
}

export default ImageScreen