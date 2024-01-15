import { View, Text, ScrollView,TouchableOpacity, Image} from 'react-native';
import React from 'react';
import common from '../../utils/common';
import ImageHeader from '../../Components/ImageHeader/imageheader';
import Cylinder from '../../Components/cylinder/CylinderComp.js';
import style from './style.js';
import { useEffect } from 'react';


const Recipedetail = ({route,navigation}) => {
  const ingredients = ['Beef', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste', 'Beans', 'Tomato paste'];
  const instructions = ['Cut the beef', 'Fry the meat', 'Mix the ingredients'];
  const navigateToHome=()=>{
    navigation.goBack();
  }
  const { recipeId } = route.params;
  
  return (
      <ScrollView style={[common.backgroundColor,style.container]}>
        <>
        <View style={style.backButtonContainer}>
        <TouchableOpacity onPress={navigateToHome}>
          <Image source={require("../../../assets/back.png")} style={[common.back_Icon, style.image]} />
        </TouchableOpacity>
        </View>
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
      <View style={[common.flex,style.cylinder]}>
        <Cylinder text="35 Min"/>
        <Cylinder text="03 People"/>
        <Cylinder text="200 Cal"/>
        <Cylinder text="Easy"/>
      </View>
      </ScrollView>

  );
};

export default Recipedetail;
