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
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchForeignOrganization } from "../store/singleForeignOrg";

export const OrganizationView = ({ route, navigation }) => {
  const orgId = Number(route.params.orgId);
  const orgInfo = useSelector((state) => state.singleForeignOrg);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchForeignOrganization(orgId));
    })();
  }, []);

  function dialCall(digits) {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:" + digits;
    } else {
      phoneNumber = "telprompt:" + digits;
    }

    Linking.openURL(phoneNumber);
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{orgInfo.name}</Text>
          <View style={styles.addressContainer}>
            <Text>{orgInfo.address}</Text>
            <Text>
              {orgInfo.city}, {orgInfo.state}
            </Text>

            <TouchableOpacity
              onPress={() => dialCall(orgInfo.phoneNumber)}
              activeOpacity={0.7}
            >
              <Text style={styles.phoneLink}>{orgInfo.phoneNumber}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={{
            uri: orgInfo.imageUrl,
          }}
        />
      </View>
      <Text>{orgInfo.description}</Text>
      {orgInfo.accType === "donor" ? (
        <View>
          <Text style={styles.subtitle}>
            Available{" "}
            {orgInfo.availableTime ? (
              <Text>until {orgInfo.availableTime}</Text>
            ) : (
              <Text></Text>
            )}
            today:
          </Text>
          <Text style={styles.subText}>
            {orgInfo.availableFood ? (
              <Text>{orgInfo.availableFood}</Text>
            ) : (
              <Text>
                Please inquire with the organization for more details for
                today's offerings.
              </Text>
            )}
          </Text>
          <Text style={styles.subtitle}>Potential Allgergens:</Text>
          <Text style={styles.subText}>
            {orgInfo.allergens ? (
              <Text>{orgInfo.allergens}</Text>
            ) : (
              <Text>N/A</Text>
            )}
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      <Button
        title="Message"
        onPress={() => navigation.navigate("ChatView", { foreignId: orgId })}
      />
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
  phoneLink: {
    textDecorationLine: "underline",
    color: "blue",
  },
});
