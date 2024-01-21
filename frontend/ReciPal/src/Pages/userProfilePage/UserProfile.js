import { Image, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import common from '../../utils/common';
import style from './style';
import ProfileComp from '../../Components/UserProfile/UserProfileComp.js';
import Icons from '../../Components/Icons/IconsComp.js';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
 import BottomNav from "../../Components/userbottomnav/bottomnavcomp"

const UserProfile = ({ navigation }) => {
  const [image, setImage] = useState('');
  const [reloadProfile, setReloadProfile] = useState(false);

  const getImage = async () => {
    try {
      const Token = await AsyncStorage.getItem('jwt');
      const response = await axios.get(`${BASE_URL}/reward/get_userImage`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      const Image = response.data.image;
      setImage(Image);
    } catch (error) {
      console.log('error fetching image', error);
    }
  };

  const handleUpdateImage = async (newImage) => {
    try {
      const Token = await AsyncStorage.getItem('jwt');
      const response = await axios.get(`${BASE_URL}/reward/get_userImage`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      const newImageUri = response.data.image;
      setImage(newImageUri);

      setReloadProfile((prev) => !prev);
    } catch (error) {
      console.log('error fetching updated image', error);
    }
  };
  const navigatoHome = () =>{
    navigation.navigate('UserPage');
  }

  const navigateAdd = () =>{
    navigation.navigate('ImagePage');
  }

  const navgateProfile = () =>{
    navigation.navigate('UserProfile');
  }
  useEffect(() => {
    getImage();
  }, [reloadProfile]); 

  return (
    <ScrollView style={common.backgroundColor}>
      <ProfileComp
        key={reloadProfile} 
        source={image ? { uri: `${BASE_URL}/images/${image}` } : require('../../../assets/default.jpg')}
        onUpdateImage={handleUpdateImage}
      />
      <Icons navigation={navigation} />
      <BottomNav onPress1={navigatoHome} onPress2={navigateAdd} onPress3={navgateProfile}/>

    </ScrollView>
  );
};

export default UserProfile;
