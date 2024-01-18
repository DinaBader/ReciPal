import { View, Text, ScrollView,TouchableOpacity,Image } from 'react-native'
import React,{ useEffect, useState } from 'react'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from "@env"
import common from "../../utils/common"
import AwardsComp from '../../Components/awards/awards'
const Awards = ({navigation}) => {
  const [rewards,setRewards]=useState([]);
  const [userId, setUserId] = useState(null);
  const [token,setToken]=useState('');
  const _retrieveData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      const Token = await AsyncStorage.getItem('jwt');
      if (userString !== null) {
        const user = JSON.parse(userString);
        const retrievedUserId = user._id
        const retrievedToken=Token;
        setToken(retrievedToken);
        setUserId(retrievedUserId);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await _retrieveData()
      getRewards();
    };

    fetchData();
  }, []);

  const getRewards=async()=>{
    const Token = await AsyncStorage.getItem('jwt');
    axios.get(`${BASE_URL}/reward/getRewards`,
    {
      headers:{
        'Authorization': `Bearer ${Token}`,
      }
    }
    ).then((res)=>{
      console.log(res.data);
      setRewards(res.data)
    }).catch((error)=>{
      console.log("Error getting rewards",error.message);
    })
  }

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