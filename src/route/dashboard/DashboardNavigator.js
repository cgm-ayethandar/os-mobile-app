import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import React from "react";

// screen
import Detail from "../../screen/post/detail/Detail";
import EditProfile from "../../screen/profile/edit/EditProfile";
import ShowProfile from "../../screen/profile/show/ShowProfile";

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
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="ShowProfile" component={ShowProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </>
  );
};

export default DashboardNavigator;
