import React, { useState, useEffect } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  TouchableOpacityComponent,
} from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as geolib from "geolib";
import Ionicons from "react-native-vector-icons/Ionicons";

import { connect, useDispatch, useSelector } from "react-redux";
import { fetchFavorites, removeFavorite } from "../store/Favorites";

export const Favorites = (props) => {
  const [loaded, setLoaded] = useState(false);
  // dispatch time?
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchFavorites());
      setLoaded(true);
    })();
  }, []);
  function handlePressToOrg(orgId) {
    props.navigation.navigate("OrgView", { orgId });
  }

  let sortedFavoritesArray = props.favorites
    .map((org) => org)
    .sort(function (a, b) {
      return a.favorites.distance - b.favorites.distance;
    });

  const removeThisFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  function findList() {
    return sortedFavoritesArray.map((org) => (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => handlePressToOrg(org.id)}
        key={org.id}
      >
        <Image style={styles.orgIcon} source={{ uri: org.imageUrl }} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{org.name}</Text>
          <Text>
            {org.favorites.distance + " "}
            mi away
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Text>
            {org.availabilityStatus ? (
              <Ionicons name="ellipse" size={19} color="green" />
            ) : (
              <Ionicons name="ellipse" size={19} color="grey" />
            )}
          </Text>
          <TouchableOpacity
            style={styles.favoritePressable}
            onPress={() => removeThisFavorite(org.id)}
          >
            <Text>
              <Ionicons name="heart" size={19} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ));
  }
  if (loaded) {
    if (sortedFavoritesArray.length > 0) {
      return <ScrollView style={styles.container}>{findList()}</ScrollView>;
    } else {
      return (
        <View>
          <Text>Go make some friends!</Text>
        </View>
      );
    }
  } else {
    return (
      <ScrollView style={styles.container}>
        <Text>Loading...</Text>
      </ScrollView>
    );
  }
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
    backgroundColor: "rgba(219, 154, 155, 0.1)",
    display: "flex",
    flex: 1,
    marginTop: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: "2%",
  },
  subTitle: {
    fontSize: 14,
    color: "#4f4e4e",
    letterSpacing: 1,
  },
  map: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    marginTop: 0,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    padding: "5%",
    borderBottomColor: "gray",
    width: "96%",
    marginLeft: "2%",
    borderBottomWidth: 0.5,
    alignItems: "center",
  },
  orgIcon: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  textContainer: {
    paddingLeft: "5%",
    width: "75%",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 70,
  },
  favoritePressable: {
    padding: "5%",
  },
});
