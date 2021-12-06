import React, { useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchOrganizations } from '../store/MapData';
import { fetchOrganization } from '../store/SingleOrg';

export const Map = props => {
  const pageViewStore = useSelector(state => state.homepageView);

  // dispatch time?
  const dispatch = useDispatch();

  const [location, setLocation] = useState({
    coords: { latitude: null, longitude: null },
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(500);

  useEffect(() => {
    (async () => {
      //gets permissions for app location use
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      //sets your current position
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await dispatch(fetchOrganizations(props.user.accType));
    })();
  }, []);

  // get nearby donors - this is data used for both map AND list view. filters only by donors within search distance
  // now that we have the nearby donors, render them in map marker form -- we choose which to render further down
  function handlePressToOrg(orgId) {
    props.navigation.navigate('OrgView', { orgId });
  }
  const newDonors = useSelector(state => state.mapData);
  const nearbyDonors = newDonors.filter(donor => {
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

  function findMarkers() {
    return nearbyDonors.map(donor => (
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

  function findList() {
    return nearbyDonors.map((donor, index) => (
      <View style={styles.listItem} key={donor.id}>
        <Text onPress={() => handlePressToOrg(donor.id)} style={styles.title}>
          {donor.name}
        </Text>
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

  // do we have our user's location from phone? render out the donors either in map or list form as requested by the user
  if (location.coords.latitude !== null && location.coords.longitude !== null) {
    // is our toggle view state set to map? show us the map

    if (pageViewStore.toggleView === 'map') {
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
        </View>
      );
      // is our toggle view state set to list? show us the list instead
    } else if (pageViewStore.toggleView === 'list') {
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

const mapState = state => {
  return {
    user: state.auth,
    singleOrg: state.singleOrg,
  };
};

export default connect(mapState)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  title: {
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    marginTop: 0,
  },
  listItem: {
    padding: '5%',
    borderColor: 'gray',
    borderWidth: 0.5,
  },
});
