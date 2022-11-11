import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import Checkbox from "../../component/os-mobile-app/checkbox/Checkbox";
import { SelectedIdsContext } from "../../../App";
import { USDollar } from "../../utils/CurrencyFormat";

const Cart = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const products = useSelector(groupedItemsInCart);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedIds, setSelectedIds] = useContext(SelectedIdsContext);
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    let result = 0;
    Object.entries(products).map(([key, items]) => {
      selectedIds.map((sid) => {
        if (sid == key) {
          result = result + items[0].price * items.length;
        }
      });
    });
    return result;
  };

  useEffect(() => {
    setTotal(getTotal);
  }, [products, selectedIds]);

  const deleteAll = () => {
    selectedIds.map((sid) => dispatch(deleteFromCart(sid)));
    setSelectedIds([]);
  };

  const increase = (item) => {
    dispatch(addToCart(item));
  };

  const reduce = (id) => {
    dispatch(removeFromCart(id));
  };

  const placeOrder = () => {
    deleteAll();
    setShowDetail(false);
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
            // onPress={() => setSelectedDelete(!selectedDelete)}
            onPress={deleteAll}
          />
        </View>
        <OrderDetail
          showDetail={showDetail}
          close={() => setShowDetail(false)}
          placeOrder={placeOrder}
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
              <View style={styles.itemContainer}>
                <Checkbox id={items[0].id} />
                <Card
                  key={key}
                  count={items.length}
                  item={items[0]}
                  increase={() => increase(items[0])}
                  reduce={() => reduce(items[0].id)}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.footerText}>
              <Text style={styles.itemCount}>
                {/* {Object.keys(products).length}{" "}
                {Object.keys(products).length > 1 ? "items" : "item"} */}
                {selectedIds.length} {selectedIds.length > 1 ? "items" : "item"}
              </Text>
              {/* <Text style={styles.total}>{cartTotal} $</Text> */}
              <Text style={styles.total}>{USDollar.format(total)}</Text>
            </View>
            <CustomButton
              onPress={() => setShowDetail(true)}
              text={"Checkout"}
              bgColor={Colors.yellow}
            />
          </View>
        </RenderIf>
      </View>
    </>
  );
};

export default Cart;
