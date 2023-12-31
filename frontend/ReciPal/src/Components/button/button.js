import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import style from './buttonstyle'
const button = ({text}) => {
  return (
    <View>
      <TouchableOpacity style={style.button}>
          <Text>{text}</Text>
    </TouchableOpacity>
    </View>
  )
}

export default button