import { Colors } from "../../../constant/Colors";
import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style/CustomButton";

const CustomButton = ({ text, onPress, bgColor, blockButton }) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          blockButton && { width: "100%" },
          bgColor
            ? { backgroundColor: bgColor }
            : { backgroundColor: Colors.avocado },
        ]}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;
