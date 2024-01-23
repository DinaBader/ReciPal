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
    <TouchableOpacity onPress={navigateToLogout}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/logout.png")}
          style={{ width: 35, height: 35 ,marginLeft:7}}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>Logout</Text>
      </View>
      </TouchableOpacity>

    </View>
        <AdminNav onPress1={navigatoHome} onPress2={navigateAddrecipes} onPress3={navigateFeedback} onPress4={navigateToStats} onPress5={navigateToProfile}
        source1={require("../../../assets/home.png")}
        source2={require("../../../assets/add.png")}
        source3={require("../../../assets/chat.png")}
        source4={require("../../../assets/stats.png")}
        source5={require("../../../assets/user.png")}/>
    </>
  
  )
}

export default Adminprofile