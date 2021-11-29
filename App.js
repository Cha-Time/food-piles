import * as React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

//Screens
import Map from "./components/Map";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Favorites from "./Components/Favorites";
import List from "./components/List";
import MainContainer from "./components/MainContainer";

function App() {
  enableScreens();
  //This navigator holds all pages not included on the tab bar.
  //The main map page with the tab bar is nested as a tab navigator within this stack navigator
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{ headerShown: false }}
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
