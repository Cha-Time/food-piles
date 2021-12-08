import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchOrganization } from "../store/SingleOrg";

export const Welcome = (props) => {
  const orgInfo = useSelector(state => state.singleOrg)
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(fetchOrganization(props.user.organizationId));
    })();
  }, []);

  function moveOn() {
    setTimeout(() => {
      props.navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }, 2000);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text
          style={{ textAlign: "center", fontSize: 35, paddingBottom: "5%" }}
        >
          Welcome,
        </Text>
        <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
          {orgInfo.name}
        </Text>
        {moveOn()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    flexDirection: "column",
    backgroundColor: "#ececec",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

const mapState = (state) => {
  return {
    user: state.auth,
    // organization: state.singleOrg,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrganization: (id) => dispatch(fetchOrganization(id)),
  };
};

export default connect(mapState, mapDispatch)(Welcome);
