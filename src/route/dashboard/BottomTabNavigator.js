import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserContext } from "../../../App";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useContext } from "react";

// screen
import Cart from "../../screen/cart/Cart";
import Favorite from "../../screen/favorite/Favorite";
import Home from "../../screen/home/Home";
import Search from "../../screen/search/Search";

// component
import BackButton from "../../component/os-mobile-app/backButton/BackButton";
import ProfileIcon from "../../component/home/header/ProfileIcon";

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
            headerTitle: "",
            headerRight: () => <ProfileIcon profileImg={profileImg} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerLeft: () => <BackButton />,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerLeft: () => <BackButton />,
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            headerLeft: () => <BackButton />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
