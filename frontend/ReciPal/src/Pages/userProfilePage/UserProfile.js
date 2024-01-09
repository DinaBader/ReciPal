import { Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style.js"
import ProfileComp from "../../Components/UserProfile/UserProfileComp.js"
const UserProfile = () => {
  return (
    <ScrollView style={common.backgroundColor}>
        <ProfileComp source={require("../../../assets/default.jpg")} />
    </ScrollView>
  )
}

export default UserProfile