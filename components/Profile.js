import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>Profile component is a work in progress!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

export default Profile;
