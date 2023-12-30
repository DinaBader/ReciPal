import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const chat = () => {
  return (
    <View style={styles}>
      <Text>chat</Text>
    </View>
  )
}

export default chat
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });