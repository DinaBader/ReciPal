import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import common from "../../utils/common";
import style from "./style";
import axios from "axios";
import { BASE_URL } from "@env";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FeedBack = ({ navigation }) => {
  const [feedback, setFeedback] = useState("");
  const [currentLanguage, setLanguage] = useState("en");
  const handleFeedback = (text) => {
    setFeedback(text);
  };
  const navigateToSettings = () => {
    navigation.goBack();
  };

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

  const handleSubmit = () => {
    if (BASE_URL) {
      axios
        .post(
          `${BASE_URL}/review/addReview`,
          {
            feedback,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          try {
          } catch (error) {
            console.error("Error", error);
          }
        })
        .catch((error) => {
          try {
            console.error("Error", error.response.data);
          } catch (error) {
            console.error("Error:", error);
          }
        });
    }
  };

  return (
    <View style={[common.backgroundColor]}>
      <View style={[common.title]}>
        <TouchableOpacity onPress={navigateToSettings}>
          <Image
            source={require("../../../assets/back.png")}
            style={common.back_Icon}
          />
        </TouchableOpacity>
        <Text style={[common.header, common.white, style.feedback]}>
          {t("FeedbackPage.Feedback")}
        </Text>
      </View>
      <Text style={[common.white, style.title]}></Text>
      <Text style={[common.white, style.text]}>{t("FeedbackPage.Thank")}</Text>
      <TextInput
        style={[style.TextInput]}
        multiline={true}
        textAlignVertical="top"
        placeholder={t("FeedbackPage.placeholder")}
        onChangeText={handleFeedback}
      />
      <TouchableOpacity
        style={[common.btn, common.center, common.yellow_bg, style.btn]}
        onPress={handleSubmit}
      >
        <Text style={[common.bold]}>{t("FeedbackPage.Submit")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedBack;
