import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from "./style.js"
const FoodCardComp = ({source,text,onPress}) => {
  return (
    <TouchableOpacity style={styles.foodCard} onPress={onPress}>
      <Image source={source}
      style={{ width: 125, height: 125, borderRadius: 20 }}/>
      <Text style={styles.foodCardText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default FoodCardComp