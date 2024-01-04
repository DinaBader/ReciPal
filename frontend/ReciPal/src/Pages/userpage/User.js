import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import common from "../../utils/common";
import styles from "./style";

const User = () => {
  return (
    <View style={[common.backgroundColor,styles.container]}>
      <Text style={styles.text}>What would you like {'\n'} to Eat?</Text>
    </View>
  );
}

export default User;
