import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserContext } from "../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useContext } from "react";

// screen
import Cart from "../../screen/cart/Cart";
import Favorite from "../../screen/favorite/Favorite";
import Home from "../../screen/home/Home";
import ProfileIcon from "../../component/home/header/ProfileIcon";
import Search from "../../screen/search/Search";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [profileImg, setProfileImg] = useContext(UserContext);

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
            title: "",
            headerRight: () => <ProfileIcon profileImg={profileImg} />,
          }}
        />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Favorite" component={Favorite} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
