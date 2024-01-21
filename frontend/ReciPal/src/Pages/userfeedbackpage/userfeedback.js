import { View, Text, ScrollView, TouchableOpacity,Image } from 'react-native'
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
        <TouchableOpacity
          style={[style.deleteButton, common.center]}
          onPress={() => DeleteRecipe(recipe.recipeId)}>
            <View style={style.align}>
              <Image source={require("../../../assets/trash.png")} style={{width:20,height:20}}/>
              <Text style={common.bold}>Delete</Text>
            </View>
        </TouchableOpacity>

        </View>
      ))
      }
    </ScrollView>
  )
}

export default Userfeedback