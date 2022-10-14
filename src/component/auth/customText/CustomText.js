import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style/CustomText";

const CustomText = ({ text1, text2, onPress }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{text1}</Text>
        <TouchableOpacity style={styles.text2Container} onPress={onPress}>
          <Text style={[styles.text, { fontWeight: "700" }]}>{text2}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CustomText;
