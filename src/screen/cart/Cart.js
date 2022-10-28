import { View, Text, ScrollView } from "react-native";
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
import CustomButton from "../../component/os-mobile-app/customButton/CustomButton";
import NoProduct from "../../component/cart/NoProduct";
import OrderDetail from "../../component/cart/OrderDetail";

const Cart = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const products = useSelector(groupedItemsInCart);
  const [loading, setLoading] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

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
        <OrderDetail
          showDetail={showDetail}
          close={() => setShowDetail(false)}
        />

        <RenderIf isTrue={Object.keys(products).length <= 0}>
          <NoProduct />
        </RenderIf>
        <RenderIf isTrue={Object.keys(products).length > 0}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productContainer}
          >
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
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.footerText}>
              <Text style={styles.itemCount}>
                {Object.keys(products).length}{" "}
                {Object.keys(products).length > 1 ? "items" : "item"}
              </Text>
              <Text style={styles.total}>{cartTotal} $</Text>
            </View>
            <CustomButton
              onPress={() => setShowDetail(true)}
              text={"Place order"}
              bgColor={Colors.yellow}
            />
          </View>
        </RenderIf>
      </View>
    </>
  );
};

export default Cart;
