import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import Map from "./Map";
import Chat from "./Chat";
import Profile from "./Profile";
import Favorites from "./Favorites";
import List from "./List";

//Screen names
const homeName = "Home";
const chatName = "Chat";
const profileName = "Profile";
const favoriteName = "Favorites";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn == profileName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn == favoriteName) {
            iconName = focused ? "heart" : "heart-outline";
          } else if (rn == chatName) {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Map} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={List} />
    </Tab.Navigator>
  );
};

export default MainContainer;
