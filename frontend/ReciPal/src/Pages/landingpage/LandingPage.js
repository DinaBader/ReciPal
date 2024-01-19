import {View,Image } from 'react-native'
import React ,{ useEffect }from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
const LandingPage = () => {
  const navigation = useNavigation();
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
  
      return () => clearTimeout(timeoutId);
    }, [navigation]);
  
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/logo.png')}
          style={{width: 200, height: 200}}
        />
      </View>
    );
  };
    

export default LandingPage
