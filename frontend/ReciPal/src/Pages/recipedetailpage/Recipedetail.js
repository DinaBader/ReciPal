import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import common from '../../utils/common';
import ImageHeader from '../../Components/ImageHeader/imageheader';
import Cylinder from '../../Components/cylinder/CylinderComp.js';
import style from './style.js';

const Recipedetail = () => {
  const ingredients = ['Beef', 'Beans', 'Tomato paste'];
  const instructions = ['Cut the beef', 'Fry the meat', 'Mix the ingredients'];

  return (
    <View style={style.container}>
      <ScrollView style={common.backgroundColor}>
        <>
          <ImageHeader source={require('../../../assets/beefchili.jpeg')} text="Beef chili" />
          <Text style={[common.white, common.bold, style.ingredientsTitle]}>Ingredients</Text>
          {ingredients.map((item, index) => (
            <Text key={index} style={[common.white, style.ingredientsText]}>
              {item}
            </Text>
          ))}
        </>
        <>
          <Text style={[common.white, common.bold, style.ingredientsTitle]}>Instructions</Text>
          {instructions.map((item, index) => (
            <Text key={index} style={[common.white, style.ingredientsText]}>
              {item}
            </Text>
          ))}
        </>
      </ScrollView>
      <Cylinder />
    </View>
  );
};

export default Recipedetail;
