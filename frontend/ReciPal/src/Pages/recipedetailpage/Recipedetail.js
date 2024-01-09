import { View, Text , ScrollView} from 'react-native'
import React from 'react'
import common from "../../utils/common"
import ImageHeader from "../../Components/ImageHeader/imageheader"
import style from "./style.js"

const Recipedetail = () => {
  return (
    <ScrollView style={common.backgroundColor}>
      <ImageHeader source={require("../../../assets/beefchili.jpeg")} text="Beef chili"/>
      <Text style={[common.white,common.bold,style.ingredientsTitle]}>Ingredients</Text>
    </ScrollView>
  )
}

export default Recipedetail