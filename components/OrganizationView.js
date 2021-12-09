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
    console.log(orgInfo.availabilityStatus);
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:" + digits;
    } else {
      phoneNumber = "telprompt:" + digits;
    }

    Linking.openURL(phoneNumber);
  }


  const [visible, setVisible] = useState(false);

  function toggleVisibility(status) {
    setVisible(status);
  }
  let availability = "";
  if (orgInfo.availabilityStatus) {
    availability = "Currently Available";
  } else {
    availability = "Currently Unavailable";
  }

  const MessageButton = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChatView", { foreignId: orgId })}
      style={styles.messageButtonContainer}
    >
      <Text style={styles.messageButtonText}>Start Chatting!</Text>
    </TouchableOpacity>
  );

  let phoneNumber = "";
  if (orgInfo.phoneNumber) {
    phoneNumber =
      "(" +
      orgInfo.phoneNumber.slice(0, 3) +
      ")-" +
      orgInfo.phoneNumber.slice(3, 6) +
      "-" +
      orgInfo.phoneNumber.slice(6);
  }
  let city = "";
  if (orgInfo.city) {
    city = orgInfo.city.slice(1);
  }
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topTextContainer}>
          <Text style={styles.title}>{orgInfo.name}</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.headerText}>Address</Text>
            <Text style={styles.subtitleText}>{orgInfo.address}</Text>
            <Text style={styles.subtitleText}>
              {city}, {orgInfo.state}
            </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.headerText}>Phone</Text>
            <TouchableOpacity
              onPress={() => dialCall(orgInfo.phoneNumber)}
              activeOpacity={0.7}
            >
              <Text style={styles.phoneLink}>{phoneNumber}</Text>
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
      <View style={styles.bottom}>
        <View style={styles.fieldContainer}>
          <Text style={styles.headerText}>{"Description"}</Text>
          <Text style={styles.subtitleText}>{orgInfo.description}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.headerText}>{"Status: " + availability}</Text>
          {orgInfo.availableTime ? (
            <Text style={styles.subtitleText}>
              until {orgInfo.availableTime}
            </Text>
          ) : (
            <Text style={styles.subtitleText}>
              {
                "Please inquire with the organization directly for more specific details regarding their hours of operation "
              }
            </Text>
          )}
        </View>
        {orgInfo.accType === "donor" ? (
          <View>
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
            <Text style={styles.subtitle}>Potential Allergens:</Text>
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
      </View>
      <View style={styles.buttonContainer}>{MessageButton()}</View>
      {visible === true ? (
        <ChatView
          visibleStatus={visible}
          toggleVisibility={toggleVisibility}
          org={orgInfo}
          receiverId={orgInfo.id}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default OrganizationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "5%",
    backgroundColor: "rgba(219, 154, 155, 0.1)",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topTextContainer: {
    width: "60%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
  subtitleText: {
    fontSize: 15,
    lineHeight: 25,
  },
  headerText: {
    fontWeight: "bold",
  },
  subText: {
    marginLeft: 20,
  },
  fieldContainer: {
    paddingTop: "5%",
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
  phoneLink: {
    textDecorationLine: "underline",
    color: "blue",
  },
  messageButtonContainer: {
    backgroundColor: "#ececec",
    borderColor: "#f5565a",
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  messageButtonText: {
    fontSize: 18,
    color: "#f5565a",
    alignSelf: "center",
  },
  buttonContainer: {
    paddingTop: "8%",
  },
});
