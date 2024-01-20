import { View, TouchableOpacity,Text } from 'react-native'
import React from 'react'
import common from '../../utils/common'

const ImageScreen = () => {

  return (
    <View style={[common.backgroundColor]}>
      <TouchableOpacity>
        <Text>Upload image</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ImageScreen