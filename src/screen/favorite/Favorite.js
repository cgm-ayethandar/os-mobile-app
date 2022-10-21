import { AuthContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style/Favorite";

// api
import { fetchFavoritePost, unlikePost } from "../../api/PostApi";

// component
import CardSmall from "../../component/home/body/CardSmall";
import RenderIf from "../../utils/RenderIf";
import CustomLoading from "../../component/os-mobile-app/customLoading/CustomLoading";

const Favorite = () => {
  const navigation = useNavigation();

  const [token, setToken] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const handleLike = (id) => {
    unlikePost(token, id)
      .then((result) => {
        console.log(result);
        getData();
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  };

  const getData = () => {
    setLoading(true);
    fetchFavoritePost(token)
      .then((result) => {
        setProducts(result);
        setLoading(false);
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getData();
    });
  }, []);

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
      <RenderIf isTrue={loading}>
        <CustomLoading />
      </RenderIf>
      <RenderIf isTrue={!loading}>
        <View style={styles.container}>
          <FlatList
            data={products}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={ItemView}
          />
        </View>
      </RenderIf>
    </>
  );
};

export default Favorite;
