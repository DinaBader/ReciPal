import { Image, Text, ScrollView, TouchableOpacity ,View} from 'react-native'
import React, { useEffect, useState } from 'react'
import common from "../../utils/common"
import style from "./style.js"
import ProfileComp from "../../Components/UserProfile/UserProfileComp.js"
import Icons from "../../Components/Icons/IconsComp.js"
const UserProfile = ({navigation}) => {
  const [image,setImage]=useState('');
  const getImage=()=>{
     
  }
  useEffect(()=>{
     getImage();
  },[])
  return (
    <ScrollView style={common.backgroundColor}>
        <ProfileComp source={require("../../../assets/default.jpg")} />
        <Icons navigation={navigation}/>
    </ScrollView>
  )
}

export default UserProfile