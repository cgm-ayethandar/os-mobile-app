import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style/MostPopularPost";

// api
import { fetchPopularPost } from "../../../api/PostApi";
import RenderIf from "../../../utils/RenderIf";

const MostPopularPost = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPopularPost()
      .then((result) => {
        setProducts(result);
      })
      .catch((e) => {
        // show error message
        console.log(e.message?.errors);
      });
  });

  return (
    <>
      <RenderIf isTrue={products != null}>
        {products.map((product) => (
          <View style={styles.container}>
            <Image
              source={{ uri: product.images[0].url }}
              style={styles.image}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </RenderIf>
    </>
  );
};

export default MostPopularPost;
