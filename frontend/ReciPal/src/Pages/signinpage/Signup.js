import { View, Text, ImageBackground, TouchableOpacity,Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import React, { useState, useEffect } from "react";
import common from "../../utils/common";
import style from "./style";
import Input from "../../Components/Inputs/input";
import Button from "../../Components/button/buttoncomp";
import axios from "axios";
// import { BASE_URL } from "@env";
import { BASE_URL } from "@env";
const Signin = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const lang = await AsyncStorage.getItem("language") || "en";
      changeLanguage(lang);
    };
    retreiveLang();
  }, []);

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };
  const handleusernameChange = (text) => {
    setUsername(text);
  };
  const handleemailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const _retrieveData = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString !== null) {
        const user = JSON.parse(userString);
        if (user && user.role === 2) {
          navigation.navigate("UserPage");
        } else {
          navigation.navigate("AdminPage");
        }
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const showAlert = () =>
  Alert.alert(
    "Password too short",
    "Please enter a password with a minimum of 6 characters",
    [
      {
        text: "Retry",
        style: "cancel",
      },
    ]
  );

  const handleSubmit = () => {
    if (BASE_URL) {
      console.log(BASE_URL)
      axios
        .post(
          `${BASE_URL}/auth/register`,
          {
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          _storeData = async () => {
            try {
              await AsyncStorage.setItem("jwt", res.data.token);
              await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
              _retrieveData();
            } catch (error) {
              console.error("Error storing token:", error);
            }
          };
          _storeData();
          _retrieveData();
        })
        .catch((error) => {
          showAlert();
        });
    }
  };
  return (
    <ImageBackground
      source={require("../../../assets/signup.png")}
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      <KeyboardAwareScrollView contentContainerStyle={style.container}>
        <View style={style.signup_container}>
          <Text style={currentLanguage=="en"?style.eu:style.eu_ar}>{t("SignupPage.eu")}</Text>
          <TouchableOpacity
            onPress={navigateToLogin}
            style={[
              common.black_bg,
              common.raduis,
              common.button_h,
              common.button_w,
              common.center,
              style.login,
            ]}
          >
            <Text style={[common.yellow, common.bold, common.font]}>
              {t("SignupPage.Login")}
            </Text>
          </TouchableOpacity>
          <Text style={currentLanguage=="en"?[common.yellow, style.signup, common.bold]:[common.yellow, style.signup_ar, common.bold]}>
            {t("SignupPage.Signuptext")}
          </Text>
          <Text style={currentLanguage=="en"?[common.yellow, style.logoname, common.bold]:[common.yellow, style.logoname_ar, common.bold]}>
            {t("SignupPage.Recipal")}
          </Text>
          <Input
            label="username"
            placeholder={t("SignupPage.Username")}
            value={username}
            onChangeText={handleusernameChange}
          />
          <Input
            label="Email"
            placeholder={t("SignupPage.Email")}
            value={email}
            onChangeText={handleemailChange}
          />
          <Input
            label="Password"
            placeholder={t("SignupPage.Password")}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
          />
          <Button text={t("SignupPage.Signup")} onPress={handleSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Signin;
