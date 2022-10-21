import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style/Cart";
import { GlobalContext } from "../../provider/GlobalProvider";
import Card from "../../component/cart/Card";

// constant
import { Colors } from "../../constant/Colors";
import { Icons } from "../../constant/Icons";
import BackButton from "../../component/os-mobile-app/backButton/BackButton";
import RenderIf from "../../utils/RenderIf";
import CustomLoading from "../../component/os-mobile-app/customLoading/CustomLoading";

const Cart = () => {
  const navigation = useNavigation();
  const GLOBAL = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(GLOBAL.cartProducts);
  const [groupItemsInCart, setGroupItemsInCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedDelete, setSelectedDelete] = useState(false);

  const getData = () => {
    setProducts(GLOBAL.cartProducts);
    const groupItems = products.reduce((results, product) => {
      (results[product.id] = results[product.id] || []).push(product);
      return results;
    }, {});
    setGroupItemsInCart(groupItems);
    const cartTotal = products.reduce(
      (total, item) => (total += item.price),
      0
    );
    setTotal(cartTotal);
    console.log(groupItemsInCart);
    GLOBAL.setItemCount(Object.keys(groupItemsInCart).length);

    setSelectedDelete(false);
    console.log(GLOBAL.itemCount);
    setLoading(false);
  };

  const deleteAll = (id) => {
    const newCart = GLOBAL.cartProducts.filter((cp) => cp.id != id);
    GLOBAL.setCartProducts(newCart);

    getData();
    setSelectedDelete(false);
  };

  const increase = (item) => {
    setLoading(true);
    GLOBAL.cartProducts.push(item);
    console.log(GLOBAL.cartProducts);
    getData();
  };

  const reduce = (item) => {
    const index = GLOBAL.cartProducts.findIndex((cp) => cp.id === item.id);
    let newCart = [...GLOBAL.cartProducts];

    if (index >= 0) {
      newCart.splice(index, 1);
    } else {
      console.warn(`Can't remove product as its not in cart!`);
    }
    GLOBAL.setCartProducts(newCart);
    // isInCart();
    getData();
  };

  const isInCart = () => {
    const groupItems = products.reduce((results, product) => {
      (results[product.id] = results[product.id] || []).push(product);
      return results;
    }, {});
    setGroupItemsInCart(groupItems);

    GLOBAL.setItemCount(Object.keys(groupItemsInCart).length);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getData();
    });
  }, [groupItemsInCart]);

  console.log(groupItemsInCart);

  return (
    <>
      <RenderIf isTrue={loading}>
        <CustomLoading />
      </RenderIf>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerText}>Cart</Text>
          <Ionicons
            color={Colors.red}
            name={Icons.trash}
            size={30}
            onPress={() => setSelectedDelete(!selectedDelete)}
          />
        </View>
        {Object.entries(groupItemsInCart).map(([key, items]) => (
          <Card
            key={key}
            count={items.length}
            item={items[0]}
            selectedDelete={selectedDelete}
            increase={() => increase(items[0])}
            reduce={() => reduce(items[0])}
            deleteAll={() => deleteAll(items[0].id)}
          />
        ))}
        <RenderIf isTrue={Object.keys(groupItemsInCart).length > 0}>
          <View style={styles.footer}>
            <Text style={styles.itemCount}>
              {Object.keys(groupItemsInCart).length} items
            </Text>
            <Text style={styles.total}>{total} $</Text>
          </View>
        </RenderIf>
      </View>
    </>
  );
};

export default Cart;
