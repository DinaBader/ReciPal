import { StyleSheet, View, Text,TextInput,TouchableOpacity } from 'react-native';
import React,{useState} from 'react';

const Login = () => {
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const handleNameChange=(text)=>{
        setName(text);
    }
    const handlePassowrdChange=(text)=>{
        setPassword(text);
    }
    const handleSubmit=()=>{
    }
  return (
    <View style={styles.container}>
       <Text style={styles.login}>LOGIN</Text>
        <View style={styles.shape}></View>
        <TextInput
        style={styles.reg_input}
        placeholder="Email/Username"
        onChange={handleNameChange}
        value={name}
      />
        <TextInput
        style={styles.reg_input}
        placeholder="Password "
        onChange={handlePassowrdChange}
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
