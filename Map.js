import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { allDonors } from './Seed';

export const Map = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    function mapMarkers() {
        const donors = allDonors();
        return donors.map(donor =>
            <Marker
                key={donor.id}
                coordinate={{
                    latitude: donor.latitude,
                    longitude: donor.longitude
                }}
                onPress={handleOnPress}
            />
        )
    }

    function handleOnPress(event) {
        console.log('Hello New York')
    }

    if (location !== null) {
        return (
            <View style={{ flex: 1, position: 'relative' }}>
                <MapView
                    style={{ flex: 1, position: 'absolute', height: '100%', width: '100%', marginTop: 'auto' }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                    {mapMarkers()}
                </MapView>
            </View>
        );
    } else {
        return (
            <View><Text>Loading...</Text></View>
        )
    }
}

export default Map