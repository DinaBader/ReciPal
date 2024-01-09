import { View, Image } from 'react-native'
import React from 'react'
import style from "./style.js"
const UserProfileComp = ({source}) => {
  return (
    <View>
        <Image source={source}
        style={style.image} />
    </View>
  )
}

export default UserProfileComp