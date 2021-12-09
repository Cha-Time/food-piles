import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, useDispatch } from "react-redux";
import { updateUser } from "../store/SingleUser";
import { me } from "../store/auth";

export const AccountInfo = (props) => {
  const [usernameModal, setUsernameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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

      setUsernameModal(false);
      setEmailModal(false);
      setPasswordModal(false);
    }
  }

  function closeModal() {
    setUsername(null);
    setEmail(null);
    setPassword(null);

    setUsernameModal(false);
    setEmailModal(false);
    setPasswordModal(false);
  }

  return (
    <View style={{ justifyContent: "space-between", height: "100%" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Account Info</Text>
        <View style={styles.allInputs}>
          <View style={styles.inputContainer}>
            <View style={styles.coupledTextContainer}>
              <Text style={styles.inputCategory}>Username:</Text>
              <Text style={styles.inputValue}>{props.user.username}</Text>
            </View>
            <Text>
              <Ionicons name="create" size={30} color="gray" />{" "}
            </Text>
            {/* <Button
              title="Edit Username"
              name="back"
              onPress={() => setUsernameModal(true)}
            ></Button> */}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.coupledTextContainer}>
              <Text style={styles.inputCategory}>Password:</Text>
              <Text style={styles.inputValue}>**********</Text>
            </View>
            <Text>
              <Ionicons name="create" size={30} color="gray" />{" "}
            </Text>
            {/* <Button
              title="Change Password"
              name="back"
              onPress={() => setPasswordModal(true)}
            ></Button> */}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.coupledTextContainer}>
              <Text style={styles.inputCategory}>E-mail:</Text>
              <Text style={styles.inputValue}>{props.user.email}</Text>
            </View>
            <Text>
              <Ionicons name="create" size={30} color="gray" />{" "}
            </Text>
            {/* <Button
              title="Edit Email"
              name="back"
              onPress={() => setEmailModal(true)}
            ></Button> */}
          </View>
        </View>
      </View>
      {/* <Button
        title="< Back"
        name="back"
        onPress={() => props.handleChangePage("hub")}
      ></Button> */}

      <Modal animationType="fade" transparent={false} visible={usernameModal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 30 }}>Edit Username</Text>
            <View style={{ width: "75%" }}>
              <Text style={{ fontSize: 15 }}>Enter new Username:</Text>
              <View
                style={{ borderWidth: 5, borderColor: "grey", borderRadius: 5 }}
              >
                <TextInput
                  placeholder={props.user.username}
                  value={username}
                  onChangeText={setUsername}
                  style={[styles.textInput, { textAlign: "center" }]}
                />
                <Button
                  title="Save Changes"
                  onPress={() => handleSubmit("username", username)}
                />
              </View>
            </View>
            <Button title="Cancel" onPress={() => closeModal()} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType="fade" transparent={false} visible={emailModal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 30 }}>Edit Email</Text>
            <View style={{ width: "75%" }}>
              <Text style={{ fontSize: 15 }}>Enter new Email:</Text>
              <View
                style={{ borderWidth: 5, borderColor: "grey", borderRadius: 5 }}
              >
                <TextInput
                  placeholder={props.user.email}
                  value={email}
                  onChangeText={setEmail}
                  style={[styles.textInput, { textAlign: "center" }]}
                />
                <Button
                  title="Save Changes"
                  onPress={() => handleSubmit("email", email)}
                />
              </View>
            </View>
            <Button title="Cancel" onPress={() => closeModal()} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType="fade" transparent={false} visible={passwordModal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 30 }}>Edit Password</Text>
            <View
              style={{
                width: "75%",
                height: "30%",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 15 }}>Enter current Password:</Text>
                <View
                  style={{
                    borderWidth: 5,
                    borderColor: "grey",
                    borderRadius: 5,
                  }}
                >
                  <TextInput
                    placeholder="**********"
                    value={password}
                    onChangeText={setPassword}
                    style={[styles.textInput, { textAlign: "center" }]}
                  />
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 15 }}>Enter new Password:</Text>
                <View
                  style={{
                    borderWidth: 5,
                    borderColor: "grey",
                    borderRadius: 5,
                  }}
                >
                  <TextInput
                    placeholder="**********"
                    value={password}
                    onChangeText={setPassword}
                    style={[styles.textInput, { textAlign: "center" }]}
                  />
                </View>
              </View>
              <Button
                title="Submit"
                onPress={() => handleSubmit("password", password)}
              />
            </View>
            <Button title="Cancel" onPress={() => closeModal()} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(219, 154, 155, 0.1)",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "10%",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "whitesmoke",
    padding: 20,
    justifyContent: "space-between",
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    paddingBottom: "10%",
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "whitesmoke",
    color: "black",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
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
});

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(AccountInfo);
