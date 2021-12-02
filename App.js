import * as React from "react";
import { useState, useEffect } from "react";
import { StatusBar, StyleSheet, Button, Alert, Text, View } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

//Screens
import Start from "./components/Start";
import Login from "./components/Login";
import SignUpPartOne from "./components/SignUpPartOne";
import SignUpPartTwo from "./components/SignUpPartTwo";
import SignUpPartThree from "./components/SignUpPartThree";
import SignUpPartFour from "./components/SignUpPartFour";
import Welcome from "./components/Welcome";
import Map from "./components/Map";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";
import List from "./components/List";
import MainContainer from "./components/MainContainer";
import OrganizationView from "./components/OrganizationView";

// import the storer
import { Provider } from "react-redux";
import store from "./store";
import { setHomeView } from "./store/homepageView";

function App() {
  enableScreens();

  //This navigator holds all pages not included on the tab bar.
  //The main map page with the tab bar is nested as a tab navigator within this stack navigator
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpPartOne"
            component={SignUpPartOne}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpPartTwo"
            component={SignUpPartTwo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpPartThree"
            component={SignUpPartThree}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpPartFour"
            component={SignUpPartFour}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={MainContainer}
            options={({ route }) => {
              let routeTitle = getFocusedRouteNameFromRoute(route) || "Home";
              let routeIsHome = routeTitle === "Home";
              return routeIsHome
                ? {
                    headerTitle: routeTitle,
                    headerRight: () => {
                      const dispatch = useDispatch();
                      const pageViewStore = useSelector(
                        (state) => state.homepageView
                      );
                      const handleToggleHomeViewClick = () => {
                        if (pageViewStore.toggleView === "map") {
                          dispatch(setHomeView("list"));
                        } else if (pageViewStore.toggleView === "list") {
                          dispatch(setHomeView("map"));
                        }
                      };
                      return (
                        <Ionicons
                          name={
                            pageViewStore.toggleView === "map"
                              ? "list"
                              : "globe"
                          }
                          size={25}
                          color="black"
                          onPress={() => handleToggleHomeViewClick()}
                        />
                      );
                    },
                  }
                : {
                    headerTitle: routeTitle,
                  };
            }}
          />
          <Stack.Screen name="OrgView" component={OrganizationView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default App;
