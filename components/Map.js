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

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as geolib from "geolib";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchOrganizations, setOrganizations } from "../store/MapData";
import { fetchOrganization } from "../store/SingleOrg";

export const Map = (props) => {
  const pageViewStore = useSelector((state) => state.homepageView);
  const orgInfo = useSelector((state) => state.singleOrg);

  // dispatch time?
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(5);

  useEffect(() => {
    (async () => {
      await dispatch(fetchOrganization(props.user.organizationId));
      await dispatch(fetchOrganizations(props.user.accType));
    })();
  }, [props.orgs]);

  // get nearby donors - this is data used for both map AND list view. filters only by donors within search distance
  // now that we have the nearby donors, render them in map marker form -- we choose which to render further down
  function handlePressToOrg(orgId) {
    props.navigation.navigate("OrgView", { orgId });
  }
  const newDonors = useSelector((state) => state.mapData);
  const nearbyDonors = newDonors.filter((donor) => {
    const currentLocation = {
      latitude: Number(orgInfo.latitude) || 0,
      longitude: Number(orgInfo.longitude) || 0,
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

  function findMarkers() {
    return nearbyDonors.map((donor) => (
      //creates map markers for nearby donors only
      <Marker
        key={donor.id}
        coordinate={{
          latitude: Number(donor.latitude),
          longitude: Number(donor.longitude),
        }}
        onPress={() => handlePressToOrg(donor.id)}
      />
    ));
  }

  // now that we have the nearby donors, render them also in list form -- we choose which to render further down

  let sortedListArray = nearbyDonors
    .map((donor) => {
      donor.distance = (
        geolib.getDistance(
          { latitude: donor.latitude, longitude: donor.longitude },
          {
            latitude: Number(orgInfo.latitude),
            longitude: Number(orgInfo.longitude),
          }
        ) / 1609.34
      ).toFixed(1);
      return donor;
    })
    .sort(function (a, b) {
      return a.distance - b.distance;
    });

  function findList() {
    return sortedListArray.map((donor) => (
      <View style={styles.listItem} key={donor.id}>
        <Text onPress={() => handlePressToOrg(donor.id)} style={styles.title}>
          {donor.name}
        </Text>
        <Text>
          {donor.distance}
          mi away
        </Text>
      </View>
    ));
  }

  // do we have our user's location from phone? render out the donors either in map or list form as requested by the user
  if (
    Number(orgInfo.latitude) === Number(orgInfo.latitude) &&
    Number(orgInfo.longitude) === Number(orgInfo.longitude) &&
    Number(orgInfo.latitude) !== undefined &&
    Number(orgInfo.longitude) !== undefined
  ) {
    // is our toggle view state set to map? show us the map

    if (pageViewStore.toggleView === "map") {
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: Number(orgInfo.latitude),
              longitude: Number(orgInfo.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(orgInfo.latitude),
                longitude: Number(orgInfo.longitude),
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={styles.markerText}>Your Location</Text>
                <View style={styles.circle}>
                  <View style={styles.stroke} />
                  <View style={styles.core} />
                </View>
              </View>
            </Marker>
            {findMarkers()}
          </MapView>
        </View>
      );
      // is our toggle view state set to list? show us the list instead
    } else if (pageViewStore.toggleView === "list") {
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

const mapState = (state) => {
  return {
    user: state.auth,
    org: state.singleOrg,
    orgs: state.mapData,
  };
};

export default connect(mapState)(Map);

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
  circle: {
    width: 23,
    height: 23,
    borderRadius: 50,
  },
  stroke: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  core: {
    backgroundColor: "#4285f4",
    width: 20,
    position: "absolute",
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    height: 20,
    borderRadius: 50,
    zIndex: 2,
  },
  listItem: {
    padding: "5%",
    borderColor: "gray",
    borderWidth: 0.5,
  },
  markerText: {
    backgroundColor: "rgba(153, 153, 255, 0.2)",
    color: "black",
    fontWeight: "bold",
    padding: "1%",
    marginLeft: 90,
    marginBottom: 1,
  },
});
