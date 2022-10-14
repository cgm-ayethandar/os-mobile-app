import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import styles from "./style/LatestUploads";

const LatestUploads = ({ products }) => {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <View style={styles.container}>
            <Image
              source={{ uri: product.images[0].url }}
              style={styles.image}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Detail", { postId: product.id })
              }
              style={styles.button}
            >
              <Text style={styles.text}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default LatestUploads;
