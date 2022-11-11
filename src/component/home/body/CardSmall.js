import { Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import styles from "./style/CardSmall";

// constant
import { Colors } from "../../../constant/Colors";
import { Icons } from "../../../constant/Icons";
import { USDollar } from "../../../utils/CurrencyFormat";

const CardSmall = ({ id, img, name, price, isFavorite, onPress }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { postId: id })}
        style={styles.container}
      >
        <Image source={{ uri: img }} style={styles.image} />
        <Ionicons
          color={Colors.avocado}
          name={isFavorite ? Icons.like : Icons.unlike}
          onPress={onPress}
          size={25}
          style={styles.likeButton}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{USDollar.format(price)}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CardSmall;
