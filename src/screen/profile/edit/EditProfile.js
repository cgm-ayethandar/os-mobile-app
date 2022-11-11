import { AuthContext } from "../../../../App";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../../App";
import { View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useContext, useState } from "react";
import styles from "./style/EditProfile";

// api
import { fetchUserProfile } from "../../../api/AuthApi";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

// component
import CustomButton from "../../../component/os-mobile-app/customButton/CustomButton";
import CustomError from "../../../component/os-mobile-app/customError/CustomError";
import CustomInput from "../../../component/os-mobile-app/customInput/CustomInput";

// utils
import { updateProfile } from "../../../api/AuthApi";
import RenderIf from "../../../utils/RenderIf";

const EditProfile = ({ route }) => {
  const { profile } = route.params;
  const navigation = useNavigation();
  const [token, setToken] = useContext(AuthContext);
  const [profileImg, setProfileImg] = useContext(UserContext);
  const [image, setImage] = useState(null);

  const [userName, setUserName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [description, setDescription] = useState(profile.description);

  const [userNameErrorMessage, setUserNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(null);
  const [addressErrorMessage, setAddressErrorMessage] = useState(null);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState(null)
  const [imageErrorMessage, setImageErrorMessage] = useState(null);

  const options = {
    title: 'Choose an Image',
    base64: true
 };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(options, {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
        console.log(result);
      setImage(result.base64);
    }
  };

  const update = () => {
    var data = new FormData();

    data.append("name", userName);
    data.append("email", email);
    data.append("status", "");
    data.append("phone", phone != null ? phone : "");
    data.append("address", address != null ? address : "");
    data.append("description", description != null ? description : "");
    if (image) {
        data.append("image", image);
    //   data.append("image", {
    //     uri: image,
    //     name: "IMG_" + Math.floor(Math.random() * 1000) + ".jpg",
    //     type: "image/jpeg",
    //   });
    }

    updateProfile(token, data)
      .then((result) => {
        fetchUserProfile(token)
          .then((result) => {
            setProfileImg(result.image);
          })
          .catch((e) => {
            // show error message
            console.log(e);
            console.log(e.message?.errors);
          });
        Alert.alert("Profile Edit", result.message);
        navigation.navigate("ShowProfile", { userId: null });
      })
      .catch((e) => {
        console.log('error');
        console.log(e);
        setUserNameErrorMessage(null);
        setEmailErrorMessage(null);
        setPhoneErrorMessage(null);
        setAddressErrorMessage(null);
        setDescriptionErrorMessage(null);
        // show error message
        console.log(e.message.errors);
        if (e.message.errors) {
          let requestError = e.message.errors;
          if (requestError.image) {
            setImageErrorMessage(requestError.image);
          }
          if (requestError.name) {
            setUserNameErrorMessage(requestError.name);
          }
          if (requestError.email) {
            setEmailErrorMessage(requestError.email);
          }
          if (requestError.phone) {
            setPhoneErrorMessage(requestError.phone);
          }
          if (requestError.address) {
            setAddressErrorMessage(requestError.address);
          }
          if (requestError.description) {
            setDescriptionErrorMessage(requestError.description);
          }
        }
      });
  };

  return (
    <>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={
              image
                ? { uri: `data:image/gif;base64,${image}` }
                : profile.image
                ? { uri: `data:image/gif;base64,${profile.image}` }
                : require("../../../../assets/profile.png")
            }
            style={styles.image}
          />
          <Ionicons
            color={Colors.avocado}
            name={Icons.edit}
            onPress={pickImage}
            size={30}
            style={styles.edit}
          />
          <RenderIf isTrue={imageErrorMessage}>
            <CustomError text={imageErrorMessage} />
          </RenderIf>
          <View style={{ width: "75%" }}>
            <RenderIf isTrue={userNameErrorMessage}>
              <CustomError text={userNameErrorMessage} />
            </RenderIf>
            <View style={styles.inputContainer}>
              <Ionicons name={Icons.user} size={24} color={Colors.avocado} />
              <CustomInput
                keyboardType={"default"}
                onChangeText={setUserName}
                style={{ borderwidth: 1, borderColor: "black" }}
                value={userName}
              />
            </View>
            <RenderIf isTrue={emailErrorMessage}>
              <CustomError text={emailErrorMessage} />
            </RenderIf>
            <View style={styles.inputContainer}>
              <Ionicons name={Icons.mail} size={24} color={Colors.avocado} />
              <CustomInput
                keyboardType={"email-address"}
                onChangeText={setEmail}
                placeholder={"youremail@gmail.com"}
                value={email}
              />
            </View>
            <RenderIf isTrue={phoneErrorMessage}>
              <CustomError text={phoneErrorMessage} />
            </RenderIf>
            <View style={styles.inputContainer}>
              <Ionicons name={Icons.phone} size={24} color={Colors.avocado} />
              <CustomInput
                keyboardType={"email-address"}
                onChangeText={setPhone}
                placeholder={"phone"}
                value={phone}
              />
            </View>
            <RenderIf isTrue={addressErrorMessage}>
              <CustomError text={addressErrorMessage} />
            </RenderIf>
            <View style={styles.inputContainer}>
              <Ionicons name={Icons.address} size={24} color={Colors.avocado} />
              <CustomInput
                keyboardType={"default"}
                onChangeText={setAddress}
                placeholder={"address"}
                value={address}
              />
            </View>
            <RenderIf isTrue={descriptionErrorMessage}>
              <CustomError text={descriptionErrorMessage} />
            </RenderIf>
            <View style={styles.inputContainer}>
              <Ionicons name={Icons.detail} size={24} color={Colors.avocado} />
              <CustomInput
                keyboardType={"default"}
                onChangeText={setDescription}
                placeholder={"description"}
                value={description}
              />
            </View>
            <View style={styles.btnContainer}>
              <CustomButton
                bgColor={Colors.brown}
                onPress={() => navigation.goBack()}
                text={"Cancel"}
              />
              <CustomButton text={"Update"} onPress={update} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditProfile;
