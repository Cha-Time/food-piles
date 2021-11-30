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

function HomeToggle({ currentRoute }) {
  let MyRoute = currentRoute || "Home";
  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  if (MyRoute === "Home") {
    return (
      <Ionicons
        name="list"
        size={25}
        color="black"
        onPress={() => createTwoButtonAlert()}
      />
    );
  } else {
    return <View></View>;
  }
}

function App() {
  enableScreens();
  const [toggleView, setToggleView] = useState("map");
  //This navigator holds all pages not included on the tab bar.
  //The main map page with the tab bar is nested as a tab navigator within this stack navigator
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpPartOne" component={SignUpPartOne} options={{ headerShown: false }} />
  <Stack.Screen name="SignUpPartTwo" component={SignUpPartTwo} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="Home"
          component={MainContainer}
          options={({ route }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerRight: () => (
              <HomeToggle currentRoute={getFocusedRouteNameFromRoute(route)} />
            ),
          })}
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
