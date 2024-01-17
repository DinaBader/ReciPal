import { View, Text, ScrollView,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import AwardsComp from '../../Components/awards/awards'
const Awards = ({navigation}) => {
  const navigateBack=()=>{
    navigation.goBack();
  }
  return (
    <ScrollView style={[common.backgroundColor]}>
      <View style={[common.title]}>
        <TouchableOpacity onPress={navigateBack}> 
          <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
        </TouchableOpacity>
        <Text style={[common.header,common.white]}>Awards</Text>
      </View>
      <AwardsComp/>
    </ScrollView>
  )
}

export default Awards