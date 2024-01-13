import { View, Text, TextInput } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style";

const EditProfile = () => {
  return (
    <View style={common.backgroundColor}>
      <Text style={[common.header,common.white]}>Profile</Text>
      <Text style={[common.gray,style.title]}>Username</Text>
      <TextInput
        style={[style.input]}/>
    </View>
  )
}

export default EditProfile