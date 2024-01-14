import { View, Text, ScrollView,TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import common from "../../utils/common";
import styles from "./style";
import Search from "../../Components/search/searchcomp"
import Foodcircle from "../../Components/foodcircle/food"
import FoodCard from  "../../Components/foodcard/FoodCardComp"
const User = () => {
  const navigation = useNavigation();
  const [selectedFood, setSelectedFood] = useState(null);

  const handleFoodPress = (food) => {
    setSelectedFood((prevSelectedFood) => (prevSelectedFood === food ? null : food));
  };

  const NavigateTodetails=()=>{
    navigation.navigate('RecipeDetail');
  }

  return (
    <ScrollView style={[common.backgroundColor,styles.container]}>
      <Text style={styles.text}>What would you like {'\n'} to Eat?</Text>
      <Search/>
      <View style={styles.foodCircleContainer}>

        <TouchableOpacity onPress={() => handleFoodPress("Beef")}>
        <Foodcircle source={require("../../../assets/beef.jpg")} text="Beef" selected={selectedFood === "Beef"}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleFoodPress("Fish")}>
        <Foodcircle source={require("../../../assets/fish.jpg")} text="Fish" selected={selectedFood === "Fish"}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleFoodPress("Dips")}>
        <Foodcircle source={require("../../../assets/dips.jpeg")} text="Dips" selected={selectedFood === "Dips"} />
        </TouchableOpacity>


      </View>
      <Text style={[common.white,styles.recipeText]}>Recipes</Text>
      <View style={styles.foodCard}>
        <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"  onPress={()=>NavigateTodetails()}/>
        <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"  onPress={()=>NavigateTodetails()}/>
        <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"  onPress={()=>NavigateTodetails()}/>
        <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"  onPress={()=>NavigateTodetails()}/>
        <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"  onPress={()=>NavigateTodetails()}/>
        <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"  onPress={()=>NavigateTodetails()}/>
        <FoodCard source={require("../../../assets/beefchili.jpeg")} text="Beef chili"  onPress={()=>NavigateTodetails()}/>
      </View>
    </ScrollView>
  );
}

export default User;
