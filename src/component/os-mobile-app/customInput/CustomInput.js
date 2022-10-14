import { View, TextInput } from "react-native";
import React from "react";
import styles from "./style/CustomInput";

const CustomInput = ({
  keyboardType,
  onChangeText,
  placeholder,
  secureTextEntry,
  value,
}) => {
  return (
    <>
      <View>
        <TextInput
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          value={value}
        />
      </View>
    </>
  );
};

export default CustomInput;
