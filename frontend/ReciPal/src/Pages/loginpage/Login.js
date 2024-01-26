import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles";
import common from "../../utils/common";
import { useTranslation } from "react-i18next";

// import {BASE_URL} from '@env'
// import { BASE_URL } from "@env";
import {BASE_URL} from "@env"
const Login = ({ navigation }) => {
  const [usernameOrEmail, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleNameChange = (text) => {
    setName(text);
    setErrorMessage("");
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    setErrorMessage("");
  };
  const redirectToSignUp = () => {
    navigation.navigate("SignupPage");
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
  const handleSubmit = () => {
    if (BASE_URL) {
      axios
        .post(
          `${BASE_URL}/auth/login`,
          {
            usernameOrEmail: usernameOrEmail,
            password: password,
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
              await AsyncStorage.setItem(
                "userRole",
                res.data.user.role.toString()
              );
              await AsyncStorage.setItem("isLoggedIn", "true");
              _retrieveData();
            } catch (error) {
              console.error("Error storing token:", error);
            }
          };
          _storeData();
          _retrieveData();
        })
        .catch((error) => {
          console.error(error)
          setName("");
          setPassword("");
          showAlert();
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        });
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Wrong Credentials",
      "You entered a wrong Username or Password",
      [
        {
          text: "Retry",
          style: "cancel",
        },
      ]
    );

  return (
    <ImageBackground
      source={require("../../../assets/login.png")}
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.login}>{t("LoginPage.title")}</Text>
        <TextInput
          style={[styles.reg_input]}
          placeholder={t("LoginPage.Username")}
          onChangeText={handleNameChange}
          value={usernameOrEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.reg_input, common.black]}
          placeholder={t("LoginPage.Password")}
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
          <Text style={[common.yellow, common.bold, styles.btntext]}>
            {t("LoginPage.Login")}
          </Text>
        </TouchableOpacity>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <Text style={[styles.or, common.bold]}>{t("LoginPage.Or")}</Text>
        <TouchableOpacity
          onPress={redirectToSignUp}
          style={[styles.signup, common.yellow_bg]}
        >
          <Text style={[common.black, common.bold, common.font]}>
            {t("LoginPage.Signup")}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
