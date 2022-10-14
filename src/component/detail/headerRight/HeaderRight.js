import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          color={Colors.yellow}
          name={Icons.search}
          onPress={() => navigation.navigate("Search")}
          size={24}
        />
        <Ionicons
          color={Colors.yellow}
          name={Icons.cart}
          onPress={() => navigation.navigate("Cart")}
          size={24}
        />
      </View>
    </>
  );
};

export default HeaderRight;
