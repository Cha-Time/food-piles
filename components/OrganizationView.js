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
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

export const OrganizationView = ({ route }) => {
  const orgId = Number(route.params.orgId);
  return (
    <View>
      <Text>ID Number {orgId}</Text>
    </View>
  );
};

export default OrganizationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
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
});
