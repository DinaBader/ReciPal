import { View, Text } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import style from "./style"
const FeedBack = () => {
  return (
    <View style={common.backgroundColor}>
      <Text style={[common.white,common.header]}>FeedBack</Text>
      <Text style={[common.white,style.title]}>Share your FeedBack</Text>
      <Text style={[common.white,style.text]}>Thank you for using ReciPal {"\n"} Please give us your feedback.</Text>
    </View>
  )
}

export default FeedBack