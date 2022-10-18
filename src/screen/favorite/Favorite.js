import { View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style/Favorite";
import { AuthContext } from "../../../App";

// api
import { fetchFavoritePost } from "../../api/PostApi";

// component
import CardSmall from "../../component/home/body/CardSmall";

const Favorite = () => {
  const [token, setToken] = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const handleLike = (id) => {
    unlikePost(token, id)
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  };

  useEffect(() => {
    fetchFavoritePost(token)
      .then((result) => {
        setProducts(result);
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  });

  const ItemView = ({ item }) => {
    return (
      <CardSmall
        id={item.id}
        img={item.images[0].url}
        isFavorite={item.isFavorite}
        name={item.car_model}
        price={item.price}
        onPress={() => handleLike(item.id)}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={products}
          enableEmptySections={true}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={ItemView}
        />
      </View>
    </>
  );
};

export default Favorite;
