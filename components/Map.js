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
import { allDonors } from "../Seed";
import * as geolib from "geolib";

export const Map = ({ route, navigation }) => {
  console.log("hey");
  const [location, setLocation] = useState({
    coords: { latitude: null, longitude: null },
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(5);

  useEffect(() => {
    (async () => {
      //gets permissions for app location use
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      //sets your current position
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // get nearby donors - this is data used for both map AND list view. filters only by donors within search distance
  const donors = allDonors();
  const nearbyDonors = donors.filter((donor) => {
    const currentLocation = {
      latitude: location.coords.latitude || 0,
      longitude: location.coords.longitude || 0,
    };

    const donorLocation = {
      latitude: donor.latitude,
      longitude: donor.longitude,
    };
    return geolib.isPointWithinRadius(
      donorLocation,
      currentLocation,
      distance * 1609.34
      //1609.34 converts meters to miles
    );
  });

  // now that we have the nearby donors, render them in map marker form -- we choose which to render further down
  function handleOnPressMap(event) {
    console.log("Hello New York from our map view");
  }
  function findMarkers() {
    return nearbyDonors.map((donor) => (
      //creates map markers for nearby donors only
      <Marker
        key={donor.id}
        coordinate={{
          latitude: Number(donor.latitude),
          longitude: Number(donor.longitude),
        }}
        onPress={handleOnPressMap}
      />
    ));
  }

  // now that we have the nearby donors, render them also in list form -- we choose which to render further down

  function findList() {
    return nearbyDonors.map((donor, index) => (
      <View style={styles.listItem} key={donor.id}>
        <Text>{donor.label}</Text>
        <Text>
          {/*This gets the distance in meters between your location and the donor. Then we convert it to miles */}
          {(
            geolib.getDistance(
              { latitude: donor.latitude, longitude: donor.longitude },
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }
            ) / 1609.34
          ).toFixed(1)}
          mi away
        </Text>
      </View>
    ));
  }

  function changeView(event) {}
  // do we have our user's location from phone? render out the donors either in map or list form as requested by the user
  if (location.coords.latitude !== null && location.coords.longitude !== null) {
    // is our toggle view state set to map? show us the map
    const toggleView = route.params.toggleHomeView;

    if (toggleView === "map") {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {findMarkers()}
          </MapView>
          {/* i was using this to "console log" our location variable: <Text>
            X {location.coords.latitude} Y {location.coords.longitude}
          </Text> */}
        </View>
      );
      // is our toggle view state set to list? show us the list instead
    } else if (toggleView === "list") {
      return <ScrollView style={styles.container}>{findList()}</ScrollView>;
    } else {
      return (
        <View>
          <Text>Receiving list view choice...</Text>
        </View>
      );
    }
    // no location from phone yet? just show loading....
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
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
  },
});

export default Map;
