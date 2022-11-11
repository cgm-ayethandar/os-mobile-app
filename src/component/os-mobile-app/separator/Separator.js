import { View } from "react-native";
import React from "react";

// constant
import { Colors } from "../../../constant/Colors";

const Separator = () => {
  return (
    <View
      style={{ width: "100%", borderWidth: 0.5, borderColor: Colors.platinum }}
    ></View>
  );
};

export default Separator;
