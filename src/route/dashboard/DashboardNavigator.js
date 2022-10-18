import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import React from "react";

// screen
import Detail from "../../screen/post/detail/Detail";
import EditProfile from "../../screen/profile/edit/EditProfile";
import ShowProfile from "../../screen/profile/show/ShowProfile";
import BackButton from "../../component/os-mobile-app/backButton/BackButton";
import HeaderRight from "../../component/detail/headerRight/HeaderRight";

// constant
import { Colors } from "../../constant/Colors";

const Stack = createNativeStackNavigator();

const DashboardNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          component={BottomTabNavigator}
          name="BottomTab"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: true,
            title: "",
            headerLeft: () => <BackButton />,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="ShowProfile"
          component={ShowProfile}
          options={{
            headerTitle: "Show Profile",
            headerTransparent: true,
            headerTintColor: Colors.yellow,
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: "Edit Profile",
            headerTransparent: true,
            headerTintColor: Colors.yellow,
            headerLeft: () => <BackButton />,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default DashboardNavigator;
