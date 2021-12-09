import * as React from "react";
import { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Button,
  Alert,
  Text,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, useDispatch, useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();

//Screens
import Start from "./Start";
import Login from "./Login";
import SignUp from "./SignUp";
import Welcome from "./Welcome";
import MainContainer from "./MainContainer";
import OrganizationView from "./OrganizationView";
import ChatView from "./ChatView";

import {
  getAvailability,
  setAvailability,
  setHomeView,
} from "../store/homepageView";
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "../store/Favorites";

const Screens = (props) => {
  const pageViewStore = useSelector((state) => state.homepageView);
  const currentOrgInfo = useSelector((state) => state.singleForeignOrg);
  const [aval, setAval] = useState(pageViewStore.availability);

  enableScreens();

  const { isLoggedIn } = props;
  const toast = useToast();
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
                    headerTitle: "",
                    headerRight: () => {
                      const dispatch = useDispatch();
                      useEffect(() => {
                        (async () => {
                          await dispatch(getAvailability());
                        })();
                      }, []);

                      const handleToggleHomeViewClick = () => {
                        if (pageViewStore.toggleView === "map") {
                          dispatch(setHomeView("list"));
                        } else if (pageViewStore.toggleView === "list") {
                          dispatch(setHomeView("map"));
                        }
                      };

                      const handleToggleAvailabilityStatus = () => {
                        if (aval === false) {
                          toast.show("Your status is now Available", {
                            type: "normal",
                            placement: "bottom",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                          });
                          dispatch(setAvailability(true));
                          setAval(true);
                        } else {
                          toast.show("Your status is now Unavailable", {
                            type: "normal",
                            placement: "bottom",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                          });
                          dispatch(setAvailability(false));
                          setAval(false);
                        }
                      };

                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "95%",
                          }}
                        >
                          <Switch
                            trackColor={{ false: "#d4d4d4", true: "#f7babb" }}
                            thumbColor={"#f55b5e"}
                            ios_backgroundColor="gray"
                            onValueChange={() =>
                              handleToggleAvailabilityStatus()
                            }
                            value={aval}
                          />
                          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                            {" Nearby "}
                            {currentOrgInfo.accType === "charity"
                              ? "Donors"
                              : "Charities"}
                            {" ("}
                            {pageViewStore.totalFilteredOrgs}
                            {")"}
                          </Text>
                          <Ionicons
                            name={
                              pageViewStore.toggleView === "map"
                                ? "list"
                                : "globe"
                            }
                            size={30}
                            color="black"
                            onPress={() => handleToggleHomeViewClick()}
                          />
                        </View>
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

                  const handleToggleFavorite = () => {
                    if (isFavorited) {
                      dispatch(removeFavorite(currentOrgInfo.id));
                      toast.show("Removed from Favorites!", {
                        type: "normal",
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                      });
                    } else {
                      toast.show("Added to Favorites!", {
                        type: "normal",
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                      });
                      dispatch(addFavorite(currentOrgInfo.id));
                    }
                  };
                  return (
                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons
                        name={isFavorited ? "heart" : "heart-outline"}
                        size={25}
                        color="red"
                        onPress={() => handleToggleFavorite()}
                      />
                    </TouchableOpacity>
                  );
                },
              };
            }}
          />
          <Stack.Screen
            name="ChatView"
            component={ChatView}
            options={{ headerShown: true, headerTitle: currentOrgInfo.name }}
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
