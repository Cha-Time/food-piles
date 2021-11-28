import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

export const Chat = () => {
  return (
    <View style={styles.container}>
      <Text>Chat component is a work in progress!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default Chat;
