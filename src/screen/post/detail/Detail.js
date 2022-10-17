import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style/Detail";
import { AuthContext } from "../../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// api
import { fetchPost, likePost, unlikePost } from "../../../api/PostApi";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

// component
import Separator from "../../../component/os-mobile-app/separator/Separator";

const Detail = ({ route }) => {
  const { postId } = route.params;
  const navigation = useNavigation();

  const [token, setToken] = useContext(AuthContext);
  const [product, setProduct] = useState("");

  const handleLike = () => {
    if (product.isFavorite) {
      unlikePost(token, postId)
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          // show error message
          console.log(e.message);
        });
    } else {
      likePost(token, postId)
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          // show error message
          console.log(e.message);
        });
    }
  };

  useEffect(() => {
    fetchPost(token, postId)
      .then((result) => {
        setProduct(result);
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  });

  return (
    <>
      <View>
        <Image
          source={{ uri: product.images && product.images[0].url }}
          style={styles.image}
        />
        <View style={styles.detailContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.price}>$ {product.price}</Text>
            <TouchableOpacity onPress={handleLike}>
              <Ionicons
                color={Colors.avocado}
                name={product.isFavorite ? Icons.like : Icons.unlike}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>
            {product.manufacturer && product.manufacturer.name}{" "}
            {product.car_model}{" "}
            {product.plate_division && product.plate_division.name} ml
          </Text>
          <Separator />
          {product.user && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ShowProfile", { userId: product.user.id })
              }
            >
              <View style={styles.profile}>
                <Ionicons
                  color={Colors.avocado}
                  name={Icons.profile}
                  size={28}
                />
                <Text style={styles.profileText}>{product.user.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          <Separator />
        </View>
      </View>
    </>
  );
};

export default Detail;
