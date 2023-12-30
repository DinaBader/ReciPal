import {StyleSheet, View,Image } from 'react-native'
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
        <Image
          source={require('../assets/logo.png')}
          style={{width: 200, height: 200}}
        />
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