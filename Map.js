import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { allDonors } from "./Seed";
import * as geolib from "geolib";

export const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(5);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  function mapMarkers() {
    const donors = allDonors();
    const nearbyDonors = donors.filter((donor) => {
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      const donorLocation = {
        latitude: donor.latitude,
        longitude: donor.longitude,
      };
      return geolib.isPointWithinRadius(
        donorLocation,
        currentLocation,
        distance * 1609.34
      );
    });
    return nearbyDonors.map((donor) => (
      <Marker
        key={donor.id}
        coordinate={{
          latitude: Number(donor.latitude),
          longitude: Number(donor.longitude),
        }}
        onPress={handleOnPress}
      />
    ));
  }

  function handleOnPress(event) {
    console.log("Hello New York");
  }

  if (location !== null) {
    return (
      <View style={{ flex: 1, position: "relative" }}>
        <MapView
          style={{
            flex: 1,
            position: "absolute",
            height: "100%",
            width: "100%",
            marginTop: StatusBar.currentHeight,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {mapMarkers()}
        </MapView>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

export default Map;
