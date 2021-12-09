import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

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
  const pageViewStore = useSelector((state) => state.homepageView);
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      tabBarOptions={{
        activeTintColor: "#e64951",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let rn = route.name;
          {
            /*This assigns icons to each page on the tab. The icon is filled in or outlined depending on if its selected */
          }
          if (rn === homeName) {
            iconName = focused ? "map" : "map-outline";
          } else if (rn == profileName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn == favoriteName) {
            iconName = focused ? "heart" : "heart-outline";
          } else if (rn == chatName) {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          }
          return (
            <View>
              <Ionicons
                name={iconName}
                size={size}
                color={"#fa7376"}
                style={styles.icon}
              />
              {rn == profileName ? (
                <Ionicons
                  name="ellipse"
                  size={10}
                  color={pageViewStore.availability ? "green" : "grey"}
                  style={styles.status}
                />
              ) : (
                <View></View>
              )}
            </View>
          );
        },
      })}
    >
      {/*These are all of the tabs on the homepage navbar */}
      <Tab.Screen name={"Home"} component={Map} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  status: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
