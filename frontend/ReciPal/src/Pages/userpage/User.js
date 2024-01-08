import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import common from "../../utils/common";
import styles from "./style";
import Search from "../../Components/search/searchcomp"
import Foodcircle from "../../Components/foodcircle/food"
const User = () => {
  return (
    <View style={[common.backgroundColor,styles.container]}>
      <Text style={styles.text}>What would you like {'\n'} to Eat?</Text>
      <Search/>
      <View style={styles.foodCircleContainer}>
        <Foodcircle source={require("../../../assets/beef.jpg")} text="Beef" />
        <Foodcircle source={require("../../../assets/fish.jpg")} text="Fish" />
        <Foodcircle source={require("../../../assets/dips.jpeg")} text="Dips" />
      </View>
    </View>
  );
}

export default User;
