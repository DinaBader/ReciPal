import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";
import { useTranslation } from "react-i18next";
import common from "../../utils/common";
import FoodCard from "../../Components/foodcard/FoodCardComp";
import styles from "./style";

const Saved = ({ navigation }) => {
  const [recipes, getRecipes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentLanguage, setLanguage] = useState("en");

  const { t, i18n } = useTranslation();

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        setLanguage(value);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const retreiveLang = async () => {
      const lang = await AsyncStorage.getItem("language");
      changeLanguage(lang);
    };
    retreiveLang();
  }, []);

  const navigateToSettings = () => {
    navigation.goBack();
  };

  axios.defaults.headers["Authorization"] =
    "Bearer " + AsyncStorage.getItem("jwt");

  const _retrieveData = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString !== null) {
        const user = JSON.parse(userString);
        const retrievedUserId = user._id;
        setUserId(retrievedUserId);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const getSavedRecipes = async () => {
    if (userId === null) {
      return;
    }
    if (BASE_URL) {
      const Token = await AsyncStorage.getItem("jwt");
      axios
        .get(`${BASE_URL}/reward/getSavedRecipes`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          const { savedRecipes } = res.data;

          if (savedRecipes && savedRecipes.length > 0) {
            const recipesData = savedRecipes.map((item) => ({
              recipeId: item.recipe,
              recipeName: item.title,
              recipeImage: item.image,
            }));
            getRecipes(recipesData);
          }
        })
        .catch((error) => {
          console.error("Error fetching saved recipes", error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await _retrieveData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      getSavedRecipes();
    }
  }, [userId]);

  const DeleteRecipe = async (recipeId) => {
    if (BASE_URL) {
      try {
        const Token = await AsyncStorage.getItem("jwt");
        await axios.post(
          `${BASE_URL}/reward/unsaveRecipe/${recipeId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        const updatedRecipes = recipes.filter(
          (recipe) => recipe.recipeId !== recipeId
        );
        getRecipes(updatedRecipes);

        await AsyncStorage.removeItem(`saved_${recipeId}`);
      } catch (error) {
        console.error("error unsaving recipe", error);
      }
    }
  };

  return (
    <ScrollView style={[common.backgroundColor]}>
      <View style={[common.title]}>
        <TouchableOpacity onPress={navigateToSettings}>
          <Image
            source={require("../../../assets/back.png")}
            style={common.back_Icon}
          />
        </TouchableOpacity>
        <Text style={[common.white, common.header]}>
          {t("SavedPage.Saved")}
        </Text>
      </View>
      {recipes.length!=0?
      recipes.map((recipe, index) => (
        <View style={[styles.item, styles.background]} key={index}>
          <View style={styles.comp}>
            <FoodCard
              source={{ uri: `${BASE_URL}/recipes/${recipe.recipeImage}` }}
              text={recipe.recipeName}
            />
            <TouchableOpacity
              style={[styles.deleteButton, common.center]}
              onPress={() => DeleteRecipe(recipe.recipeId)}
            >
              <View style={styles.align}>
                <Image
                  source={require("../../../assets/trash.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={[common.bold, common.white]}>
                  {t("SavedPage.Delete")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )):<Text style={styles.noSaved}>No Saved Recipes Yet.</Text>}
    </ScrollView>
  );
};

export default Saved;
