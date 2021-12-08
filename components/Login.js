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
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { authenticate } from "../store/auth";
import { connect, useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

export const Login = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { error, isLoggedIn } = props;

  async function handleSubmit() {
    await dispatch(authenticate({ username, password }, "login"));

    if (isLoggedIn) {
      props.navigation.navigate("Welcome");
    }
  }

  const LoginButton = () => (
    <TouchableOpacity
      onPress={() => handleSubmit()}
      style={styles.logInButtonContainer}
    >
      <Text style={styles.logInButtonText}>Sign In</Text>
    </TouchableOpacity>
  );
  const SignUpButton = () => (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("SignUp")}
      style={styles.signUpButtonContainer}
    >
      <Text style={styles.signUpButtonText}>Create Account</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ backgroundColor: '#ececec' }}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Welcome</Text>
              <Text style={styles.headerText}>Back</Text>
            </View>
            <View style={styles.formContainer}>
              {error && error.response && (
                <Text style={{ textAlign: "center", color: "red" }}>
                  {error.response.data}
                </Text>
              )}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#b8b8b8" />
                <TextInput
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#b8b8b8" />
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  style={styles.textInput}
                />
              </View>
            </View>
            <View style={styles.bottomButtonContainer}>
              {LoginButton()}
              <View style={styles.orContainer}>
                <View style={styles.hr} />
                <View>
                  <Text style={styles.orText}>or</Text>
                </View>
                <View style={styles.hr} />
              </View>
              {SignUpButton()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    flexDirection: "column",
    backgroundColor: "#ececec",
    alignItems: "center",
    textAlign: "center"
  },
  textInput: {
    backgroundColor: "#ececec",
    width: "100%",
    minHeight: 50,
    color: "black",
    borderBottomColor: "#f5565a",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  formContainer: {
    width: "100%",
    minHeight: 90,
    alignItems: "center",
    marginBottom: "20%",
    paddingTop: '5%',
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
    borderWidth: 2,
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
    borderColor: "#b8b8b8",
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  signUpButtonText: {
    fontSize: 18,
    color: "#b8b8b8",
    fontWeight: "bold",
    alignSelf: "center",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  bottomButtonContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
  },
  hr: {
    flex: 1,
    height: 1,
    backgroundColor: "#b8b8b8",
  },
  orText: {
    width: 50,
    textAlign: "center",
    color: "#b8b8b8",
    padding: "3%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom: "5%"
  },
  headerTextContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: '15%'
  },
  headerText: {
    fontSize: 34,
  },
});

const mapState = (state) => {
  return {
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(Login);
