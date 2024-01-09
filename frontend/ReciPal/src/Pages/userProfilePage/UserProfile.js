import { Image, Text, ScrollView } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style.js"
const UserProfile = () => {
  return (
    <ScrollView style={common.backgroundColor}>
      <Image source={require("../../../assets/default.jpg")}
        style={style.image} />
    </ScrollView>
  )
}

export default UserProfile