import { View, Text , ScrollView,FlatList } from 'react-native'
import React from 'react'
import common from "../../utils/common"
import ImageHeader from "../../Components/ImageHeader/imageheader"
import Cylinder from "../../Components/cylinder/CylinderComp.js"
import style from "./style.js"

const Recipedetail = () => {
  const ingredients = ['Beef', 'Beans', 'Tomato paste'];
  const IngredientItem = ({ item }) => (
    <Text style={[common.white, style.ingredientsText]}>{item}</Text>
  );

  const instructions = ['Cut the beef', 'Fry the meat', 'mix the ingredients'];
  const InstructionItem = ({ item }) => (
    <Text style={[common.white,  style.ingredientsText]}>{item}</Text>
  );

  return (
    <>
      <FlatList
        style={[common.backgroundColor]}
        ListHeaderComponent={() => (
          <>
            <ImageHeader source={require('../../../assets/beefchili.jpeg')} text="Beef chili" />
            <Text style={[common.white, common.bold, style.ingredientsTitle]}>Ingredients</Text>
          </>
        )}
        ListFooterComponent={() => <View />} 
        keyExtractor={(item, index) => index.toString()}
        data={ingredients}
        renderItem={IngredientItem}
        ListEmptyComponent={<Text>No ingredients available</Text>}
      />

      <FlatList
        style={[common.backgroundColor]}
        ListHeaderComponent={() => (
          <>
            <Text style={[common.white, common.bold, style.ingredientsTitle]}>Instructions</Text>
          </>
        )}
        ListFooterComponent={() => <View />} 
        keyExtractor={(item, index) => index.toString()}
        data={instructions}
        renderItem={InstructionItem}
        ListEmptyComponent={<Text>No Instructions available</Text>}
      />
      <Cylinder/>
    </>
  )
}

export default Recipedetail