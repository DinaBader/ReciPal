import { View, Image,Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from "./style"
import common from "../../utils/common"
const CylinderComp = ({text}) => {
  const words = text?text.split(' '):[];

  const formattedText = words.join('\n');

  return (
    <View style={style.absoluteContainer}>
      <TouchableOpacity style={style.cylinder}>
        <Image source={require("../../../assets/new-moon.png")}
        style={{width:50,height:50,marginLeft:8,marginTop:10}}/> 
        <Text style={[style.text,common.bold]}>{formattedText}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CylinderComp