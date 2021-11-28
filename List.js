import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { allDonors } from "./Seed";
import * as geolib from "geolib";
import Ionicons from "react-native-vector-icons/Ionicons";

export const List = () => {
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

  function findList() {
    const donors = allDonors();
    //filter db by donors within 5 miles (There are 1609 meters per mile)
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

  function handleOnPress(event) {
    console.log("Hello New York");
  }

  if (location !== null) {
    return <ScrollView style={styles.container}>{findList()}</ScrollView>;
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
    marginTop: StatusBar.currentHeight,
  },
  listItem: {
    padding: "5%",
    borderColor: "gray",
    borderWidth: 0.5,
  },
});

export default List;
