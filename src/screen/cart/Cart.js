import { View, Text, ScrollView } from "react-native";
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
import CustomButton from "../../component/os-mobile-app/customButton/CustomButton";

const Cart = () => {
  const navigation = useNavigation();
  const GLOBAL = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [groupItemsInCart, setGroupItemsInCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedDelete, setSelectedDelete] = useState(false);

  const getTotal = () => {
    return GLOBAL.cartProducts.reduce(
      (total, item) => (total += item.price),
      0
    );
  };

  const updateItemCount = () => {
    // GLOBAL.setItemCount(Object.keys(groupItemsInCart).length);
    GLOBAL.itemCount = Object.keys(groupItemsInCart).length;
  };

  const getGroupItemsInCart = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const groupItems = GLOBAL.cartProducts.reduce((results, product) => {
          (results[product.id] = results[product.id] || []).push(product);
          return results;
        }, {});
        resolve(groupItems);
      } catch (error) {
        reject(console.log(error));
      }
    });
  };

  const updateGroupItems = () => {
    getGroupItemsInCart()
      .then((result) => {
        setGroupItemsInCart(result);
      })
      .catch((e) => {
        // show error message
        console.log(e);
      });
    console.log("g");
  };

  const getData = () => {
    updateGroupItems();
    setTotal(getTotal());
    updateItemCount();
    setSelectedDelete(false);
    setLoading(false);
  };

  const deleteAll = (id) => {
    let index = 0;
    while (index >= 0) {
      index = GLOBAL.cartProducts.findIndex((cp) => cp.id === id);

      if (index >= 0) {
        GLOBAL.cartProducts.splice(index, 1);
      }
    }
    getData();
  };

  const increase = (item) => {
    setLoading(true);
    GLOBAL.cartProducts.push(item);
    getData();
  };

  const reduceProduct = (id) => {
    return new Promise(async (resolve, reject) => {
      let newCart = [...GLOBAL.cartProducts];
      try {
        const index = GLOBAL.cartProducts.findIndex((cp) => cp.id === id);

        if (index >= 0) {
          newCart.splice(index, 1);
        } else {
          console.warn(`Can't remove product as its not in cart!`);
        }
        resolve(newCart);
      } catch (error) {
        reject(console.log(error));
      }
    });
  };

  const reduce = (item) => {
    const index = GLOBAL.cartProducts.findIndex((cp) => cp.id === item.id);

    if (index >= 0) {
      GLOBAL.cartProducts.splice(index, 1);
      getData();
      updateItemCount();
    } else {
      console.warn(`Can't remove product as its not in cart!`);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getData();
    });
  });

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productContainer}
        >
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
        </ScrollView>
        <RenderIf isTrue={Object.keys(groupItemsInCart).length > 0}>
          <View style={styles.footer}>
            <View style={styles.footerText}>
              <Text style={styles.itemCount}>
                {Object.keys(groupItemsInCart).length} items:
              </Text>
              <Text style={styles.total}>{total} $</Text>
            </View>
            <CustomButton
              text={"Place order"}
              // onPress={() => navigation.navigate("Cart")}
              bgColor={Colors.brown}
            />
          </View>
        </RenderIf>
      </View>
    </>
  );
};

export default Cart;
