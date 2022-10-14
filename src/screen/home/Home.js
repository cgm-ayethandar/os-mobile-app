import { AuthContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style/Home";

// api
import { fetchAllPosts } from "../../api/PostApi";

// component
import CardLarge from "../../component/home/body/CardLarge";
import CardSmall from "../../component/home/body/CardSmall";
import MostPopularPost from "../../component/home/body/MostPopularPost";
import SearchBox from "../../component/home/header/SearchBox";
import Title from "../../component/home/body/Title";

const Home = () => {
  const navigation = useNavigation();

  const [token, setToken] = useContext(AuthContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllPosts(token)
      .then((result) => {
        setLatestProducts(result.data.slice(0, 3));
        setProducts(result.data);
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
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        {/* Search */}
        <SearchBox onChangeText={() => navigation.navigate("Search")} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Most popular post */}
          <MostPopularPost />

          {/* Latest Uploads */}
          <Title text={"Latest Uploads"} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {latestProducts.map((product) => (
              <CardLarge
                id={product.id}
                img={product.images[0].url}
                isFavorite={product.isFavorite}
                name={product.car_model}
                price={product.price}
              />
            ))}
          </ScrollView>

          {/* All products */}
          <Title text={"All Products"} />
          <FlatList
            data={products}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            renderItem={ItemView}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
