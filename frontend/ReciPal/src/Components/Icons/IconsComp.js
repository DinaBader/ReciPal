import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import common from "../../utils/common"
const IconsComp = () => {
  return (
    <View>
        <TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/settings.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>Settings</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/save.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>Saved</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/restaurant.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>Restaurant</Text>
      </View>
      </TouchableOpacity>

    </View>
  )
}

export default IconsComp