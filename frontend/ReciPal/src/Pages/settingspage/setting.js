import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style"
import BottomNav from '../../Components/userbottomnav/bottomnavcomp'
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

  const navigatoHome = () =>{
    navigation.navigate('UserPage');
  }

  const navigateAdd = () =>{
    navigation.navigate('ImagePage');
  }

  const navgateProfile = () =>{
    navigation.navigate('UserProfile');
  }


  return (
    <View style={common.backgroundColor}>
      <View style={[common.title]}>
        <TouchableOpacity onPress={navigatoToHome}>
        <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
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
        <Text style={[common.white,style.languages]}>Feedback  </Text>
        <TouchableOpacity onPress={navigateToFeedBack}>
          <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
        </TouchableOpacity>
        </View>
      <BottomNav onPress1={navigatoHome} onPress2={navigateAdd} onPress3={navgateProfile}/>

    </View>
  )
}

export default Setting
