import { View, Text } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import {BASE_URL} from "@env"
const Userfeedback = () => {
  return (
    <View style={[common.backgroundColor]}>
      <Text style={[common.header,common.white]}>User Feedback</Text>

    </View>
  )
}

export default Userfeedback