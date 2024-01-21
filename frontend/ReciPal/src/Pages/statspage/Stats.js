import { View, Text } from 'react-native'
import React from 'react'
import common from '../../utils/common'
const Stats = () => {
  return (
    <View style={common.backgroundColor}> 
      <Text style={[common.header,common.white]}>Statistics</Text>
    </View>
  )
}

export default Stats