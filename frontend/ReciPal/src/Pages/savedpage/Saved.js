import { View, Text, TouchableOpacity,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env'
import common from "../../utils/common"
import FoodCard from "../../Components/foodcard/FoodCardComp"
import styles from "./style"
const Saved = ({navigation}) => { 
    const [recipes,getRecipes]=useState([]);
    const [userId, setUserId] = useState(null);
    const navigateToSettings=()=>{
        navigation.goBack();
    }


    const _retrieveData = async () => {
        try {
          const userString = await AsyncStorage.getItem('user');
          if (userString !== null) {
            const user = JSON.parse(userString);
            const retrievedUserId = user._id;
            console.log('User ID:', retrievedUserId); 
            setUserId(retrievedUserId);
          }
        } catch (error) {
          console.error('Error retrieving data:', error);
        }
      };
        
      const getSavedRecipes = () => {
        if (userId === null) {
          console.error('User ID is null. Unable to fetch saved recipes.');
          return;
        }
    
        axios
          .get(`${BASE_URL}/reward/getSavedRecipes/${userId}`)
          .then((res) => {
            console.log(res.data);
            const { recipe } = res.data;
            getRecipes(recipe);
          })
          .catch((error) => {
            console.log('Error fetching saved recipes', error);
          });
      };
    
      useEffect(() => {
        const fetchData = async () => {
          await _retrieveData();
        };
        fetchData();
      }, []);
    
      useEffect(() => {
        if (userId !== null) {
          console.log('userId in useEffect', userId);
          getSavedRecipes();
        }
      }, [userId]);
            
            
            
  return ( 

    <View style={[common.backgroundColor]}>
        <View style={[common.title]}>
        <TouchableOpacity onPress={navigateToSettings}>
            <Image source={require("../../../assets/back.png")} style={common.back_Icon}/>
        </TouchableOpacity>
            <Text style={[common.white,common.header]}>Saved</Text>
        </View>
        <View style={[styles.item,styles.background ]}>
            <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"/>
            <TouchableOpacity style={[styles.deleteButton,common.center]}>
                <Text style={common.bold}>Delete </Text>
            </TouchableOpacity>
        </View>


    </View>
  )
}

export default Saved