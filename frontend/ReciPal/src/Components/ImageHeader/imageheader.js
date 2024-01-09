import { View, Image,Text } from 'react-native'
import React from 'react'
import styles from "./style"
const imageheader = ({source,text}) => {
  return (
    <View>
        <Image source={source}
        style={{ width: 380, height: 300,resizeMode:'cover' }}/>
        <Text style={styles.overlayText}>{text}</Text>
    </View>
  )
}

export default imageheader