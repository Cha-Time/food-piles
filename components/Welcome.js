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

export const Welcome = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [description, setDescription] = useState(null);

  function moveOn() {
    setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }, 2000);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Welcome, "Username Here"
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
    backgroundColor: "#93c47d",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "whitesmoke",
    color: "black",
    width: "75%",
  },
});

export default Welcome;
