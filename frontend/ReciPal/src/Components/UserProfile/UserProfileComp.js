import { View, Image,TouchableOpacity,Text } from 'react-native'
import React from 'react'
import style from "./style.js"
import common from "../../utils/common.js"
const UserProfileComp = ({source}) => {
  return (
    <View>
        <Image source={source}
        style={style.image} />
        <TouchableOpacity>
        <Text style={[common.white,style.ChangeProfile]}>Change Profile</Text>
        </TouchableOpacity>

    </View>
  )
}

export default UserProfileComp