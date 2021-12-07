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
import Ionicons from "react-native-vector-icons/Ionicons";

export const SignUp = (props) => {
  const dispatch = useDispatch();

  ////// Sign Up Part One
  const [part, setPart] = useState("partOne");
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  ////// Sign Up Part Two
  const [accType, setUsertype] = useState(null);

  ////// Sign Up Part Three
  const [name, setName] = useState(null);
  const [phoneNumber, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZip] = useState(null);
  const [description, setDescription] = useState(null);

  const { error, isLoggedIn } = props;

  const NavButton = (part, direction) => (
    <TouchableOpacity
      onPress={() => setPart(part)}
      style={styles.nextButtonContainer}
    >
      <Text style={styles.nextButtonText}>{direction}</Text>
    </TouchableOpacity>
  );
  const SubmitButton = () => (
    <TouchableOpacity
      onPress={() => handleSubmit()}
      style={styles.submitButtonContainer}
    >
      <Text style={styles.nextButtonText}>Submit</Text>
    </TouchableOpacity>
  );

  const radio = (value) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setUsertype(value);
        }}
      >
        <Ionicons
          name={value == accType ? "ellipse" : "ellipse-outline"}
          size={20}
          color={value == accType ? "#f5565a" : "gray"}
        />
      </TouchableOpacity>
    );
  };

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
          <View style={styles.buttonsContainer}>
            {NavButton("partTwo", "Next")}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else if (part === "partTwo") {
    return (
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>
            Which organization type describes yours best?
          </Text>
        </View>
        <View style={styles.orgTypeContainer}>
          <View style={styles.inputContainer}>
            {radio("donor")}
            <Text style={styles.orgTypeText}>It is a donor.</Text>
          </View>
          <View style={styles.inputContainer}>
            {radio("charity")}
            <Text style={styles.orgTypeText}>It is a charity.</Text>
          </View>
        </View>
        <View style={styles.navbuttonsContainer}>
          {NavButton("partOne", "Back")}
          {NavButton("partThree", "Next")}
        </View>
      </View>
    );
  } else if (part === "partThree") {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Tell us about yourself!</Text>
          </View>
          <View style={styles.orgFormContainer}>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.textInput}
            />
            <View style={styles.inputRowContainer}>
              <View style={{ width: "74%", paddingRight: "3%" }}>
                <TextInput
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                  style={styles.textInput}
                />
              </View>
              <View style={{ width: "25%" }}>
                <TextInput
                  placeholder="State"
                  value={state}
                  onChangeText={setState}
                  style={styles.textInput}
                />
              </View>
            </View>
            <View style={styles.inputRowContainer}>
              <View style={{ width: "40%", paddingRight: "3%" }}>
                <TextInput
                  placeholder="Zip Code"
                  value={zipCode}
                  onChangeText={setZip}
                  style={styles.textInput}
                />
              </View>
              <View style={{ width: "59%" }}>
                <TextInput
                  placeholder="Phone"
                  value={phoneNumber}
                  onChangeText={setPhone}
                  style={styles.textInput}
                />
              </View>
            </View>

            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={[
                styles.textInput,
                {
                  marginBottom: "5%",
                  minHeight: "15%",
                  textAlignVertical: "top",
                },
              ]}
            />
          </View>
          <View style={styles.navbuttonsContainer}>
            {NavButton("partTwo", "Back")}
            {SubmitButton()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  // } else if (part === "partFour") {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ textAlign: "center", fontSize: 20 }}>Prove it.</Text>
  //       <View
  //         style={{
  //           width: "100%",
  //           minHeight: "10%",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //         }}
  //       ></View>
  //       <View
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           width: "100%",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <Button
  //           title="< Back"
  //           name="back"
  //           onPress={() => setPart("partThree")}
  //         ></Button>
  //         <Button
  //           title="Next >"
  //           name="next"
  //           onPress={() => handleSubmit()}
  //         ></Button>
  //       </View>
  //     </View>
  //   );
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
    justifyContent: "flex-start",
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
    display: "flex",
    width: "18%",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginRight: "3%",
  },
  submitButtonContainer: {
    display: "flex",
    width: "25%",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginRight: "3%",
  },
  nextButtonText: {
    fontSize: 22,
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
    paddingTop: "15%",
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
  },
  navbuttonsContainer: {
    paddingTop: "25%",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  orgTypeContainer: {
    width: "100%",
    minHeight: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "10%",
  },
  orgTypeText: {
    fontSize: 20,
    padding: "5%",
  },
  orgFormContainer: {
    width: "100%",
    minHeight: "10%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputRowContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
});

const mapState = (state) => {
  return {
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(SignUp);
