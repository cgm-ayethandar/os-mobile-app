import { View, ActivityIndicator } from "react-native";
import React from "react";
import styles from "./style/CustomLoading";
import { Colors } from "../../../constant/Colors";

const CustomLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.avocado} />
    </View>
  );
};

export default CustomLoading;
