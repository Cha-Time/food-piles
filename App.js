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

const Stack = createNativeStackNavigator();

//Screens
import Start from "./components/Start";
import Login from "./components/Login";
import SignUpPartOne from "./components/SignUpPartOne";
import SignUpPartTwo from "./components/SignUpPartTwo";
/* import Map from "./components/Map";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";
import List from "./components/List"; */
import MainContainer from "./components/MainContainer";

function HomeToggle() {}

function App() {
  enableScreens();

  const [toggleHomeView, setToggleHomeView] = useState("map");

  //This navigator holds all pages not included on the tab bar.
  //The main map page with the tab bar is nested as a tab navigator within this stack navigator
  return (
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
          name="Home"
          initialParams={{ toggleHomeView }}
          component={MainContainer}
          options={({ route }) => {
            let routeTitle = getFocusedRouteNameFromRoute(route) || "Home";
            let routeIsHome = routeTitle === "Home";
            return routeIsHome
              ? {
                  headerTitle: routeTitle,
                  headerRight: () => {
                    const handleToggleHomeViewClick = () => {
                      if (toggleHomeView === "map") {
                        setToggleHomeView("list");
                      } else if (toggleHomeView === "list") {
                        setToggleHomeView("map");
                      }
                      Alert.alert(toggleHomeView);
                    };
                    return (
                      <Ionicons
                        name={toggleHomeView === "map" ? "globe" : "list"}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default App;
