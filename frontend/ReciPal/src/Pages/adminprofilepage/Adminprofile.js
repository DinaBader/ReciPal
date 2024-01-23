import { View, Text,Image } from 'react-native'
import React from 'react'
import AdminNav from '../../Components/adminnav/AdminNavComp'
import common from '../../utils/common'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Adminprofile = ({navigation}) => {
    const navigatoHome=()=>{
        navigation.navigate('AdminPage');
      }     
    const navigateAddrecipes=()=>{
        navigation.navigate('AddRecipePage');
      }
      const navigateFeedback=()=>{
        navigation.navigate('UserFeedbackPage')
      }
      const navigateToStats=()=>{
        navigation.navigate('StatsPage');
      }
      const navigateToProfile=()=>{
        navigation.navigate('AdminProfilePage');
      }
      const navigateToLogout=()=>{
        AsyncStorage.clear();
        navigation.navigate('Login');
      }
  return (
    <>
    <View style={common.backgroundColor}>
    <Text style={[common.header,common.white]}>Profile</Text>

    </View>
    </>
  
  )
}

export default Adminprofile