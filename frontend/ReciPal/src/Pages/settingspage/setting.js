import { View, Text,Image } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style"
const Setting = () => {
  return (
    <View style={common.backgroundColor}>
      <Text style={[common.white, style.settingsTitle]}>Settings</Text>
      <View style={style.next}>
        <Text style={[common.white,style.editProfile]}>Edit  Profile</Text>
        <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
      </View>
      <Text style={[common.white,style.languages]}>Languages</Text>
      <Text style={[common.white,style.languages]}>FeedBack</Text>
    </View>
  )
}

export default Setting
