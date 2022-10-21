import { AuthContext } from "../../../../App";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style/ShowProfile";

// api
import { actionLogout, fetchUserProfile } from "../../../api/AuthApi";
import { fetchProfile } from "../../../api/UserApi";
import RenderIf from "../../../utils/RenderIf";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";
import CustomLoading from "../../../component/os-mobile-app/customLoading/CustomLoading";

const ShowProfile = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();
  const [token, setToken] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const deleteToken = async () => {
    await AsyncStorage.removeItem("token");
    setToken(await AsyncStorage.getItem("token"));
  };

  const getData = () => {
    if (userId) {
      setLoading(true);
      fetchProfile(userId)
        .then((result) => {
          console.log(result);
          setProfile(result);
          setLoading(false);
        })
        .catch((e) => {
          // show error message
          console.log(e);
        });
    } else {
      setLoading(true);
      fetchUserProfile(token)
        .then((result) => {
          console.log(result);
          setProfile(result);
          setLoading(false);
        })
        .catch((e) => {
          // show error message
          console.log(e);
        });
    }
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
    navigation.addListener("focus", () => {
      getData();
    });
  }, []);

  return (
    <>
      <RenderIf isTrue={loading}>
        <CustomLoading />
      </RenderIf>
      <RenderIf isTrue={!loading}>
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
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            <Ionicons
              color={Colors.yellow}
              name={Icons.edit}
              onPress={() =>
                navigation.navigate("EditProfile", { profile: profile })
              }
              size={30}
              style={styles.edit}
            />
          </RenderIf>
        </View>
      </RenderIf>
    </>
  );
};

export default ShowProfile;
