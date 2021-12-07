import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const Start = ({ navigation }) => {
  const LoginButton = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Login")}
      style={styles.logInButtonContainer}
    >
      <Text style={styles.logInButtonText}>Sign In</Text>
    </TouchableOpacity>
  );
  const SignUpButton = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("SignUp")}
      style={styles.signUpButtonContainer}
    >
      <Text style={styles.signUpButtonText}>Create Account</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View style={styles.appButtonContainer}>
        {LoginButton()}
        {SignUpButton()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    flexDirection: "column",
    backgroundColor: "#ececec",
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    height: "80%",
    width: "120%",
  },
  appButtonContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "25%",
    justifyContent: "space-evenly",
  },
  logInButtonContainer: {
    backgroundColor: "#f5565a",
    borderColor: "#f5565a",
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  logInButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  signUpButtonContainer: {
    backgroundColor: "#ececec",
    borderColor: "#f5565a",
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  signUpButtonText: {
    fontSize: 18,
    color: "#f5565a",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default Start;
