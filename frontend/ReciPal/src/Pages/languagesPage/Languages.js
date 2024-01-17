import { View, Text ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import common from '../../utils/common';
import style from "./style.js"
const Languages = () => {
  return (
    <View style={[common.backgroundColor]}>
      <View style={[common.title]}>
          <TouchableOpacity>
          <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
          </TouchableOpacity>
        <Text style={[common.white, common.header]}>Languages</Text>
      </View>
      <Text style={[common.gray,style.title]}>Username</Text>

    </View>
  )
}

export default Languages