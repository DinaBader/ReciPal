import { View, Text, TextInput,Image, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import common from "../../utils/common"
import style from "./style";


const EditProfile = () => {
  const [username,setUsername]=useState("");
  const _retrieveData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString !== null) {
        const user = JSON.parse(userString);
        if (user && user.username) {
          setUsername(user.username);
        }
      }
  
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };  
  
  useEffect(()=>{
    _retrieveData()
  },[])
  
  const navigateToSettings=()=>{
    
  }
  return (
    <View style={common.backgroundColor}>
      <View style={[common.title]}>
      <TouchableOpacity onPress={navigateToSettings}>
        <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
      </TouchableOpacity>
      <Text style={[common.header,common.white]}>Profile</Text>
      </View>
      <Text style={[common.gray,style.title]}>Username</Text>
      <TextInput
        style={[style.input]}
        placeholder={username}/>
      <Text style={[common.gray,style.title]}>Email</Text>
      <TextInput
        style={[style.input]}/>
    </View>
  )
}

export default EditProfile