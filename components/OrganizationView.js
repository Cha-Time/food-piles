import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

export const OrganizationView = ({ route, navigation }) => {
  const orgId = Number(route.params.orgId);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View>
          <Text style={styles.title}>Title Of Organization {orgId}</Text>
          <View style={styles.addressContainer}>
            <Text>105 West 13th Street</Text>
            <Text>New York, NY 10011</Text>
            <Text>(212) 741-8157</Text>
          </View>
        </View>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: "https://d1rzxhvrtciqq1.cloudfront.net/images/people/images/dY5xNEt4Wr54ahbagq7ICb/medium/b808a3-schoberlawrenceheadshot.jpg",
          }}
        />
      </View>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
      <Text style={styles.subtitle}>Available until 9pm today:</Text>
      <Text style={styles.subText}>
        Please inquire with the organization for more details for today's
        offerings.
      </Text>
      <Text style={styles.subtitle}>Potential Allgergens:</Text>
      <Text style={styles.subText}>Nuts</Text>
      <Button title="Message" onPress={() => navigation.navigate("Chat")} />
    </View>
  );
};

export default OrganizationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    marginTop: 20,
  },
  top: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 140,
  },
  second: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  subText: {
    marginLeft: 20,
  },
  favorite: {},
  addressContainer: {},
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
