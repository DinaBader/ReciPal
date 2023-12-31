import {View, Text,TextInput,TouchableOpacity,ImageBackground  } from 'react-native';
import React,{useState} from 'react';
import axios from 'axios';
import styles from './styles';
import common from '../utils/common'
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
    const handleSubmit=()=>{
        console.log("Request Payload:", { usernameOrEmail, password });

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
            console.log("Axios Response:", res);
            console.log("LoggedIN");
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
    <ImageBackground source={require('../../assets/login.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.login}>LOGIN</Text>
          <TextInput
          style={[styles.reg_input,common.transparent_inputs]}
          placeholder="Email/Username"
          onChangeText={handleNameChange}
          value={usernameOrEmail}
        />
          <TextInput
          style={[styles.reg_input, common.transparent_inputs,common.black]}
          placeholder="Password "
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
          <Text style={[common.white,common.bold]}>Sign in</Text>
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

