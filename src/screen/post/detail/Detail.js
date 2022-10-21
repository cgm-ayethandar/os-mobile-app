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
import CustomLoading from "../../../component/os-mobile-app/customLoading/CustomLoading";
import RenderIf from "../../../utils/RenderIf";
import { GlobalContext } from "../../../provider/GlobalProvider";
import CustomButton from "../../../component/os-mobile-app/customButton/CustomButton";

const Detail = ({ route }) => {
  const GLOBAL = useContext(GlobalContext);
  const products = GLOBAL.cartProducts;
  const { postId } = route.params;
  const navigation = useNavigation();

  const [token, setToken] = useContext(AuthContext);
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [groupItemsInCart, setGroupItemsInCart] = useState([]);
  const [itemArr, setItemArr] = useState([]);
  const [item, setItem] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
  });

  const increase = () => {
    GLOBAL.cartProducts.push(item);
    console.log(GLOBAL.cartProducts);
    isInCart();
  };

  const reduce = () => {
    if (count > 0) {
      const index = GLOBAL.cartProducts.findIndex((cp) => cp.id === product.id);
      let newCart = [...GLOBAL.cartProducts];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(`Can't remove product as its not in cart!`);
      }
      GLOBAL.setCartProducts(newCart);
      isInCart();
    }
    count > 0 ? setCount(count - 1) : setCount(0);
  };

  const isInCart = () => {
    setItemArr(
      GLOBAL.cartProducts.filter((cp) => {
        return cp.id == product.id;
      })
    );
    setCount(itemArr.length);

    const groupItems = products.reduce((results, product) => {
      (results[product.id] = results[product.id] || []).push(product);
      return results;
    }, {});
    setGroupItemsInCart(groupItems);

    GLOBAL.setItemCount(Object.keys(groupItemsInCart).length);

    setItem({
      id: product.id,
      name: product.car_model,
      price: product.price,
      image: product.images && product.images[0].url,
    });
  };

  const getData = () => {
    // setLoading(true);
    fetchPost(token, postId)
      .then((result) => {
        setProduct(result);
        // setLoading(false);
        isInCart();
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
  }, [itemArr]);

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
                <Text style={styles.countText}>{count}</Text>
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
