import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import common from "../../utils/common";
import ImageHeader from "../../Components/ImageHeader/imageheader";
import Cylinder from "../../Components/cylinder/CylinderComp.js";
import style from "./style.js";
import { BASE_URL } from "@env";
import { useTranslation } from "react-i18next";

const Recipedetail = ({ route, navigation }) => {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [userId, setUserId] = useState(null);
  const [completed, SetCompleted] = useState(false);
  const [saved, setSaved] = useState("false");
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setLanguage] = useState("en");
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [showAllInstructions, setshowAllInstructions] = useState(false);
  const { t, i18n } = useTranslation();
  const { recipeId } = route.params;

  const toggleShowAllIngredients = () => {
    setShowAllIngredients(!showAllIngredients);
  };
  const toggleShowAllInstructions = () => {
    setshowAllInstructions(!showAllInstructions);
  };

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
      const lang = (await AsyncStorage.getItem("language")) || "en";
      changeLanguage(lang);
    };
    retreiveLang();
  }, []);

  const navigateToHome = () => {
    navigation.goBack();
  };

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

  const getRecipeDetails = async () => {
    const Token = await AsyncStorage.getItem("jwt");
    try {
      if (BASE_URL) {
        const response = await axios.get(
          `${BASE_URL}/recipe/getRecipeById/${recipeId}`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        const { recipe } = response.data;
        setRecipeDetails(recipe);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = async () => {
    const Token = await AsyncStorage.getItem("jwt");
    if (BASE_URL) {
      if (saved === false) {
        try {
          await axios.post(
            `${BASE_URL}/reward/saveRecipe/${recipeId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          );
          updateSavedStatus("true");
        } catch (error) {
          console.error("error saving recipe", error);
        }
      } else {
        try {
          await axios.post(
            `${BASE_URL}/reward/unsaveRecipe/${recipeId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          );
          updateSavedStatus("false");
        } catch (error) {
          console.error("error unsaving recipe", error);
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await _retrieveData();
      const savedStatus = await AsyncStorage.getItem(`saved_${recipeId}`);
      setSaved(savedStatus || false);

      getRecipeDetails();
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const getItem = async () => {
      const Completed = await AsyncStorage.getItem(`completed_${recipeId}`);
      if (Completed == "false") {
        SetCompleted(false);
      } else {
        SetCompleted(true);
      }
    };
    getItem();
  }, []);

  const updateSavedStatus = async (status) => {
    try {
      await AsyncStorage.setItem(`saved_${recipeId}`, status.toString());
      setSaved(status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showAlert = () =>
    Alert.alert("Completed?", "Did you complete this recipe?", [
      {
        text: "Yes",
        onPress: async () => {
          SetCompleted(!completed);
          try {
            if (BASE_URL) {
              const Token = await AsyncStorage.getItem("jwt");
              await axios.post(
                `${BASE_URL}/reward/addReward/${recipeId}`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${Token}`,
                  },
                }
              );
            }
          } catch (error) {
            console.error("Error adding reward:", error);
          }
        },
        style: "cancel",
      },
      {
        text: "NO",
        style: "cancel",
      },
    ]);

  useEffect(() => {
    CompletedRecipe();
  }, [completed]);

  const CompletedRecipe = async () => {
    try {
      await AsyncStorage.setItem(`completed_${recipeId}`, completed.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCompleted = () => {
    if (!completed) {
      showAlert();
    } else {
      SetCompleted(!completed);
    }
  };
  return (
    <ScrollView style={[common.backgroundColor, style.container]}>
      <View style={style.backButtonContainer}>
        <TouchableOpacity onPress={navigateToHome}>
          <Image
            source={require("../../../assets/back.png")}
            style={[common.back_Icon]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveRecipe}>
          {saved === "true" ? (
            <Image
              source={require("../../../assets/save-yellow.png")}
              style={[common.back_Icon]}
            />
          ) : (
            <Image
              source={require("../../../assets/save-recipe.png")}
              style={[common.back_Icon]}
            />
          )}
        </TouchableOpacity>
      </View>
      <ImageHeader
        source={{ uri: `${BASE_URL}/recipes/${recipeDetails.image}` }}
        text={
          currentLanguage === "en" ? recipeDetails.name : recipeDetails.name_ar
        }
      />
      {loading == true && (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#FFBF4D" />
        </View>
      )}

      {!loading && (
        <>
          <View
            style={
              currentLanguage === "en" ? style.underline : style.underline_ar
            }
          >
            <Text
              style={[
                common.white,
                common.bold,
                style.ingredientsTitle,
                currentLanguage === "en" ? null : style.arabic,
              ]}
            >
              {t("RecipeDetailPage.Ingredients")}
            </Text>
          </View>
          {currentLanguage === "en"
            ? recipeDetails.ingredients &&
              recipeDetails.ingredients
                .slice(
                  0,
                  showAllIngredients ? recipeDetails.ingredients.length : 4
                )
                .map((ingredient, index) => (
                  <Text
                    key={index}
                    style={[common.white, style.ingredientsText]}
                  >
                    {ingredient}
                  </Text>
                ))
            : recipeDetails.ingredients_ar &&
              recipeDetails.ingredients_ar
                .slice(
                  0,
                  showAllIngredients ? recipeDetails.ingredients_ar.length : 4
                )
                .map((ingredient, index) => (
                  <Text
                    key={index}
                    style={[common.white, style.ingredientsText]}
                  >
                    {ingredient}
                  </Text>
                ))}
          {!showAllIngredients && (
            <TouchableOpacity onPress={toggleShowAllIngredients}>
              <Text style={style.link}>Show more</Text>
            </TouchableOpacity>
          )}
          {showAllIngredients && (
            <TouchableOpacity onPress={() => toggleShowAllIngredients(false)}>
              <Text style={style.link}>Show less</Text>
            </TouchableOpacity>
          )}
        </>
      )}

{!loading && (
  <>
    <View
      style={
        currentLanguage === "en" ? style.underline : style.underline_ar
      }
    >
      <Text
        style={[
          currentLanguage === "en"
            ? [common.white, common.bold, style.ingredientsTitle]
            : [common.white, common.bold, style.arabic],
        ]}
      >
        {t("RecipeDetailPage.Instructions")}
      </Text>
    </View>
    {currentLanguage === "en"
      ? recipeDetails.instructions &&
        recipeDetails.instructions
          .slice(0, showAllInstructions ? recipeDetails.instructions.length : 4)
          .map((instruction, index) => (
            <Text
              key={index}
              style={[common.white, style.ingredientsText]}
            >
              {instruction}
            </Text>
          ))
      : recipeDetails.instructions_ar &&
        recipeDetails.instructions_ar
          .slice(0, showAllInstructions ? recipeDetails.instructions_ar.length : 4)
          .map((instruction, index) => (
            <Text
              key={index}
              style={[common.white, style.ingredientsText]}
            >
              {instruction}
            </Text>
          ))}
    {!showAllInstructions && recipeDetails.instructions && recipeDetails.instructions.length > 4 && (
      <TouchableOpacity onPress={toggleShowAllInstructions}>
        <Text style={style.link}>
          Show More
        </Text>
      </TouchableOpacity>
    )}
    {showAllInstructions && (
      <TouchableOpacity onPress={() => toggleShowAllInstructions(false)}>
        <Text style={style.link}>
        Show Less
        </Text>
      </TouchableOpacity>
    )}
  </>
)}

      <View style={[common.flex, style.cylinder]}>
        {loading === false && (
          <>
            <Cylinder
              text={
                currentLanguage === "en" && recipeDetails.total_time
                  ? recipeDetails.total_time
                  : recipeDetails.total_time_ar
              }
            />
            <Cylinder
              text={
                currentLanguage === "en" && recipeDetails.serving
                  ? recipeDetails.serving
                  : recipeDetails.serving_ar
              }
            />
            <Cylinder
              text={
                currentLanguage === "en" && recipeDetails.calories
                  ? recipeDetails.calories
                  : recipeDetails.calories_ar
              }
            />
            <Cylinder
              text={
                currentLanguage === "en" && recipeDetails.difficulty
                  ? recipeDetails.difficulty
                  : recipeDetails.difficulty_ar
              }
            />
          </>
        )}
      </View>
      {!loading && (
        <TouchableOpacity
          style={[
            common.button_h,
            common.button_w,
            common.center,
            style.button,
            { backgroundColor: completed ? "#FFBF4D" : "gray" },
          ]}
          onPress={handleCompleted}
        >
          <Text style={[common.bold, common.font]}>
            {t("RecipeDetailPage.Completed")}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Recipedetail;
