import { View, Text } from 'react-native'
import { PieChart } from "react-native-gifted-charts";
import React, { useEffect, useState } from 'react'
import common from '../../utils/common'
import AdminNav  from '../../Components/adminnav/AdminNavComp'
import axios from 'axios'
import {BASE_URL} from '@env'
import styles from './style'
import style from './style';
const Stats = ({navigation}) => {
  const [numberOfUsers,setnumberOfUsers]=useState(0)
  const [numberOfRecipe,setnumberOfRecipe]=useState(0)
  const [numberOfSavedRecipe,setnumberOfSavedRecipe]=useState(0)

  const getuser=()=>{
    axios.get(`${BASE_URL}/stats/numberOfUsers`,
    ).then((res)=>{
      setnumberOfUsers(res.data.numofUsers);
    }).catch((error)=>{
      console.error("Error getting number of users",error);
    })
  }
  const getRecipes=()=>{
    axios.get(`${BASE_URL}/stats/numberOfRecipes`,
    ).then((res)=>{
      setnumberOfRecipe(res.data.numofRecipes);
    }).catch((error)=>{
      console.error("Error getting number of recipes",error);
    })
  }
  const getSavedRecipes=()=>{
    axios.get(`${BASE_URL}/stats/totalSavedRecipes`,
    ).then((res)=>{
      setnumberOfSavedRecipe(res.data.totalSavedRecipes);
    }).catch((error)=>{
      console.error("Error getting number of saved recipes",error.message);
    })
  }

  useEffect(()=>{
    getuser();
    getRecipes();
    getSavedRecipes()
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
        {value: numberOfRecipe, color: '#79D2DE', text: numberOfRecipe},
        {value: numberOfSavedRecipe, color: '#ED6665', text: numberOfSavedRecipe},
    ];
        
  return (
    <>
    <View style={common.backgroundColor}> 
      <Text style={[common.header,common.white]}>Statistics</Text>
      <View style={styles.align}>
        <View style={[styles.circle,{backgroundColor:'#177AD5'}]} />
        <Text style={common.white}>Number of users</Text>
      </View>
      <View style={styles.align}>
        <View style={[styles.circle,{backgroundColor:'#79D2DE'}]} />
        <Text style={common.white}>Number of Recipes</Text>
      </View>
      <View style={styles.align}>
        <View style={[styles.circle,{backgroundColor:'#ED6665'}]} />
        <Text style={common.white}>Number of Saved Recipes</Text>
      </View>
      <PieChart
            showText
            textColor="black"
            radius={150}
            textSize={20}
            data={pieData}
            style={styles.piechart}
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