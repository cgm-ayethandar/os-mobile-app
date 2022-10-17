import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

// Constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <>
      <View>
        <Ionicons
          color={Colors.yellow}
          name={Icons.back}
          onPress={() => navigation.goBack()}
          size={28}
        />
      </View>
    </>
  );
};

export default BackButton;
