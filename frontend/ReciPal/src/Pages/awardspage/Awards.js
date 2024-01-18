import { View, Text, ScrollView,TouchableOpacity,Image } from 'react-native'
import React,{ useEffect, useState } from 'react'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from "@env"
import common from "../../utils/common"
import AwardsComp from '../../Components/awards/awards'
const Awards = ({navigation}) => {
  const [rewards,setRewards]=useState([]);
  const [token,setToken]=useState('');
  const [countries,setCountries]=useState([]);
  const _retrieveData = async () => {
    try {
      const Token = await AsyncStorage.getItem('jwt');
      const retrievedToken=Token;
      setToken(retrievedToken);
      
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

  const getRewards = async () => {
    try {
      const Token = await AsyncStorage.getItem('jwt');
      const response = await axios.get(`${BASE_URL}/reward/getRewards`, {
        headers: {
          'Authorization': `Bearer ${Token}`,
        }
      });
  
      const receivedRewards = response.data;
      setRewards(receivedRewards);
    } catch (error) {
      console.log("Error getting rewards", error.message);
    }
  };
  
  useEffect(() => {
    // console.log(rewards);
    if (rewards.Rewards && rewards.Rewards.length > 0) {
      const countriesList = rewards.Rewards.map(item => item.country); 
      setCountries(countriesList);
    }
  }, [rewards]);
  

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
      <AwardsComp countries={countries}/>
    </ScrollView>
  )
}

export default Awards