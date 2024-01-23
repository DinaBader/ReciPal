import { View, Text } from 'react-native'
import { BarChart } from "react-native-gifted-charts";
import React from 'react'
import common from '../../utils/common'
import AdminNav  from '../../Components/adminnav/AdminNavComp'
const Stats = ({navigation}) => {
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
    const barData = [
        {value: 230,label: 'Jan',frontColor: '#4ABFF4'},
        {value: 180,label: 'Feb',frontColor: '#79C3DB'},
        {value: 195,label: 'Mar',frontColor: '#28B2B3'},
        {value: 250,label: 'Apr',frontColor: '#4ADDBA'},
        {value: 320,label: 'May',frontColor: '#91E3E3'},
        ];
        
  return (
    <>
    <View style={common.backgroundColor}> 
      <Text style={[common.header,common.white]}>Statistics</Text>
      <BarChart
            showFractionalValue
            showYAxisIndices
            noOfSections={4}
            maxValue={400}
            data={barData}
            isAnimated
            />
    </View>
    <AdminNav onPress1={navigatoHome} onPress2={navigateAddrecipes} onPress3={navigateFeedback} onPress4={navigateToStats}
     source1={require("../../../assets/home.png")}
     source2={require("../../../assets/add.png")}
     source3={require("../../../assets/chat.png")}
     source4={require("../../../assets/stats.png")}
     />
    </>
  )
}

export default Stats