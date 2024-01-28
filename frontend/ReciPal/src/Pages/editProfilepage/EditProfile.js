import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { BASE_URL } from "@env";
import { BASE_URL } from "@env";

import common from "../../utils/common";
import style from "./style";
import { useTranslation } from "react-i18next";

const EditProfile = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [currentLanguage, setLanguage] = useState("en");
  const [name,setname]=useState("");
  const [mail,setMail]=useState([]);
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
      const lang = (await AsyncStorage.getItem("language")) || "en";
      changeLanguage(lang);
    };
    retreiveLang();
  }, []);

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handleUsername = (text) => {
    setUsername(text);
  };

  const _retrieveData = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString !== null) {
        const user = JSON.parse(userString);
        const retrievedUserId = user._id;
        setUserId(retrievedUserId);
        setname(user.username)
        setMail(user.email)
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  const showAlert = () =>
    Alert.alert("Empty Fields", "Please enter either Username or Email", [
      {
        text: "OK",
        style: "cancel",
      },
    ]);

  const handleSubmit = async () => {
    if (username == "" && email == "") {
      showAlert();
    } else {
      if (BASE_URL) {
        const Token = await AsyncStorage.getItem("jwt");
        axios
          .post(
            `${BASE_URL}/reward/editProfile`,
            {
              username,
              email,
            },
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then((res) => {
            setUsername("");
            setEmail("");
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
    }
  };

  const navigateToSettings = () => {
    navigation.goBack();
  };
  return (
    <View style={common.backgroundColor}>
      <View style={[common.title]}>
        <TouchableOpacity onPress={navigateToSettings}>
          <Image
            source={require("../../../assets/back.png")}
            style={common.back_Icon}
          />
        </TouchableOpacity>
        <Text style={[common.header, common.white]}>
          {t("EditProfilePage.Profile")}
        </Text>
      </View>
      <Text
        style={[
          currentLanguage === "en"
            ? [common.gray, style.title]
            : [common.gray, style.arabic],
        ]}
      >
        {t("EditProfilePage.Username")}
      </Text>
      <TextInput
        style={[style.input]}
        value={username}
        onChangeText={handleUsername}
        placeholder={name}
      />
      <Text
        style={[
          currentLanguage === "en"
            ? [common.gray, style.title]
            : [common.gray, style.arabic],
        ]}
      >
        {t("EditProfilePage.Email")}
      </Text>
      <TextInput
        style={[style.input]}
        value={email}
        onChangeText={handleEmail}
        placeholder={mail}
      />
      <TouchableOpacity
        style={[common.yellow_bg, style.button, common.raduis, common.center]}
        onPress={handleSubmit}
      >
        <Text style={[common.bold]}>{t("EditProfilePage.Submit")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;
