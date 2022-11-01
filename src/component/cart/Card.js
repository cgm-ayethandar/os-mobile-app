import { View, Image, Text } from "react-native";
import React from "react";
import styles from "./style/Card";
import Ionicons from "react-native-vector-icons/Ionicons";

// constant
import { Colors } from "../../constant/Colors";
import { Icons } from "../../constant/Icons";

const Card = ({ count, item, increase, reduce }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>{item.name} </Text>
          <Text style={styles.price}>{item.price} $</Text>
        </View>
        <View style={styles.countContainer}>
          <Ionicons
            color={Colors.brown}
            name={Icons.remove}
            size={28}
            onPress={reduce}
          />
          <Text style={styles.count}>{count}</Text>
          <Ionicons
            color={Colors.brown}
            name={Icons.add}
            size={28}
            onPress={increase}
          />
        </View>
      </View>
    </>
  );
};

export default Card;
