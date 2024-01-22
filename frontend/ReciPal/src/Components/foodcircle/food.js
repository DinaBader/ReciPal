import { View, Image, Text, StyleSheet } from 'react-native';
import React from 'react';
import styles from "./style.js"
import { TouchableOpacity } from 'react-native-gesture-handler';
const Food = ({ source, text,selected,onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
      <Image
        source={source}
        style={[selected? styles.selectedFoodCircle: styles.container ,styles.foodcircle]}
      />
      <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Food;
