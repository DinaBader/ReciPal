import { View, TouchableOpacity,Text } from 'react-native'
import React from 'react'
import common from '../../utils/common'
import style from "./style"
const ImageScreen = () => {

  return (
    <View style={[common.backgroundColor]}>
      <View style={[common.title]}>
          <Text style={[common.white,common.header]}>Suggestion</Text>
      </View>
      <TouchableOpacity>
        <Text style={[common.yellow_bg,common.button_w,style.btn,common.bold]}>Upload image</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ImageScreen