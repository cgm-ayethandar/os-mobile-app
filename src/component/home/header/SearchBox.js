import { View, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import styles from "./style/SearchBox";

// constant
import { Colors } from "../../../constant/Colors";

// utils
import RenderIf from "../../../utils/RenderIf";

const SearchBox = ({ value, onChangeText, onPress }) => {
  return (
    <>
      <View style={styles.container}>
        <Ionicons
          name="search"
          size={25}
          color={Colors.avocado}
          style={styles.search}
        />
        <TextInput
          onChangeText={onChangeText}
          placeholder={"Search Product Name"}
          style={styles.inputField}
          value={value}
        />
        <RenderIf isTrue={value != ""}>
          <Ionicons
            color={Colors.avocado}
            name="close-circle-outline"
            onPress={onPress}
            size={20}
            style={styles.close}
          />
        </RenderIf>
      </View>
    </>
  );
};

export default SearchBox;
