import { View, Image } from 'react-native'
import React from 'react'
import common from '../../utils/common'
import style from "./style"
import { TouchableOpacity } from 'react-native-gesture-handler'
const bottomnavcomp = ({onPress1,onPress2,onPress3}) => {

  return (
    <View style={[common.yellow_bg,style.container]}>
      <TouchableOpacity onPress={onPress1}> 
        <Image
        source={require("../../../assets/home.png")}
        style={[style.navIcons,style.home]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress2}>
        <Image
        source={require("../../../assets/add.png")}
        style={style.navIcons}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress3}>
        <Image
        source={require("../../../assets/settings-black.png")}
        style={style.navIcons}
        />
      </TouchableOpacity>
    </View>
  )
}

export default bottomnavcomp