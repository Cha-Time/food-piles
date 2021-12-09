import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { me } from "../store/auth";
import { connect, useDispatch, useSelector } from "react-redux";

////// Import Components
import AccountInfo from "./AccountInfo";
import OrganizationInfo from "./OrganizationInfo";
import StatusInfo from "./StatusInfo";

////// Main
export const Profile = (props) => {
  const orgInfo = useSelector((state) => state.singleOrg);
  const [user, setUser] = useState(props.user);
  const [page, setPage] = useState("hub");

  function handleChangePage(pageName) {
    setPage(pageName);
  }

  const InfoButton = (onPress, title) => (
    <TouchableOpacity onPress={onPress} style={styles.ButtonContainer}>
      <Text style={styles.ButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  if (page === "hub") {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            style={styles.smiley}
            source={require("../assets/smiley.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.topHeaderText}>
            {"Hello " + orgInfo.name + ","}
          </Text>
          <Text style={styles.subTitle}>What Needs Updating?</Text>
        </View>
        <View style={styles.allButtonContainer}>
          {InfoButton(() => setPage("Account Info"), "Account")}
          {InfoButton(() => setPage("Organization Info"), "Organization")}
          {InfoButton(() => setPage("Status Info"), "Status")}
        </View>
      </View>
    );
  } else if (page === "Account Info") {
    return <AccountInfo handleChangePage={handleChangePage} user={user} />;
  } else if (page === "Organization Info") {
    return (
      <OrganizationInfo
        handleChangePage={handleChangePage}
        orgInfo={props.orgInfo}
      />
    );
  } else if (page === "Status Info") {
    return (
      <StatusInfo handleChangePage={handleChangePage} orgInfo={props.orgInfo} />
    );
  }
};

const mapState = (state) => {
  return {
    user: state.auth,
    orgInfo: state.singleOrg,
  };
};

export default connect(mapState)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(219, 154, 155, 0.1)",
    padding: "5%",
    paddingTop: "20%",
  },
  smiley: {
    height: 100,
    width: 100,
  },
  topContainer: {
    padding: "5%",
  },
  topHeaderText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fa5053",
  },
  subTitle: {
    fontSize: 20,
    color: "gray",
  },
  textContainer: {
    display: "flex",
    padding: "5%",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "20%",
  },
  ButtonContainer: {
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingVertical: "5%",
    marginVertical: "2%",
    paddingHorizontal: 12,
    width: "90%",
  },
  ButtonText: {
    fontSize: 18,
    color: "#fc7779",
    textAlign: "center",
  },
  allButtonContainer: {
    marginTop: "8%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
