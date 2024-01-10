import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style"
import { TouchableOpacity } from 'react-native-gesture-handler'
const Setting = () => {
  return (
    <View style={common.backgroundColor}>
      <Text style={[common.white, style.settingsTitle]}>Settings</Text>

      <TouchableOpacity>
        <View style={style.next}>
          <Text style={[common.white,style.editProfile]}>Edit  Profile</Text>
          <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={style.next}>
        <Text style={[common.white,style.languages]}>Languages</Text>
        <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={style.next}>
        <Text style={[common.white,style.languages]}>FeedBack  </Text>
        <Image source={require("../../../assets/right.png")} style={style.backIcon}/>
        </View>
      </TouchableOpacity>


    </View>
  )
}

export default Setting
