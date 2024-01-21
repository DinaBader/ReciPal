import { View, Image } from 'react-native'
import React from 'react'
import common from '../../utils/common'
import style from "./style"
const bottomnavcomp = () => {
  return (
    <View style={[common.yellow_bg,common.button_h,style.container]}>
      <Image
      source={require("../../../assets/home.png")}
      style={[style.navIcons,style.home]}
      />
      <Image
      source={require("../../../assets/add.png")}
      style={style.navIcons}
      />
      <Image
      source={require("../../../assets/settings-black.png")}
      style={style.navIcons}
      />
    </View>
  )
}

export default bottomnavcomp