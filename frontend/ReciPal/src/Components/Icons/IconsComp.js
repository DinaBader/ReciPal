import { View, Text,TouchableOpacity,Image } from 'react-native'
import React ,{useState,useEffect}from 'react'
import common from "../../utils/common"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const IconsComp = ({navigation}) => {
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


  const navigateToLogout = async() =>{
    try {
          await AsyncStorage.clear();
        } catch (error) {
          console.error('Error clearing AsyncStorage:', error);
        }
    navigation.navigate('Login')
  }

  const navigateToSettings = () =>{
    navigation.navigate('Settings')
  }

  const 
  navigateToSaved =()=>{
    navigation.navigate('Saved')
  }

  const navigateToAwards =()=>{
    navigation.navigate('Awards');
  } 
  return (
    <View>
        <TouchableOpacity onPress={navigateToSettings}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/settings.png")}
          style={{ width: 35, height: 35 }}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>{t('UserProfilePage.Settings')}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSaved}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/save.png")}
          style={{ width: 35, height: 35 }}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>{t('UserProfilePage.Saved')}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity  onPress={navigateToAwards}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/award.png")}
          style={{ width: 35, height: 35 }}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>{t('UserProfilePage.Awards')}</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToLogout}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/logout.png")}
          style={{ width: 35, height: 35 ,marginLeft:7}}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>{t('UserProfilePage.Logout')}</Text>
      </View>
      </TouchableOpacity>

    </View>
  )
}

export default IconsComp
