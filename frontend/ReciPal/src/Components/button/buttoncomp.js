import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import style from './buttonstyle'
import common from "../../utils/common"
const buttoncomp = ({text,onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={[style.button,common.yellow_bg]}>
          <Text style={common.bold}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default buttoncomp