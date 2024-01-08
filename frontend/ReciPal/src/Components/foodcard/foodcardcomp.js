import { View, Text,Image } from 'react-native'
import React from 'react'
import styles from "./style.js"
const foodcardcomp = ({source,text}) => {
  return (
    <View style={styles.foodCard}>
      <Image source={source}
      style={{ width: 125, height: 125, borderRadius: 20 }}/>
      <Text style={styles.foodCardText}>{text}</Text>
    </View>
  )
}

export default foodcardcomp