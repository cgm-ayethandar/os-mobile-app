import { AuthContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style/Home";

// api
import { fetchAllPosts, fetchMorePosts } from "../../api/PostApi";
import { fetchPopularPosts } from "../../api/PostApi";

// component
import CardLarge from "../../component/home/body/CardLarge";
import CardSmall from "../../component/home/body/CardSmall";
import LatestUploads from "../../component/home/body/LatestUploads";
import SearchBox from "../../component/home/header/SearchBox";
import Title from "../../component/home/body/Title";
import RenderIf from "../../utils/RenderIf";
import { Colors } from "../../constant/Colors";
import CustomLoading from "../../component/os-mobile-app/customLoading/CustomLoading";

const Home = () => {
  const navigation = useNavigation();

  const [token, setToken] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  const getMoreProducts = () => {
    fetchMorePosts(token, nextPage)
      .then((result) => {
        console.log(result);
        setProducts([...products, ...result.data]);
        setNextPage(result.links.next);
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  };

  const getInitialData = () => {
    setLoading(true);
    fetchAllPosts(token)
      .then((result) => {
        setLoading(true);
        setLatestProducts(result.data.slice(0, 3));
        setProducts(result.data);
        setNextPage(result.links.next);
        setLoading(false);
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
    fetchPopularPosts(token)
      .then((result) => {
        setLoading(true);
        setPopularProducts(result);
        setLoading(false);
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getInitialData();
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
          {/* Search */}
          <SearchBox onChangeText={() => navigation.navigate("Search")} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Latest Uploads */}
            <Title text={"Latest Uploads"} />
            <LatestUploads products={latestProducts} />

            {/* Popular posts */}
            <Title text={"Popular products"} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {popularProducts.map((product) => (
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
              onEndReached={getMoreProducts}
              numColumns={2}
              renderItem={ItemView}
            />
          </ScrollView>
        </View>
      </RenderIf>
    </>
  );
};

export default Home;
