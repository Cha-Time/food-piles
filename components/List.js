import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { allDonors } from "../Seed";
import * as geolib from "geolib";
import Ionicons from "react-native-vector-icons/Ionicons";

export const List = ({ navigation }) => {
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

  function handleOnPress(event) {}

  if (location !== null) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.headerText}>Browse</Text>
          <Ionicons
            name="globe-outline"
            size={35}
            color="black"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </View>
        {findList()}
      </ScrollView>
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
  listItem: {
    padding: "5%",
    borderColor: "gray",
    borderWidth: 0.5,
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

export default List;
