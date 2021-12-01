import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { allDonors } from "../Seed";
import * as geolib from "geolib";
import Ionicons from "react-native-vector-icons/Ionicons";

export const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
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

  function findMarkers() {
    const donors = allDonors();
    //filters only by donors within search distance
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
        //1609.34 converts meters to miles
      );
    });
    return nearbyDonors.map((donor) => (
      //creates map markers for nearby donors only
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
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.headerText}>Browse</Text>
          <Ionicons
            name="list"
            size={35}
            color="black"
            onPress={() => {
              navigation.navigate("List");
            }}
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  map: {
    flex: 1,
    position: "absolute",
    height: "90%",
    width: "100%",
    marginTop: 50,
  },
  topBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Map;
