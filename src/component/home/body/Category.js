import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./style/Category";

const Category = ({ category }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={{
            uri: category.image,
          }}
          style={styles.image}
        />
        <Text style={styles.text}>{category.name}</Text>
      </View>
    </>
  );
};

export default Category;

// ${category.id.toString()}
