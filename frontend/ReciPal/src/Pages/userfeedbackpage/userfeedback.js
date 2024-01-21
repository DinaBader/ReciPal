import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import common from "../../utils/common"
import axios from 'axios'
import style from './style'
import {BASE_URL} from "@env"
const Userfeedback = () => {
  const [feedbacks,setFeedback]=useState([]);
   
  const getFeedback=()=>{
    try{
       axios.get(`${BASE_URL}/review/getReviews`
       ).then((res)=>{
        const response=res.data.reviews;
        setFeedback(response);
       })
    }catch(error){
      console.log("Error fetching feedback",error);
    }
  }
 
  useEffect(()=>{
     getFeedback();
  },[])

  return (
    <ScrollView style={[common.backgroundColor]}>
      <Text style={[common.header,common.white]}>User Feedback</Text>
      {feedbacks.map((feedback,index)=>(
        <View key={index} style={[style.container]}>
        <Text style={common.white}>{feedback.feedback}</Text>
        </View>
      ))
      }
    </ScrollView>
  )
}

export default Userfeedback