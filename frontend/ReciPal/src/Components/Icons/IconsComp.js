import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import AsyncStorage from '@react-native-async-storage/async-storage';

const IconsComp = ({navigation}) => {

  const navigateToLogout = async() =>{
    try {
          await AsyncStorage.clear();
        } catch (error) {
          console.error('Error clearing AsyncStorage:', error);
        }
    navigation.navigate('Login')
  }

  const navigateToSettings = () =>{
    navigation.navigate('Settings')
  }

  const 
  navigateToSaved =()=>{
    navigation.navigate('Saved')
  }

  const navigateToAwards =()=>{
    navigation.navigate('Awards');
  } 
  return (
    <View>
        <TouchableOpacity onPress={navigateToSettings}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/settings.png")}
          style={{ width: 35, height: 35 }}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>Settings</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSaved}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/save.png")}
          style={{ width: 35, height: 35 }}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>Saved</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity  onPress={navigateToAwards}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/award.png")}
          style={{ width: 35, height: 35 }}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>Awards</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToLogout}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginTop: 10, marginBottom:30}}>
        <Image
          source={require("../../../assets/logout.png")}
          style={{ width: 35, height: 35 ,marginLeft:7}}
        />
        <Text style={[common.white, { marginLeft: 20 ,fontSize:25}]}>Logout</Text>
      </View>
      </TouchableOpacity>

    </View>
  )
}

export default IconsComp
