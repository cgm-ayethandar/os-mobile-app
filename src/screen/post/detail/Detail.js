import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style/Detail";
import { AuthContext, CartContext } from "../../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// api
import { fetchPost, likePost, unlikePost } from "../../../api/PostApi";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

// component
import Separator from "../../../component/os-mobile-app/separator/Separator";
import CustomLoading from "../../../component/os-mobile-app/customLoading/CustomLoading";
import RenderIf from "../../../utils/RenderIf";

const Detail = ({ route }) => {
  const { postId } = route.params;
  const navigation = useNavigation();

  const [token, setToken] = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const increase = () => {
    // if (count == 0) {
    setCount(count + 1);
    // setCart([
    //   ...cart,
    //   {
    //     count: count,
    //     id: product.id,
    //     name: product.car_model,
    //     price: product.price,
    //     image: product.images && product.images[0].url,
    //   },
    // ]);
    // }
  };

  const getData = () => {
    setLoading(true);
    fetchPost(token, postId)
      .then((result) => {
        setProduct(result);
        setLoading(false);
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  };

  const handleLike = () => {
    if (product.isFavorite) {
      unlikePost(token, postId)
        .then((result) => {
          console.log(result);
          getData();
        })
        .catch((e) => {
          // show error message
          console.log(e.message);
        });
    } else {
      likePost(token, postId)
        .then((result) => {
          console.log(result);
          getData();
        })
        .catch((e) => {
          // show error message
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <RenderIf isTrue={loading}>
        <CustomLoading />
      </RenderIf>
      <RenderIf isTrue={!loading}>
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
                  navigation.navigate("ShowProfile", {
                    userId: product.user.id,
                  })
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
            <View style={styles.countContainer}>
              <Ionicons
                color={Colors.avocado}
                name={Icons.remove}
                size={28}
                onPress={increase}
              />
              <Text>{count}</Text>
              <Ionicons
                color={Colors.avocado}
                name={Icons.add}
                size={28}
                onPress={increase}
              />
            </View>
          </View>
        </View>
      </RenderIf>
    </>
  );
};

export default Detail;
