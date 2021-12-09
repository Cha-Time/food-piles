import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { updateOrganization } from "../store/SingleOrg";

export const OrganizationInfo = (props) => {

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [nameInput, setNameInput] = useState(false);
  const [phoneInput, setPhoneInput] = useState(false);
  const [addressInput, setAddressInput] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState(false);

  const dispatch = useDispatch();

  async function handleSubmit(name, value) {
    if (value !== null) {
      const org = {};
      org[name] = value;
      await dispatch(updateOrganization(org));
      setNameInput(false);
      setPhoneInput(false);
      setAddressInput(false);
      setDescriptionInput(false);

      setName(null)
      setPhone(null)
      setAddress(null)
      setDescription(null)
    }
  }

  function handleBack() {
    setName(null)
    setPhone(null)
    setAddress(null)
    setDescription(null)
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
          <Text style={styles.title}>Organization Info</Text>
          <View style={styles.allInputs}>
            <View style={styles.inputContainer}>
              <View style={styles.coupledTextContainer}>
                <Text style={styles.inputCategory}>Name:</Text>
                {nameInput ? (
                  <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.inputValue}>{props.orgInfo.name}</Text>
                )}
              </View>
              {nameInput
                ? submitButton(() => handleSubmit("name", name))
                : editButton(() => setNameInput(true))}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.coupledTextContainer}>
                <Text style={styles.inputCategory}>Phone:</Text>
                {phoneInput ? (
                  <TextInput
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.inputValue}>
                    {props.orgInfo.phoneNumber}
                  </Text>
                )}
              </View>
              {phoneInput
                ? submitButton(() => handleSubmit("phoneNumber", phone))
                : editButton(() => setPhoneInput(true))}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.coupledTextContainer}>
                <Text style={styles.inputCategory}>Address:</Text>
                {addressInput ? (
                  <TextInput
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.inputValue}>{props.orgInfo.address}</Text>
                )}
              </View>
              {addressInput
                ? submitButton(() => handleSubmit("address", address))
                : editButton(() => setAddressInput(true))}
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.coupledTextContainer}>
                <Text style={styles.inputCategory}>Description:</Text>
                {descriptionInput ? (
                  <TextInput
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.inputValue}>
                    {props.orgInfo.description}
                  </Text>
                )}
              </View>
              {descriptionInput
                ? submitButton(() => handleSubmit("description", description))
                : editButton(() => setDescriptionInput(true))}
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

export default OrganizationInfo;
