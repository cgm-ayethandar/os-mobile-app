import { View, Text } from "react-native";
import React from "react";
import styles from "./style/Title";

const Title = ({ text }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </>
  );
};

export default Title;
