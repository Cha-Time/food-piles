import * as React from "react";
import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const Start = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>
        "Be the change that you want to see in the world" - Bruno Mars{" "}
      </Text>
      <Image
        source={require("../assets/test_logo.png")}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Button
          title="Login"
          style={{ margin: "50px" }}
          onPress={() => navigation.navigate("Login")}
        ></Button>
        <Button
          title="Sign Up"
          name="signUp"
          onPress={() => navigation.navigate("SignUpPartOne")}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    flexDirection: "column",
    backgroundColor: "#93c47d",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Start;
