import { StyleSheet, View, Text,TextInput,TouchableOpacity,ImageBackground  } from 'react-native';
import React,{useState} from 'react';
import axios from 'axios';

const Login = () => {
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
            const {token,user}=res.data;
            console.log("LoggedIN");
        }).catch((error)=>{
            setName("");
            setPassword("");
            console.error("Login failed wrong credentials", error);
            if (error.response && error.response.data && error.response.data.message) {
              setErrorMessage(error.response.data.message);
          } else {
              setErrorMessage("Incorrect inputs");
          }
          setTimeout(() => {
            setErrorMessage('');
        }, 3000);
        })
    }
  return (
    <ImageBackground source={require('../assets/login.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
    <View style={styles.container}>
       <Text style={styles.login}>LOGIN</Text>
        <View style={styles.shape}></View>
        <TextInput
        style={styles.reg_input}
        placeholder="Email/Username"
        onChangeText={handleNameChange}
        value={usernameOrEmail}
      />
        <TextInput
        style={styles.reg_input}
        placeholder="Password "
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
         <Text style={{ color: '#FFFFFF' }}>Sign in</Text>
      </TouchableOpacity>
      {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

    </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    position: 'relative',
    gap:20
  },
  login: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingLeft:40,
    paddingTop:50,
  },
  reg_input: {
    backgroundColor: 'rgba(101, 101, 101, 0.2)',
    width: 200,
    height: 34,
    borderRadius: 50,
    marginLeft: 35,
    color: '#000', 
    paddingLeft:20
},
  shape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
  },
  submit:{
    backgroundColor:"black",
    width:200,
    marginLeft:35,
    height:30,
    borderRadius:50,
    justifyContent:"center",
    alignItems:"center",
    fontWeight:"bold"
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});
