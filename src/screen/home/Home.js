import { AuthContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style/Home";

// api
import {
  fetchAllPosts,
  fetchBuildTypes,
  fetchMorePosts,
} from "../../api/PostApi";
import { fetchPopularPosts } from "../../api/PostApi";

// component
import CardLarge from "../../component/home/body/CardLarge";
import CardSmall from "../../component/home/body/CardSmall";
import LatestUploads from "../../component/home/body/LatestUploads";
import ProfileIcon from "../../component/home/header/ProfileIcon";
import SearchBox from "../../component/home/header/SearchBox";
import Title from "../../component/home/body/Title";
import RenderIf from "../../utils/RenderIf";
import { Colors } from "../../constant/Colors";
import CustomLoading from "../../component/os-mobile-app/customLoading/CustomLoading";
import Category from "../../component/home/body/Category";
import VirtualizedList from "./VirtualizedList";

const Home = () => {
  const navigation = useNavigation();
  const [profileImg, setProfileImg] = useContext(UserContext);

  const [token, setToken] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  const getMoreProducts = () => {
    fetchMorePosts(token, nextPage)
      .then((result) => {
        setProducts([...products, ...result.data]);
        setNextPage(result.links.next);
      })
      .catch((e) => {
        // show error message
        console.log(e.message);
      });
  };

  const getCategories = () => {
    fetchBuildTypes()
      .then((result) => {
        setCategories(result.data.slice(0, 8));
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
    getCategories();
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getInitialData();
    });
  }, []);

  const renderFooter = () => {
    if (!nextPage) {
      return (
        <View style={styles.footer}>
          <Ionicons
            name="checkmark-done-circle-outline"
            size={80}
            color={Colors.avocado}
          />
          <Text style={styles.footerHeader}>You're all Caught Up</Text>
        </View>
      );
    }
    // Loading for next Downlaod
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={Colors.avocado} />
      </View>
    );
  };

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
          <View style={styles.header}>
            <SearchBox onChangeText={() => navigation.navigate("Search")} />
            <ProfileIcon profileImg={profileImg} />
          </View>
          <VirtualizedList>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            {/* Categories */}
            <Title text={"Categories"} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {categories.map((category) => (
                <Category key={category.id} category={category} />
              ))}
            </ScrollView>

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
                  key={product.id}
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
              ListFooterComponent={renderFooter}
            />
          {/* </ScrollView> */}
        </VirtualizedList>
        </View>
      </RenderIf>
    </>
  );
};

export default Home;
