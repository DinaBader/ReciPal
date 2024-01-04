import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import common from "../../utils/common";
import styles from "./style";
import Search from "../../Components/search/searchcomp"

const User = () => {
  return (
    <View style={[common.backgroundColor,styles.container]}>
      <Text style={styles.text}>What would you like {'\n'} to Eat?</Text>
      <Search/>
    </View>
  );
}

export default User;
