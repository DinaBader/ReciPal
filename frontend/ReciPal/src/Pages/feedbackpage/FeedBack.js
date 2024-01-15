import { View, Text,TextInput, TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import common from "../../utils/common"
import style from "./style"
import axios from 'axios';
import { BASE_URL } from '@env';
const FeedBack = () => {
  const [feedback,setFeedback]=useState("");
  const handleFeedback =(text)=>{
    setFeedback(text)
  }
   
  const handleSubmit =()=>{
    axios.post(
      `${ BASE_URL }/review/addReview`,
        {
          feedback
        },
        {
            headers:{
                "Content-Type":"application/json",
            }
        }
      ).then((res) => {
        try {
          console.log("Feedback submitted successfully:", res.data);
        } catch (error) {
          console.error("Error", error);
        }
      }).catch((error) => {
        try {
          console.error("Error", error.response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      });
  }

  return (
    <View style={common.backgroundColor}>
      <Text style={[common.white,common.header]}>FeedBack</Text>
      <Text style={[common.white,style.title]}>Share your FeedBack</Text>
      <Text style={[common.white,style.text]}>Thank you for using ReciPal {"\n"} Please give us your feedback.</Text>
      <TextInput
           style={[style.TextInput]}
           multiline={true}
           textAlignVertical="top"
           placeholder='Enter message'
           onChangeText ={handleFeedback}
      />
      <TouchableOpacity style={[style.button,common.center]} onPress={handleSubmit}>
        <Text style={[common.bold]}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FeedBack