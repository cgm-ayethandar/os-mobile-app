import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, createContext, useEffect } from "react";

// route
import AuthNavigator from "./src/route/auth/AuthNavigator";
import DashboardNavigator from "./src/route/dashboard/DashboardNavigator";

// api
import { fetchUserProfile } from "./src/api/AuthApi";

// utils
import RenderIf from "./src/utils/RenderIf";
import { getToken } from "./src/utils/Token";
import { GlobalProvider } from "./src/provider/GlobalProvider";
import { Provider } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();
export const UserContext = createContext();
export const SelectedIdsContext = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const deleteToken = async () => {
    await AsyncStorage.removeItem("token");
    setToken(await AsyncStorage.getItem("token"));
  };

  useEffect(() => {
    getToken()
      .then((result) => {
        setToken(result);
      })
      .catch((e) => {
        console.log(e);
      });
    if (token) {
      console.log(token);
      fetchUserProfile(token)
        .then((result) => {
          setProfileImg(result.image);
        })
        .catch((e) => {
          // show error message
          console.log(e.message?.errors);
        });
    }
  });

  return (
    <>
      {/* <GlobalProvider> */}
      <Provider store={store}>
        <AuthContext.Provider value={[token, setToken]}>
          <UserContext.Provider value={[profileImg, setProfileImg]}>
            <SelectedIdsContext.Provider value={[selectedIds, setSelectedIds]}>
              <NavigationContainer>
                <RenderIf isTrue={token == null}>
                  <Stack.Navigator>
                    <Stack.Screen
                      component={AuthNavigator}
                      name="Auth"
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                </RenderIf>
                <RenderIf isTrue={token != null}>
                  <Stack.Navigator>
                    <Stack.Screen
                      component={DashboardNavigator}
                      name="Dashboard"
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                </RenderIf>
              </NavigationContainer>
            </SelectedIdsContext.Provider>
          </UserContext.Provider>
        </AuthContext.Provider>
      </Provider>
      {/* </GlobalProvider> */}
    </>
  );
};

export default App;
