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
import { connect, useDispatch } from "react-redux";
import { fetchOrganization } from "../store/SingleOrg";

export const Welcome = (props) => {
  console.log(props.user)
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(fetchOrganization(props.user.id));
    })();
  }, [props.singleOrg]);

  function moveOn() {
    setTimeout(() => {
      props.navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }, 2000);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {`Welcome, ${props.organization.name}`}
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
    organization: state.singleOrg,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrganization: (id) => dispatch(fetchOrganization(id)),
  };
};

export default connect(mapState, mapDispatch)(Welcome);
