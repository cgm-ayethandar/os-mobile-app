import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style/ShowProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../../../App";
import { useNavigation } from "@react-navigation/native";

// api
import { actionLogout, fetchUserProfile } from "../../../api/AuthApi";
import { fetchProfile } from "../../../api/UserApi";
import RenderIf from "../../../utils/RenderIf";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

const ShowProfile = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();
  const [token, setToken] = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  const deleteToken = async () => {
    await AsyncStorage.removeItem("token");
    setToken(await AsyncStorage.getItem("token"));
  };

  const logout = async () => {
    actionLogout(token)
      .then((result) => {
        deleteToken();
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchProfile(userId)
        .then((result) => {
          setProfile(result);
        })
        .catch((e) => {
          // show error message
          console.log(e.message);
        });
    } else {
      fetchUserProfile(token)
        .then((result) => {
          setProfile(result);
        })
        .catch((e) => {
          // show error message
          console.log(e.message?.errors);
        });
    }
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={
              profile.image
                ? { uri: profile.image }
                : require("../../../../assets/profile.png")
            }
            style={styles.image}
          />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.emailText}>{profile.email}</Text>
        </View>
        <RenderIf isTrue={userId == null}>
          <TouchableOpacity style={styles.logout} onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.edit}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editText}>Edit</Text>
            <Ionicons color={Colors.yellow} name={Icons.edit} size={24} />
          </TouchableOpacity>
        </RenderIf>
      </View>
    </>
  );
};

export default ShowProfile;
