import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import common from "../../utils/common"
const Awards = () => {
  return (
    <ScrollView style={[common.backgroundColor]}>
        <Text style={[common.white,common.header]}>Awards</Text>
    </ScrollView>
  )
}

export default Awards