import { View, Text ,Image,TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import common from '../../utils/common';
import style from "./style.js"
const Languages = ({navigation}) => {
  const [checked, setChecked] = React.useState('English');

  const handleRadioButtonChange = async(value) => {
    await AsyncStorage.setItem("language",value)
    setChecked(value);
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
        <Text style={[common.white, common.header]}>Languages</Text>
      </View>
      <Text style={[common.gray,style.title]}>Current Language</Text>
      <View style={[common.title,style.align]}>
       <RadioButton
          value="en"
          status={ checked === 'en' ? 'checked' : 'unchecked' }
          onPress={() => handleRadioButtonChange('en')}
          style={style.radiobutton}
        />
          <Text style={[style.radioButtonText,common.white]}>English</Text>
        <RadioButton
          value="ar"
          status={ checked === 'ar' ? 'checked' : 'unchecked' }
          onPress={() => handleRadioButtonChange('ar')}
        />
        <Text style={[style.radioButtonText,common.white]}>Arabic</Text>
       </View>
    </View>
  )
}

export default Languages