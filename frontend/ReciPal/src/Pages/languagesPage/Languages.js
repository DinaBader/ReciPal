import { View, Text ,Image,TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useEffect,useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import common from '../../utils/common';
import style from "./style.js"
import { useTranslation } from 'react-i18next';

const Languages = ({navigation}) => {
  const [checked, setChecked] = React.useState('en');
  const [currentLanguage,setLanguage] =useState('en'); 

  const {t, i18n} = useTranslation(); 

  const changeLanguage = (value) => { 
    i18n 
      .changeLanguage(value) 
      .then(() => {
        setLanguage(value);
      })
      .catch(err => console.log(err)); 
  };   
  
  useEffect(() => {
    const retreiveLang=async()=>{
      const lang=await AsyncStorage.getItem("language");
      setChecked(lang);
      changeLanguage(lang)
    }
    retreiveLang()
  }, []);

  const handleRadioButtonChange = async(value) => {
    await AsyncStorage.setItem("language",value)
    setChecked(value);
    navigation.reset({
      index: 0,
      routes: [{ name: 'UserPage' }],
    });
  };
  const navigateBack=()=>{
    navigation.goBack()
  }


  return (
    <View style={[common.backgroundColor]}>
      <View style={[common.title]}>
          <TouchableOpacity onPress={navigateBack}>
          <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
          </TouchableOpacity>
        <Text style={[common.white, common.header]}>{t('LanguagesPage.Languages')}</Text>
      </View>
      <Text style={[currentLanguage==="en"?[common.gray,style.title]:[common.gray,style.arabic]]}>{t('LanguagesPage.Current Language')}</Text>
      <View style={[common.title,style.align]}>
       <RadioButton
          value="en"
          status={ checked === 'en' ? 'checked' : 'unchecked' }
          onPress={() => handleRadioButtonChange('en')}
          style={style.radiobutton}
        />
          <Text style={[style.radioButtonText,common.white]}>{t('LanguagesPage.English')}</Text>
        <RadioButton
          value="ar"
          status={ checked === 'ar' ? 'checked' : 'unchecked' }
          onPress={() => handleRadioButtonChange('ar')}
        />
        <Text style={[style.radioButtonText,common.white]}>{t('LanguagesPage.Arabic')}</Text>
       </View>
    </View>
  )
}

export default Languages