import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style"
const Setting = ({navigation}) => {

  const navigateToEditProfile = () =>{
    navigation.navigate('EditProfile');
  }

  const navigateToLanguages = () =>{
    navigation.navigate('Languages');
  }

  const navigateToFeedBack = () =>{
    navigation.navigate('FeedBack');
  }

  const navigatoToHome=()=>{
    navigation.goBack();
  }

  return (
    <View style={common.backgroundColor}>
      <View style={style.title}>
        <TouchableOpacity onPress={navigatoToHome}>
          <Image source={require("../../../assets/back.png")} style={{width:40,height:40,marginLeft:40,marginTop:20}}/>
        </TouchableOpacity>
      <Text style={[common.white, common.header]}>Settings</Text>
      </View>
        <View style={style.next}>
          <Text style={[common.white,style.editProfile]}>Edit  Profile</Text>
          <TouchableOpacity onPress={navigateToEditProfile}>
           <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
          </TouchableOpacity>
        </View>

        <View style={style.next}>
        <Text style={[common.white,style.languages]}>Languages</Text>
        <TouchableOpacity onPress={navigateToLanguages}>
          <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
        </TouchableOpacity>
        </View>

        <View style={style.next}>
        <Text style={[common.white,style.languages]}>FeedBack  </Text>
        <TouchableOpacity onPress={navigateToFeedBack}>
          <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
        </TouchableOpacity>
        </View>


    </View>
  )
}

export default Setting
