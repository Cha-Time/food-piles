import React, { useState, useEffect } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as geolib from "geolib";
import Ionicons from "react-native-vector-icons/Ionicons";

import { connect, useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../store/Favorites";

export const Favorites = (props) => {
  // dispatch time?
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {

      await dispatch(fetchFavorites());
    })();
  }, []);

  function handlePressToOrg(orgId) {
    props.navigation.navigate("OrgView", { orgId });
  }

  function handleToggleFavorite() {}

  let sortedFavoritesArray = props.favorites
    .map((org) => org)
    .sort(function (a, b) {
      return a.favorites.distance - b.favorites.distance;
    });

  function findList() {
    return sortedFavoritesArray.map((org) => (
      <View style={styles.listItem} key={org.id}>
        <View>
          <Text onPress={() => handlePressToOrg(org.id)} style={styles.title}>
            {org.name}
          </Text>
          <Text>
            {org.favorites.distance}
            mi away
          </Text>
        </View>
        <View>
          <Text>
            {org.availabilityStatus ? (
              <Ionicons name="ellipse" size={15} color="green" />
            ) : (
              <Ionicons name="ellipse" size={15} color="grey" />
            )}
          </Text>
          <Text>

            <Ionicons name="heart" size={15} color="black" />

          </Text>
        </View>
      </View>
    ));
  }

  // do we have our user's location from phone? render out the donors either in map or list form as requested by the user

  // is our toggle view state set to map? show us the map
  if (sortedFavoritesArray.length > 0) {
    return <ScrollView style={styles.container}>{findList()}</ScrollView>;
  } else {
    return (
      <ScrollView style={styles.container}>
        <Text>Loading...</Text>
      </ScrollView>
    );
  }
  // no location from phone yet? just show loading....
};

const mapState = (state) => {
  return {
    user: state.auth,
    favorites: state.favorites,
  };
};

export default connect(mapState)(Favorites);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  title: {
    fontWeight: "bold",
  },
  map: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    marginTop: 0,
  },
  listItem: {
    padding: "5%",
    borderColor: "gray",
    borderWidth: 0.5,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
