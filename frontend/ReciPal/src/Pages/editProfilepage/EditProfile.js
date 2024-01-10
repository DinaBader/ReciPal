import { View, Text } from 'react-native'
import React from 'react'
import common from "../../utils/common"

const EditProfile = () => {
  return (
    <View style={common.backgroundColor}>
      <Text style={[common.header,common.white]}>Profile</Text>
    </View>
  )
}

export default EditProfile