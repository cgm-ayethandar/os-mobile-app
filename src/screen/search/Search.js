import { View, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style/Search";

// api
import { actionSearch } from "../../api/PostApi";

// component
import SearchBox from "../../component/home/header/SearchBox";
import CardSmall from "../../component/home/body/CardSmall";
import RenderIf from "../../utils/RenderIf";

const Search = () => {
  const [text, setText] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(text);
    if (text == "") {
      setProducts([]);
    } else {
      actionSearch(text)
        .then((result) => {
          console.log(text);
          console.log(result);
          setProducts(result.data);
        })
        .catch((e) => {
          // show error message
          console.log(e);
        });
    }
  }, [text]);

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
        <SearchBox
          value={text}
          onChangeText={setText}
          onPress={() => setText("")}
        />
        <RenderIf isTrue={products.length != 0}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Search Result: {text}</Text>
          </View>
        </RenderIf>
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

export default Search;
