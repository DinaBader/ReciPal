import { View, Text } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style"
const FeedBack = () => {
  return (
    <View style={common.backgroundColor}>
      <Text style={[common.white,common.header]}>FeedBack</Text>
    </View>
  )
}

export default FeedBack