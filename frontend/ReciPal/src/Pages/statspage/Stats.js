import { View, Text } from 'react-native'
import { PieChart } from "react-native-gifted-charts";
import React, { useEffect, useState } from 'react'
import common from '../../utils/common'
import AdminNav  from '../../Components/adminnav/AdminNavComp'
import axios from 'axios'
import {BASE_URL} from '@env'
const Stats = ({navigation}) => {
  const [numberOfUsers,setnumberOfUsers]=useState(0)
  const getuser=()=>{
    axios.get(`${BASE_URL}/stats/numberOfUsers`,
    ).then((res)=>{
      setnumberOfUsers(res.data.numofUsers);
    }).catch((error)=>{
      console.error("Error getting number of users",error);
    })
  }

  useEffect(()=>{
    getuser()
  },[])

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
      const pieData = [
        {value: numberOfUsers, color: '#177AD5',text:numberOfUsers},
        {value: 40, color: '#79D2DE', text: '30%'},
        {value: 20, color: '#ED6665', text: '26%'},
    ];
        
  return (
    <>
    <View style={common.backgroundColor}> 
      <Text style={[common.header,common.white]}>Statistics</Text>
      <PieChart
            showText
            textColor="black"
            radius={150}
            textSize={20}
            showTextBackground
            textBackgroundRadius={26}
            data={pieData}
            />
    </View>
    <AdminNav onPress1={navigatoHome} onPress2={navigateAddrecipes} onPress3={navigateFeedback} onPress4={navigateToStats}
     source1={require("../../../assets/home.png")}
     source2={require("../../../assets/add.png")}
     source3={require("../../../assets/chat.png")}
     source4={require("../../../assets/stats.png")}
     source5={require("../../../assets/user.png")}

     />
    </>
  )
}

export default Stats