import { View, Text,ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import common from "../../utils/common";
import style from "./style"
const Signin = ({navigation}) => {
  const navigateToLogin=()=>{
    navigation.navigate('Login')
  }
  return (
    <ImageBackground source={require("../../../assets/signup.png")} style={{ flex: 1, width: '100%', height: '100%' }}> 
      <View style={style.signup_container}>
        <Text style={style.eu}>Existing user?</Text>
        <TouchableOpacity onPress={navigateToLogin} style={[common.black_bg,common.raduis,common.button_h,common.button_w,common.center,style.login]}>
          <Text style={common.yellow}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default Signin