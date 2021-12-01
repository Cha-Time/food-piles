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

const MainContainer = ({ route, navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          {
            /*This assigns icons to each page on the tab. The icon is filled in or outlined depending on if its selected */
          }
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
      {/*These are all of the tabs on the homepage navbar */}
      <Tab.Screen
        name={"Home"}
        component={Map}
        initialParams={{ toggleHomeView: route.params.toggleHomeView }}
      />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainContainer;
