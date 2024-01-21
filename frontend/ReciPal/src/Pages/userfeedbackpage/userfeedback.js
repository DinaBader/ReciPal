import { View, Text, ScrollView, TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import common from "../../utils/common"
import axios from 'axios'
import style from './style'
import {BASE_URL} from "@env"
import BottomNav from '../../Components/userbottomnav/bottomnavcomp'
const Userfeedback = ({navigation}) => {
  const [feedbacks,setFeedback]=useState([]);
   
  const getFeedback=()=>{
    try{
       axios.get(`${BASE_URL}/review/getReviews`
       ).then((res)=>{
        const response=res.data.reviews;
        console.log(response)
        setFeedback(response);
       })
    }catch(error){
      console.log("Error fetching feedback",error);
    }
  }
  const navigatoHome=()=>{
    navigation.navigate('AdminPage');
  }

  const navigateAddrecipes=()=>{
    navigation.navigate('AddRecipePage');
  }

  const navigateFeedback=()=>{
    navigation.navigate('UserFeedbackPage')
  }
  useEffect(()=>{
     getFeedback();
  },[])

  const DeleteFeedback=(feedbackId)=> {
    try{
       axios.delete(`${BASE_URL}/review/removeReview/${feedbackId}`
       ).then((res)=>{
        const updatedFeedback = feedbacks.filter((feedback) => feedback._id !== feedback);
        getFeedback(updatedFeedback);
       })
    }catch(error){
      console.log("Error deleting the feedback",error);
    }
  }

  return (
    <ScrollView style={[common.backgroundColor]}>
      <Text style={[common.header,common.white]}>User Feedback</Text>
      {feedbacks.map((feedback,index)=>(
        <View key={index} style={[style.container]}>
        <Text style={[common.white,style.feedback]}>{feedback.feedback}</Text>
        <TouchableOpacity
          style={[style.deleteButton, common.center]}
          onPress={() => DeleteFeedback(feedback._id)}>
            <View style={style.align}>
              <Image source={require("../../../assets/trash.png")} style={{width:20,height:20}}/>
              <Text style={common.bold}>Delete</Text>
            </View>
        </TouchableOpacity>

        </View>
      ))
      }
      <BottomNav onPress1={navigatoHome} onPress2={navigateAddrecipes} onPress3={navigateFeedback}
     source1={require("../../../assets/home.png")}
     source2={require("../../../assets/add.png")}
     source3={require("../../../assets/chat.png")}
     />


    </ScrollView>
  )
}

export default Userfeedback