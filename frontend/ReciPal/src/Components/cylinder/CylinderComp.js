import { View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import style from "./style"
const CylinderComp = () => {
  return (
    <View style={style.absoluteContainer}>
      <TouchableOpacity style={style.cylinder}>
        <Image source={require("../../../assets/new-moon.png")}
        style={{width:60,height:60,marginLeft:5,marginTop:10}}/> 
      </TouchableOpacity>
    </View>
  )
}

export default CylinderComp