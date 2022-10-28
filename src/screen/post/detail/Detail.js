import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style/Detail";
import { AuthContext } from "../../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

// api
import { fetchPost, likePost, unlikePost } from "../../../api/PostApi";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

// component
import Separator from "../../../component/os-mobile-app/separator/Separator";
import CustomLoading from "../../../component/os-mobile-app/customLoading/CustomLoading";
import RenderIf from "../../../utils/RenderIf";
import CustomButton from "../../../component/os-mobile-app/customButton/CustomButton";
import {
  addToCart,
  removeFromCart,
  selectCartItemsWithId,
} from "../../../feature/cartSlice";

const Detail = ({ route }) => {
  const { postId } = route.params;
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [token, setToken] = useContext(AuthContext);
  const [product, setProduct] = useState("");
  const items = useSelector((state) => selectCartItemsWithId(state, postId));
  const [loading, setLoading] = useState(false);

  const increase = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.car_model,
        price: product.price,
        image: product.images && product.images[0].url,
      })
    );
  };

  const reduce = () => {
    if (!items.length > 0) return;

    dispatch(removeFromCart(postId));
  };

  const getData = () => {
    // setLoading(true);
    fetchPost(token, postId)
      .then((result) => {
        setProduct(result);
        // setLoading(false);
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
              {product.car_model}
            </Text>
            <Text style={styles.ml}>
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
            <View style={styles.addToCart}>
              <View style={styles.countContainer}>
                <Ionicons
                  color={Colors.avocado}
                  name={Icons.remove}
                  size={32}
                  onPress={reduce}
                />
                <Text style={styles.countText}>{items.length}</Text>
                <Ionicons
                  color={Colors.avocado}
                  name={Icons.add}
                  size={32}
                  onPress={increase}
                />
              </View>
              <CustomButton
                text={"Add to cart"}
                onPress={() => navigation.navigate("Cart")}
                bgColor={Colors.brown}
              />
            </View>
          </View>
        </View>
      </RenderIf>
    </>
  );
};

export default Detail;
