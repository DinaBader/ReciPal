import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from "./style"
const CylinderComp = () => {
  return (
    <View style={style.absoluteContainer}>
      <TouchableOpacity style={style.cylinder}>
      </TouchableOpacity>
    </View>
  )
}

export default CylinderComp