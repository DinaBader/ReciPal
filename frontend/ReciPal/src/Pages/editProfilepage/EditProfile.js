import { View, Text, TextInput,Image, TouchableOpacity } from 'react-native';
import React,{useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  axios from 'axios';
import {BASE_URL} from "@env";
import common from "../../utils/common";
import style from "./style";
import Button from "../../Components/button/buttoncomp";

const EditProfile = ({navigation}) => {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [userId, setUserId] = useState(null);

  const handleEmail=(text)=>{
     setEmail(text);
  }

  const handleUsername=(text)=>{
     setUsername(text);
  }

  const _retrieveData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString !== null) {
        const user = JSON.parse(userString);
        const retrievedUserId = user._id;
        setUserId(retrievedUserId);
        if (user && user.username) {
          setUsername(user.username);
        }
      }
  
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };  
  
  useEffect(()=>{
    _retrieveData();
  },[])

  const handleSubmit = ()=>{
       axios.post(`${BASE_URL}/reward/editProfile/${userId}`,
       {
        username,
        email
       }).then((res)=>{
        console.log("changed",res.data); 
       }).catch((error)=>{
        console.log("error",error);
       })
    }

  
  const navigateToSettings=()=>{
    navigation.goBack();
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
        value={username}
        onChangeText={handleUsername}
        />
      <Text style={[common.gray,style.title]}>Email</Text>
      <TextInput
        style={[style.input]} 
        value={email}
        onChangeText={handleEmail}
        />
      <TouchableOpacity style={[common.yellow_bg,style.button,common.raduis,common.center]} onPress={handleSubmit}>
        <Text style={[common.bold]}>Submit</Text>
        </TouchableOpacity>
    </View>
  )
}

export default EditProfile