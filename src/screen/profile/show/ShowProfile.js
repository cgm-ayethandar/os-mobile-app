import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import styles from "./style/ShowProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../../App";

// Constant
import { Constants } from "../../../constant/Constants";

const ShowProfile = () => {
  const [token, setToken] = useContext(AuthContext);

  const logout = async () => {
    let token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(Constants.api_url + "api/logout", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(token);
      const json = await response.json();
      console.log(json);
      await AsyncStorage.removeItem("token");
      setToken(await AsyncStorage.getItem("token"));
    } catch (error) {
      console.error(error);
      console.log("error");
    }
    console.log(token);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>ShowProfile</Text>
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ShowProfile;
