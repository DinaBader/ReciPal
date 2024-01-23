import { View, Text } from 'react-native'
import React from 'react'
import AdminNav from '../../Components/adminnav/AdminNavComp'
import common from '../../utils/common'
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
  return (
    <>
    <View style={common.backgroundColor}>
    <Text style={[common.header,common.white]}>Profile</Text>
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