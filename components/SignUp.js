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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { connect, useDispatch, useSelector } from "react-redux";
import { authenticate } from "../store/auth";

export const SignUp = (props) => {
  const dispatch = useDispatch();

  ////// Sign Up Part One
  const [part, setPart] = useState("partOne");
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  ////// Sign Up Part Two
  const [accType, setUsertype] = useState("donor");

  ////// Sign Up Part Three
  const [name, setName] = useState(null);
  const [phoneNumber, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState("NY");
  const [zipCode, setZip] = useState(null);
  const [description, setDescription] = useState(null);

  const { error, isLoggedIn } = props;

  async function handleSubmit() {
    await dispatch(
      authenticate(
        {
          username,
          password,
          email,
          accType,
          name,
          phoneNumber,
          address,
          city,
          state,
          zipCode,
          latitude: 38.8976763,
          longitude: -77.0365298,
        },
        "signup"
      )
    );

    if (isLoggedIn) {
      props.navigation.navigate("Welcome");
    } else {
      setPart("partOne");
    }
  }

  if (part === "partOne") {
    const NextButton = () => (
      <TouchableOpacity
        onPress={() => setPart("partTwo")}
        style={styles.nextButtonContainer}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    );
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Let's get you started.</Text>
          </View>
          <View style={styles.errorMessage}>
            {error && error.response && (
              <Text style={{ textAlign: "center", color: "red" }}>
                Oops! Something went wrong.
              </Text>
            )}
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              style={styles.textInput}
            />
          </View>
          <View style={styles.buttonsContainer}>{NextButton()}</View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else if (part === "partTwo") {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>Who are you?</Text>
        <View
          style={{
            width: "100%",
            minHeight: "10%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Picker
            selectedValue={accType}
            onValueChange={(currentSelection) => setUsertype(currentSelection)}
            style={{ backgroundColor: "whitesmoke", width: "100%" }}
          >
            <Picker.Item label="Donor" value="donor" style={{}} />
            <Picker.Item label="Charity" value="charity" />
          </Picker>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Button
            title="< Back"
            name="back"
            onPress={() => setPart("partOne")}
          ></Button>
          <Button
            title="Next >"
            name="next"
            onPress={() => setPart("partThree")}
          ></Button>
        </View>
      </View>
    );
  } else if (part === "partThree") {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            Tell us about yourself.
          </Text>
          <View
            style={{
              width: "100%",
              minHeight: "10%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Phone"
              value={phoneNumber}
              onChangeText={setPhone}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              style={[styles.textInput, { marginBottom: "1%" }]}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                maxWidth: "75%",
                minHeight: "10%",
                maxHeight: "13%",
                alignItems: "center",
                marginBottom: "5%",
              }}
            >
              <TextInput
                placeholder="City"
                value={city}
                onChangeText={setCity}
                style={[styles.textInput, { marginRight: "1%" }]}
              />
              <Picker
                selectedValue={state}
                onValueChange={(currentSelection) => setState(currentSelection)}
                style={{
                  backgroundColor: "whitesmoke",
                  width: "44%",
                  minHeight: "91%",
                  maxHeight: "13%",
                }}
              >
                <Picker.Item label="NY" value="NY" />
                <Picker.Item label="PA" value="PA" />
                <Picker.Item label="NJ" value="NJ" />
              </Picker>
              <TextInput
                placeholder="Zip Code"
                value={zipCode}
                onChangeText={setZip}
                style={[styles.textInput, { marginRight: "1%" }]}
              />
            </View>
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={[
                styles.textInput,
                {
                  marginBottom: "5%",
                  minHeight: "25%",
                  textAlignVertical: "top",
                },
              ]}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Button
              title="< Back"
              name="back"
              onPress={() => setPart("partTwo")}
            ></Button>
            <Button
              title="Next >"
              name="next"
              onPress={() => setPart("partFour")}
            ></Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else if (part === "partFour") {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>Prove it.</Text>
        <View
          style={{
            width: "100%",
            minHeight: "10%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Button
            title="< Back"
            name="back"
            onPress={() => setPart("partThree")}
          ></Button>
          <Button
            title="Next >"
            name="next"
            onPress={() => handleSubmit()}
          ></Button>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    flexDirection: "column",
    backgroundColor: "#ececec",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#ececec",
    width: "100%",
    color: "black",
    borderBottomColor: "#f5565a",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: "5%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom: "5%",
  },
  errorMessage: {
    width: "100%",
    minHeight: "10%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nextButtonContainer: {
    width: "15%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  nextButtonText: {
    fontSize: 20,
    color: "black",
  },
  headerTextContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: "20%",
    paddingBottom: "20%",
  },
  headerText: {
    fontSize: 34,
  },
  buttonsContainer: {
    paddingTop: "5%",
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
  },
});

const mapState = (state) => {
  return {
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(SignUp);
