import { View, Image } from 'react-native'
import React from 'react'
import common from '../../utils/common'
import style from "./style"
import { TouchableOpacity } from 'react-native-gesture-handler'
const bottomnavcomp = ({onPress1,onPress2,onPress3,source1,source2,source3}) => {

  return (
    <View style={[common.yellow_bg,style.container]}>
      <TouchableOpacity onPress={onPress1}> 
        <Image
        source={source1}
        style={[style.navIcons,style.home]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress2}>
        <Image
        source={source2}
        style={style.navIcons}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress3}>
        <Image
        source={source3}
        style={style.navIcons}
        />
      </TouchableOpacity>
    </View>
  )
}

export default bottomnavcomp