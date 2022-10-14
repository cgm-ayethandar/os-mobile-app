import { AuthContext } from "../../../../App";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useContext } from "react";
import styles from "./style/Login";

// components
import CustomButton from "../../../component/os-mobile-app/customButton/CustomButton";
import CustomError from "../../../component/os-mobile-app/customError/CustomError";
import CustomInput from "../../../component/os-mobile-app/customInput/CustomInput";
import CustomText from "../../../component/auth/customText/CustomText";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

// api
import { actionLogin } from "../../../api/AuthApi";

// utils
import RenderIf from "../../../utils/RenderIf";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [token, setToken] = useContext(AuthContext);

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem("token", value);
      setToken(await AsyncStorage.getItem("token"));
    } catch (e) {
      console.log(e);
    }
  };

  const login = () => {
    actionLogin(email, password)
      .then((result) => {
        storeToken(result.token);
      })
      .catch((e) => {
        // show error message
        console.log(e.message?.errors);
        setEmailErrorMessage(e.message?.errors?.email);
        setPasswordErrorMessage(e.message?.errors?.password);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <RenderIf isTrue={emailErrorMessage}>
            <CustomError text={emailErrorMessage} />
          </RenderIf>
          <View style={styles.inputContainer}>
            <Ionicons name={Icons.mail} size={26} color={Colors.platinum} />
            <CustomInput
              keyboardType={"email-address"}
              onChangeText={setEmail}
              placeholder={"youremail@gmail.com"}
              value={email}
            />
          </View>
          <RenderIf isTrue={passwordErrorMessage}>
            <CustomError text={passwordErrorMessage} />
          </RenderIf>
          <View style={styles.inputContainer}>
            <Ionicons name={Icons.password} size={26} color={Colors.platinum} />
            <CustomInput
              onChangeText={setPassword}
              placeholder={"Enter your password"}
              secureTextEntry={true}
              value={password}
            />
          </View>
          <CustomText
            onPress={() => navigation.navigate("Register")}
            text1={"Don't have an account?"}
            text2={"Sign Up"}
          />
          <View style={styles.bottonContainer}>
            <CustomButton text={"Login"} blockButton={true} onPress={login} />
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;
