import { useNavigation } from "@react-navigation/native";
import { View, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import styles from "./style/Register";

// api
import { actionRegister } from "../../../api/AuthApi";

// components
import CustomInput from "../../../component/os-mobile-app/customInput/CustomInput";
import CustomButton from "../../../component/os-mobile-app/customButton/CustomButton";
import CustomError from "../../../component/os-mobile-app/customError/CustomError";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

// utils
import CustomText from "../../../component/auth/customText/CustomText";
import RenderIf from "../../../utils/RenderIf";

const Register = () => {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [userNameErrorMessage, setUserNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [passwordRepeateErrorMessage, setPasswordRepeateErrorMessage] =
    useState(null);

  const register = () => {
    actionRegister(userName, email, password, passwordRepeat)
      .then((result) => {
        console.log(result);
        Alert.alert("Sing Up", result.message);
        navigation.navigate("Login");
      })
      .catch((e) => {
        // show error message
        console.log(e.message?.errors);
        setUserNameErrorMessage(e.message?.errors?.name);
        setEmailErrorMessage(e.message?.errors?.email);
        setPasswordErrorMessage(e.message?.errors?.password);
        setPasswordRepeateErrorMessage(e.message?.errors?.password);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <RenderIf isTrue={userNameErrorMessage}>
            <CustomError text={userNameErrorMessage} />
          </RenderIf>
          <View style={styles.inputContainer}>
            <Ionicons name={Icons.user} size={26} color={Colors.platinum} />
            <CustomInput
              keyboardType={"default"}
              onChangeText={setUserName}
              placeholder={"Username"}
              value={userName}
            />
          </View>
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
          <RenderIf isTrue={passwordRepeateErrorMessage}>
            <CustomError text={passwordRepeateErrorMessage} />
          </RenderIf>
          <View style={styles.inputContainer}>
            <Ionicons name={Icons.password} size={26} color={Colors.platinum} />
            <CustomInput
              onChangeText={setPasswordRepeat}
              placeholder={"Confirm Password"}
              secureTextEntry={true}
              value={passwordRepeat}
            />
          </View>
          <CustomText
            onPress={() => navigation.navigate("Login")}
            text1={"Already have an account?"}
            text2={"Sign In"}
          />
          <View style={styles.bottonContainer}>
            <CustomButton
              blockButton={true}
              onPress={register}
              text={"Register"}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default Register;
