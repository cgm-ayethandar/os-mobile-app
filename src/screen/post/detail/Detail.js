import { View, Text } from "react-native";
import React from "react";
import styles from "./style/Detail";

const Detail = ({ route }) => {
  const { postId } = route.params;

  return (
    <>
      <View style={styles.container}>
        <Text>Detail</Text>
        <Text>{postId}</Text>
      </View>
    </>
  );
};

export default Detail;
