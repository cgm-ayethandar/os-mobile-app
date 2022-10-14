import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style/CustomButton";

const CustomButton = ({ text, onPress, blockButton }) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, blockButton && { width: "100%" }]}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;
