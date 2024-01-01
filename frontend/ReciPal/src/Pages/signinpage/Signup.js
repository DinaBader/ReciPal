import { View, Text,ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import common from "../../utils/common";
import style from "./style"
import Input from "../../Components/Inputs/input"
import Button from "../../Components/button/buttoncomp"
const Signin = ({navigation}) => {
  const navigateToLogin=()=>{
    navigation.navigate('Login')
  }
  const handleSubmit=()=>{

  }
  return (
    <ImageBackground source={require("../../../assets/signup.png")} style={{ flex: 1, width: '100%', height: '100%' }}> 
      <View style={style.signup_container}>
        <Text style={style.eu}>Existing user?</Text>
        <TouchableOpacity onPress={navigateToLogin} style={[common.black_bg,common.raduis,common.button_h,common.button_w,common.center,style.login]}>
          <Text style={common.yellow}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={[common.yellow,style.signup,common.bold]}>Sign up with</Text>
        <Text style={[common.yellow,style.logoname,common.bold]}>ReciPal</Text>
        <Input label="username" placeholder='Username'/>
        <Input label="Email" placeholder='Email'/>
        <Input label="Password" placeholder='Password' secureTextEntry/>
        <Button text="signUp" onPress={handleSubmit}/>
      </View>

    </ImageBackground>
  )
}

export default Signin