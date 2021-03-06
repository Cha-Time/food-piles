import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, useDispatch } from "react-redux";
import { updateUser } from "../store/SingleUser";
import { me } from "../store/auth";

export const AccountInfo = (props) => {

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //dynamic rendering of input fields
  const [usernameInput, setUsernameInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState(false);
  const [emailInput, setEmailInput] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(me());
    })();
  }, [props.user]);

  async function handleSubmit(name, value) {
    if (value !== null) {
      const org = {};
      org[name] = value;
      await dispatch(updateUser(org));
      setEmailInput(false);
      setPasswordInput(false);
      setUsernameInput(false);
      setUsername(null)
      setEmail(null)
      setPassword(null)
    }
  }

  function handleBack() {
    setUsername(null)
    setEmail(null)
    setPassword(null)
    props.handleChangePage("hub")
  }

  const editButton = (onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.editButton}>
      <Text>
        <Ionicons name="create" size={30} color="gray" />{" "}
      </Text>
    </TouchableOpacity>
  );

  const submitButton = (onPress) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.editButton}>
        <Text>
          <Ionicons name="checkbox" size={30} color="gray" />{" "}
        </Text>
      </TouchableOpacity>
    );
  };

  const backButton = (onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.backButtonContainer}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ backgroundColor: 'rgba(219, 154, 155, 0.1)' }}>
      <View style={{ justifyContent: "space-between", height: "100%" }}>

        <View style={styles.container}>
          <Text style={styles.title}>Account Info</Text>
          <View style={styles.allInputs}>
            <View style={styles.inputContainer}>
              <View style={styles.coupledTextContainer}>
                <Text style={styles.inputCategory}>Username:</Text>
                {usernameInput ? (
                  <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.inputValue}>{props.user.username}</Text>
                )}
              </View>
              {usernameInput
                ? submitButton(() => handleSubmit("username", username))
                : editButton(() => setUsernameInput(true))}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.coupledTextContainer}>
                <Text style={styles.inputCategory}>Password:</Text>
                {passwordInput ? (
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.inputValue}>*********</Text>
                )}
              </View>
              {passwordInput
                ? submitButton(() => handleSubmit("password", password))
                : editButton(() => setPasswordInput(true))}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.coupledTextContainer}>
                <Text style={styles.inputCategory}>E-mail:</Text>
                {emailInput ? (
                  <TextInput
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.inputValue}>{props.user.email}</Text>
                )}
              </View>
              {emailInput
                ? submitButton(() => handleSubmit("email", email))
                : editButton(() => setEmailInput(true))}
            </View>
          </View>
          {backButton(() => handleBack())}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "10%",
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    paddingBottom: "5%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  coupledTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputCategory: {
    fontWeight: "bold",
    fontSize: 18,
    paddingRight: "2%",
  },
  allInputs: {
    height: "50%",
    paddingTop: "5%",
  },
  backButtonContainer: {
    display: "flex",
    width: "20%",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginRight: "3%",
    marginBottom: "30%",
  },
  backButtonText: {
    fontSize: 22,
    color: "black",
  },
  textInput: {
    width: "55%",
    minHeight: 50,
    color: "black",
  },
});

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(AccountInfo);
