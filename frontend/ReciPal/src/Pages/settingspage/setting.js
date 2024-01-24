import { View, Text,Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import common from "../../utils/common"
import style from "./style"
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({navigation}) => {
  const [currentLanguage,setLanguage] =useState('en'); 

  const {t, i18n} = useTranslation(); 

  const changeLanguage = (value) => { 
    i18n 
      .changeLanguage(value) 
      .then(() => {
        console.log('Language set to:', value)
        setLanguage(value);
      })
      .catch(err => console.log(err)); 
  };   
  
  useEffect(() => {
    const retreiveLang=async()=>{
      const lang=await AsyncStorage.getItem("language");
      changeLanguage(lang)
      // console.log(currentLanguage)
    }
    retreiveLang()
  }, []);


  const navigateToEditProfile = () =>{
    navigation.navigate('EditProfile');
  }

  const navigateToLanguages = () =>{
    navigation.navigate('Languages');
  }

  const navigateToFeedBack = () =>{
    navigation.navigate('FeedBack');
  }

  const navigatoToHome=()=>{
    navigation.goBack();
  }

  return (
    <View style={common.backgroundColor}>
      <View style={[common.title]}>
        <TouchableOpacity onPress={navigatoToHome}>
        <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
        </TouchableOpacity>
      <Text style={[common.white, common.header]}>{t('SettingsPage.Settings')}</Text>
      </View>
        <View style={style.next}>
          <Text style={[common.white,style.editProfile]}>{t('SettingsPage.Edit Profile')}</Text>
          <TouchableOpacity onPress={navigateToEditProfile}>
           <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
          </TouchableOpacity>
        </View>

        <View style={style.next}>
        <Text style={[common.white,style.languages]}>{t('SettingsPage.Languages')}</Text>
        <TouchableOpacity onPress={navigateToLanguages}>
          <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
        </TouchableOpacity>
        </View>

        <View style={style.next}>
        <Text style={[common.white,style.languages]}>{t('SettingsPage.Feedback')}  </Text>
        <TouchableOpacity onPress={navigateToFeedBack}>
          <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
        </TouchableOpacity>
        </View>

    </View>
  )
}

export default Setting
