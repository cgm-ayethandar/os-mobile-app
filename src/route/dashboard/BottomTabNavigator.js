import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserContext } from "../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { groupedItemsInCart } from "../../feature/cartSlice";

// screen
import Cart from "../../screen/cart/Cart";
import Favorite from "../../screen/favorite/Favorite";
import Home from "../../screen/home/Home";
import Search from "../../screen/search/Search";

// component
import BackButton from "../../component/os-mobile-app/backButton/BackButton";
import ProfileIcon from "../../component/home/header/ProfileIcon";

// constant
import { Colors } from "../../constant/Colors";
import { GlobalContext } from "../../provider/GlobalProvider";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const GLOBAL = useContext(GlobalContext);

  const products = useSelector(groupedItemsInCart);
  const [profileImg, setProfileImg] = useContext(UserContext);
  const tabLabels = {
    home: "Home",
    search: "Search",
    cart: "Cart",
    favorite: "Favorite",
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // headerShown: false,
          headerTransparent: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Favorite") {
              iconName = focused ? "heart" : "heart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#558303",
          tabBarInactiveTintColor: "#F2E880",
          tabBarLabel: tabLabels[route.name.toLowerCase()],
          tabBarStyle: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderTopWidth: 0,
            elevation: 0,
            paddingTop: 5,
            shadowColor: "#558303",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          },
        })}
      >
        <Tab.Screen
          component={Home}
          name="Home"
          options={{
            headerTitle: "",
            headerRight: () => <ProfileIcon profileImg={profileImg} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerLeft: () => (
              <View style={{ marginLeft: 8, marginTop: 5 }}>
                <BackButton />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
            tabBarBadge: Object.keys(products).length,
            tabBarBadgeStyle:
              Object.keys(products).length > 0
                ? { backgroundColor: Colors.brown }
                : { opacity: 0 },
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            headerLeft: () => (
              <View style={{ marginLeft: 8, marginTop: 5 }}>
                <BackButton />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
