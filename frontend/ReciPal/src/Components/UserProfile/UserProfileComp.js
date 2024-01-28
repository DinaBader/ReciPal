import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import style from "./style.js";
import common from "../../utils/common.js";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {BASE_URL} from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const UserProfileComp = ({ source, onUpdateImage }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [currentLanguage,setLanguage] =useState('en');
  const {t, i18n} = useTranslation(); 

  const changeLanguage = (value) => { 
    i18n 
      .changeLanguage(value) 
      .then(() => {
        setLanguage(value);
      })
      .catch(err => console.erro(err)); 
  }; 
  useEffect(() => {
    const retreiveLang=async()=>{
      const lang=await AsyncStorage.getItem("language");
      changeLanguage(lang)
    }
    retreiveLang()
  }, []);


  const handleSubmit = async () => {
    try {
      const Token = await AsyncStorage.getItem("jwt");
      const user = await AsyncStorage.getItem("user");
      const userId = user._id;

      if (file && BASE_URL) {

        const formData = new FormData();
        formData.append("image", {
          uri: file,
          name: `profile_photo_${userId}.jpg`,
          type: "image/jpg",
        });

        const photoResponse = await axios.post(
          `${BASE_URL}/reward/update_image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `Bearer ${Token}`
            },
          }
        );
      }

      onUpdateImage(file);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setError(null);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
         roll permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setFile(selectedImage.uri);
        setError(null);
      }
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {!file ? (
        <Image source={source} style={style.image} />
      ) : (
        <View style={style.imageContainer}>
          <Image source={{ uri: file }} style={style.image} />
        </View>
      )}

      <TouchableOpacity style={[style.editProfile]} onPress={pickImage}>
        <Text style={[common.white, style.ChangeProfile, common.bold]}>{t("UserProfilePage.Edit picture")}</Text>
      </TouchableOpacity>

      {file && (
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={handleSubmit} style={[common.yellow_bg, common.button_h, common.raduis, style.editProfile]}>
            <Text style={[common.white, style.button, common.bold]}>{t("UserProfilePage.Submit")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={[common.yellow_bg, common.button_h, common.raduis, style.editProfile]}>
            <Text style={[common.white, style.button, common.bold]}>{t("UserProfilePage.Cancel")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default UserProfileComp;
