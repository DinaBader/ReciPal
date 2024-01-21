import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import common from "../../utils/common"
import axios from 'axios'
import {BASE_URL} from "@env"
const Userfeedback = () => {
  const [feedback,setFeedback]=useState([]);
   
  const getFeedback=()=>{
    try{
       axios.get(`${BASE_URL}/review/getReviews`
       ).then((res)=>{
        const response=res.data;
        console.log(response); 
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
    <View style={[common.backgroundColor]}>
      <Text style={[common.header,common.white]}>User Feedback</Text>

    </View>
  )
}

export default Userfeedback