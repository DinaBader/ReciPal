import { View, Text,ImageBackground,TouchableOpacity} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React,{useState} from 'react'
import common from "../../utils/common";
import style from "./style"
import Input from "../../Components/Inputs/input"
import Button from "../../Components/button/buttoncomp"
import axios from 'axios';

const Signin = ({navigation}) => {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const navigateToLogin=()=>{
    navigation.navigate('Login')
  }
  const handleusernameChange=(text)=>{
    setUsername(text);
  }
  const handleemailChange=(text)=>{
    setEmail(text);
  }
  const handlePasswordChange=(text)=>{
    setPassword(text);
  }
  const handleSubmit=()=>{
    axios.post(
      "http://192.168.0.100:8000/auth/register",
      {
        username,
        email,
        password
      },{
        headers:{
          "Content-Type":"application/json"
        }
      }
    ).then((res)=>{
      console.log("Signed in");
      navigator.navigate('UserPage')
    }).catch((error)=>{
      console.log("Error: ",error);
    })
  }
  return (
    <ImageBackground source={require("../../../assets/signup.png")} style={{ flex: 1, width: '100%', height: '100%' }}>
      <KeyboardAwareScrollView contentContainerStyle={style.container}>
        <View style={style.signup_container}>
          <Text style={style.eu}>Existing user?</Text>
          <TouchableOpacity onPress={navigateToLogin} style={[common.black_bg, common.raduis, common.button_h, common.button_w, common.center, style.login]}>
            <Text style={common.yellow}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={[common.yellow, style.signup, common.bold]}>Sign up with</Text>
          <Text style={[common.yellow, style.logoname, common.bold]}>ReciPal</Text>
          <Input label="username" placeholder='Username' value={username} onChangeText={handleusernameChange} />
          <Input label="Email" placeholder='Email' value={email} onChangeText={handleemailChange} />
          <Input label="Password" placeholder='Password' value={password} onChangeText={handlePasswordChange} secureTextEntry />
          <Button text="Sign Up" onPress={handleSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

export default Signin