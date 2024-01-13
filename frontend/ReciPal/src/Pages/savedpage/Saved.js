import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import FoodCard from "../../Components/foodcard/FoodCardComp"
import styles from "./style"
const Saved = () => { 
  return ( 


    <View style={[common.backgroundColor]}>
        <Text style={[common.white,common.header]}>Saved</Text>
        <View style={[styles.item,styles.background ]}>
            <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"/>
            <TouchableOpacity style={[styles.deleteButton,common.center]}>
                <Text style={common.bold}>Delete </Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.item,styles.background]}>
            <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"/>
            <TouchableOpacity style={[styles.deleteButton,common.center]}>
                <Text style={common.bold}>Delete </Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

export default Saved