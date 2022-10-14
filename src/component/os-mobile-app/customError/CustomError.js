import { View, Text } from "react-native";
import React from "react";
import styles from "./style/CustomError";

const CustomError = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>* {text}</Text>
    </View>
  );
};

export default CustomError;
