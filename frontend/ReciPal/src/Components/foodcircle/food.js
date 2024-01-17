import { View, Image, Text, StyleSheet } from 'react-native';
import React from 'react';
import styles from "./style.js"
const Food = ({ source, text,selected }) => {
  return (
    <View>
      <Image
        source={source}
        style={[selected? styles.selectedFoodCircle: styles.container ,styles.foodcircle]}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};


export default Food;
