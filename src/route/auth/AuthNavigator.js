import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//screen
import Login from "../../screen/auth/login/Login";
import Register from "../../screen/auth/register/Register";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;
