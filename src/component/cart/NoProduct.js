import { View, Image, Text } from "react-native";
import React from "react";
import styles from "./style/NoProduct";

const NoProduct = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/empty-cart.png")}
        style={styles.image}
      />
      <Text style={styles.text}>No Products Yet</Text>
    </View>
  );
};

export default NoProduct;
