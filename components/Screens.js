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
import { connect, useDispatch, useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

//Screens
import Start from "./Start";
import Login from "./Login";
import SignUp from "./SignUp";
import Welcome from "./Welcome";
import MainContainer from "./MainContainer";
import OrganizationView from "./OrganizationView";
import ChatView from "./ChatView";

import { setHomeView } from "../store/homepageView";
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "../store/Favorites";

const Screens = (props) => {
  enableScreens();

  const { isLoggedIn } = props;

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
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
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
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
          <Stack.Screen
            name="OrgView"
            component={OrganizationView}
            options={({ route }) => {
              return {
                headerTitle: "More Info",
                headerRight: () => {
                  const currentOrgInfo = useSelector(
                    (state) => state.singleOrg
                  );

                  const dispatch = useDispatch();

                  useEffect(() => {
                    (async () => {
                      await dispatch(fetchFavorites());
                    })();
                  }, []);

                  const userFavorites = useSelector((state) => state.favorites);

                  const isFavorited = userFavorites.filter(
                    (favoriteOrg) => favoriteOrg.id === currentOrgInfo.id
                  ).length;

                  console.log(isFavorited);

                  const handleToggleFavorite = () => {
                    if (isFavorited) {
                      dispatch(removeFavorite(currentOrgInfo.id));
                      console.log("unfavoriting " + currentOrgInfo.id);
                    } else {
                      dispatch(addFavorite(currentOrgInfo.id));
                      console.log("favoriting " + currentOrgInfo.id);
                    }
                  };
                  return (
                    <Ionicons
                      name={isFavorited ? "heart" : "heart-outline"}
                      size={25}
                      color="red"
                      onPress={() => handleToggleFavorite()}
                    />
                  );
                },
              };
            }}
          />
          <Stack.Screen
            name="ChatView"
            component={ChatView}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Screens);
