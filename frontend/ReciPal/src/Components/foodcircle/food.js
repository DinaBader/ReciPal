import { View, Image, Text, StyleSheet } from 'react-native';
import React from 'react';
import styles from "./style.js"
const Food = ({ source, text,selected }) => {
  return (
    <View style={selected? styles.selectedFoodCircle: styles.container}>
      <Image
        source={source}
        style={{ width: 70, height: 70, borderRadius: 100 }}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};


export default Food;
