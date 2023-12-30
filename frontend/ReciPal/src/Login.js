import { StyleSheet, View, Text,TextInput,TouchableOpacity,AsyncStorage  } from 'react-native';
import React,{useState} from 'react';
import axios from 'axios';

const Login = () => {
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const handleNameChange=(text)=>{
        setName(text);
    }
    const handlePasswordChange=(text)=>{
        setPassword(text);
    }
    const navigateToMainPage = (role)=>{
        if(role=="2"){
            navigation.navigate('AdminDahsboard');
        }
        else{
            navigation.navigate('UserDashboard');
        }
    }
    const handleSubmit=()=>{
        axios.post(
            "http://127.0.0.1:8000/auth/login",
            {
                name,
                password  
            },
            {
                headers:{
                    "Content-Type":"application/json",
                }
            }
        ).then((res)=>{
            const {token,user}=res.data;
            AsyncStorage.setItem("jwt",res.data.token);
            AsyncStorage.setItem("user",JSON.stringify(res.data.user));
            const role=user.Role;
            navigateToMainPage(role)
        }).catch((error)=>{
            setName("");
            setPassword("");
            console.error("Login failed", error);
            return;
        })
    }
  return (
    <View style={styles.container}>
       <Text style={styles.login}>LOGIN</Text>
        <View style={styles.shape}></View>
        <TextInput
        style={styles.reg_input}
        placeholder="Email/Username"
        onChangeText={handleNameChange}
        value={name}
      />
        <TextInput
        style={styles.reg_input}
        placeholder="Password "
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSubmit}>
         <Text >Submit</Text>
      </TouchableOpacity>


    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBF4D',
    position: 'relative',
  },
  login: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  reg_input:{
    backgroundColor:'#656565',
    width:200,
    height:34,
    borderRadius:50
  },
  shape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    backgroundColor: 'black',
  },
});
