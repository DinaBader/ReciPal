import { View, Text,Image,TouchableOpacity, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import common from '../../utils/common'
import BottomNav from '../../Components/userbottomnav/bottomnavcomp'
const Admin = ({navigation}) => {

  const navigatoHome=()=>{
    navigation.navigate('AdminPage');
  } 
  const navigateAddrecipes=()=>{
    navigation.navigate('AddRecipePage');
  }
  const navigateFeedback=()=>{
    navigation.navigate('UserFeedbackPage')
  }

  return (
   <View style={common.backgroundColor}> 
   <Text style={[common.header,common.white]}>Admin Panel</Text>
    <BottomNav onPress1={navigatoHome} onPress2={navigateAddrecipes} onPress3={navigateFeedback}
     source1={require("../../../assets/home.png")}
     source2={require("../../../assets/add.png")}
     source3={require("../../../assets/chat.png")}
     />

   </View>
  )
}

export default Admin