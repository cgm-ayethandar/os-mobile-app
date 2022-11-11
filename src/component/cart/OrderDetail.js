import { View, Text, Modal, Alert, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style/OrderDetail";
import { Colors } from "../../constant/Colors";
import { Icons } from "../../constant/Icons";
import Separator from "../os-mobile-app/separator/Separator";
import CustomButton from "../os-mobile-app/customButton/CustomButton";
import { useSelector } from "react-redux";
import { groupedItemsInCart } from "../../feature/cartSlice";
import { SelectedIdsContext } from "../../../App";
import RenderIf from "../../utils/RenderIf";

const OrderDetail = ({ showDetail, close, placeOrder }) => {
  const products = useSelector(groupedItemsInCart);
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

  return (
    <>
      <RenderIf isTrue={selectedIds.length > 0 && showDetail}>
        <Modal
          animationType="none"
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
          transparent={true}
          visible={showDetail}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <Text style={styles.modalText}>Order Detail</Text>
                <Ionicons
                  name={Icons.close}
                  onPress={close}
                  size={25}
                  color={Colors.gray}
                />
              </View>
              {Object.entries(products).map(([key, items]) => {
                return selectedIds.map((sid) => {
                  if (sid == key) {
                    return (
                      <>
                        <View key={key} style={styles.detail}>
                          <View style={styles.product}>
                            <Text style={styles.boldText}>{items[0].name}</Text>
                          </View>
                          <View style={styles.quantity}>
                            <Text style={styles.grayText}>
                              {items.length}pcs
                            </Text>
                            <Text style={styles.grayText}>
                              ${items[0].price * items.length}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.separator}>
                          <Separator />
                        </View>
                      </>
                    );
                  }
                });
              })}
              <View style={styles.total}>
                <Text style={styles.grayText}>Total</Text>
                <Text style={styles.boldText}>${total}</Text>
              </View>
              <View style={styles.button}>
                <CustomButton
                  onPress={placeOrder}
                  text={"Place Order"}
                  bgColor={Colors.avocado}
                  blockButton
                />
              </View>
            </View>
          </View>
        </Modal>
      </RenderIf>
    </>
  );
};

export default OrderDetail;
