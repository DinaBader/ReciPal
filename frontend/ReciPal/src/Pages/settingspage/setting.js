import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style"
const Setting = () => {
  return (
    <View style={common.backgroundColor}>
      <Text style={[common.white, style.settingsTitle]}>Settings</Text>

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
