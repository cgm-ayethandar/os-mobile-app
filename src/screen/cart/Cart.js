import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import styles from "./style/Cart";
import { CartContext } from "../../../App";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);

  // useEffect(() => {
  //   setCart([]);
  // }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Cart</Text>
      </View>
    </>
  );
};

export default Cart;
