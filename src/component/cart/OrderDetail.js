import { View, Text, Modal, Alert, Pressable } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style/OrderDetail";
import { Colors } from "../../constant/Colors";
import { Icons } from "../../constant/Icons";
import Separator from "../os-mobile-app/separator/Separator";

const OrderDetail = ({ showDetail, close }) => {
  return (
    <>
      <Modal
        animationType="none"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        transparent={true}
        visible={showDetail}
      >
        <Pressable onPress={close} style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.modalText}>Order Detail</Text>
              <Ionicons name={Icons.close} size={25} color={Colors.gray} />
            </View>
            <Separator />
            <View></View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default OrderDetail;
