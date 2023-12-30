import {StyleSheet, View, Text,Image } from 'react-native'
import React ,{ useEffect }from 'react'

const LandingPage = ({ navigation }) => {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
  
      return () => clearTimeout(timeoutId);
    }, [navigation]);
  
    return (
      <View style={styles.container}>
      </View>
    );
  };
    

export default LandingPage


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFBF4D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});