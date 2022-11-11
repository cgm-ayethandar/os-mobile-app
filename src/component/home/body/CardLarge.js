import { Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import styles from "./style/CardLarge";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";
import { USDollar } from "../../../utils/CurrencyFormat";

const CardLarge = ({ id, img, name, price, isFavorite }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("Detail", { postId: id })}
      >
        <Image source={{ uri: img }} style={styles.image} />
        <Ionicons
          color={Colors.avocado}
          name={isFavorite ? Icons.like : Icons.unlike}
          size={25}
          style={styles.likeButton}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{USDollar.format(price)}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CardLarge;
