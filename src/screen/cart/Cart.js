import { View, Text } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style/Cart";
import Card from "../../component/cart/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  groupedItemsInCart,
  selectCartTotal,
  addToCart,
  removeFromCart,
  deleteFromCart,
} from "../../feature/cartSlice";

// constant
import { Colors } from "../../constant/Colors";
import { Icons } from "../../constant/Icons";
import BackButton from "../../component/os-mobile-app/backButton/BackButton";
import RenderIf from "../../utils/RenderIf";
import CustomLoading from "../../component/os-mobile-app/customLoading/CustomLoading";

const Cart = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const products = useSelector(groupedItemsInCart);
  const [loading, setLoading] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(false);

  const deleteAll = (id) => {
    dispatch(deleteFromCart(id));
    setSelectedDelete(!selectedDelete);
  };

  const increase = (item) => {
    dispatch(addToCart(item));
  };

  const reduce = (id) => {
    dispatch(removeFromCart(id));
  };

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
        {Object.entries(products).map(([key, items]) => (
          <Card
            key={key}
            count={items.length}
            item={items[0]}
            selectedDelete={selectedDelete}
            increase={() => increase(items[0])}
            reduce={() => reduce(items[0].id)}
            deleteAll={() => deleteAll(items[0].id)}
          />
        ))}
        <RenderIf isTrue={Object.keys(products).length > 0}>
          <View style={styles.footer}>
            <Text style={styles.itemCount}>
              {Object.keys(products).length} items
            </Text>
            <Text style={styles.total}>{cartTotal} $</Text>
          </View>
        </RenderIf>
      </View>
    </>
  );
};

export default Cart;
