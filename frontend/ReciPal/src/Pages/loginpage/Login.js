import {View, Text,TextInput,TouchableOpacity,ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState} from 'react';
import axios from 'axios';
import styles from './styles';
import common from '../../utils/common'
import Button from "../../Components/button/buttoncomp"
const Login = ({navigation}) => {
    const [usernameOrEmail,setName]=useState('');
    const [password,setPassword]=useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNameChange=(text)=>{
        setName(text);
        setErrorMessage('');
    }
    const handlePasswordChange=(text)=>{
        setPassword(text);
        setErrorMessage('');
    }
    const redirectToSignUp=()=>{
      navigation.navigate('SignupPage');
    }

    const _retrieveData = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString !== null) {
          const user = JSON.parse(userString);
          if (user && user.role === 2) {
            navigation.navigate('UserPage');
          } else {
            navigation.navigate("AdminPage");
          }
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    const handleSubmit=()=>{
        axios.post(
            "http://192.168.0.100:8000/auth/login",
            {
              "usernameOrEmail": usernameOrEmail,
              "password": password
            },
            {
                headers:{
                    "Content-Type":"application/json",
                }
            }
        ).then((res)=>{
            console.log("LoggedIN");
            _storeData=async()=>{
              try{
                await AsyncStorage.setItem("jwt",res.data.token);
                await AsyncStorage.setItem("user",JSON.stringify(res.data.user))
                _retrieveData();
              }catch(error){
                console.error("Error storing token:", error);
              }
            }
            _storeData(); 
            _retrieveData();            
        }).catch((error)=>{
            setName("");
            setPassword("");
            console.error("Login failed wrong credentials", error);
            if (error.response && error.response.data && error.response.data.message) {
              setErrorMessage("Incorrect inputs");
          } else {
              setErrorMessage("Incorrect inputs");
          }
          setTimeout(() => {
            setErrorMessage('');
        }, 3000);
        })
    }
  
  return (
    <ImageBackground source={require('../../../assets/login.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.login}>LOGIN</Text>
          <TextInput
          style={[styles.reg_input]}
          placeholder="Email/Username"
          onChangeText={handleNameChange}
          value={usernameOrEmail}
          autoCapitalize="none" 
        />
          <TextInput
          style={[styles.reg_input, common.black]}
          placeholder="Password "
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry
          autoCapitalize="none" 
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
          <Text style={[common.yellow,common.bold]}>Log in</Text>
        </TouchableOpacity>
        {errorMessage ? (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <Text style={[styles.or,common.bold]}>OR</Text>
        <TouchableOpacity onPress={redirectToSignUp} style={[styles.signup,common.yellow_bg]}>
          <Text style={[common.black,common.bold]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;

