import {  Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./style/Category";

const Category = ({ category }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() =>
                  navigation.navigate("Search", {
                    category: category,
                  })
                } >
        <Image
          source={{
            uri: category.image,
          }}
          style={styles.image}
        />
        <Text style={styles.text}>{category.name}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Category;

// ${category.id.toString()}
