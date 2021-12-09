import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { updateOrganization } from "../store/SingleOrg";

export const OrganizationInfo = (props) => {
  const [nameModal, setNameModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);

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

      setNameModal(false);
      setPhoneModal(false);
      setAddressModal(false);
      setDescriptionModal(false);
      setNameInput(false);
      setPhoneInput(false);
      setAddressInput(false);
      setDescriptionInput(false);
    }
  }

  function closeModal() {
    setName(null);
    setPhone(null);
    setAddress(null);
    setDescription(null);

    setNameModal(false);
    setPhoneModal(false);
    setAddressModal(false);
    setDescriptionModal(false);
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
        {backButton(() => props.handleChangePage("hub"))}
      </View>

      {/* <Modal animationType="fade" transparent={false} visible={nameModal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 30 }}>Edit Name</Text>
            <View style={{ width: "75%" }}>
              <Text style={{ fontSize: 15 }}>Enter new name:</Text>
              <View
                style={{ borderWidth: 5, borderColor: "grey", borderRadius: 5 }}
              >
                <TextInput
                  placeholder={props.orgInfo.name}
                  value={name}
                  onChangeText={setName}
                  style={[styles.textInput, { textAlign: "center" }]}
                />
                <Button
                  title="Save Changes"
                  onPress={() => handleSubmit("name", name)}
                />
              </View>
            </View>
            <Button title="Cancel" onPress={() => closeModal()} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType="fade" transparent={false} visible={phoneModal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 30 }}>Edit Phone</Text>
            <View style={{ width: "75%" }}>
              <Text style={{ fontSize: 15 }}>Enter new Phone:</Text>
              <View
                style={{ borderWidth: 5, borderColor: "grey", borderRadius: 5 }}
              >
                <TextInput
                  placeholder={props.orgInfo.phoneNumber}
                  value={phone}
                  onChangeText={setPhone}
                  style={[styles.textInput, { textAlign: "center" }]}
                />
                <Button
                  title="Save Changes"
                  onPress={() => handleSubmit("phoneNumber", phone)}
                />
              </View>
            </View>
            <Button title="Cancel" onPress={() => closeModal()} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType="fade" transparent={false} visible={addressModal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 30 }}>Edit Address</Text>
            <View
              style={{
                width: "75%",
                height: "30%",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 15 }}>Enter new Address:</Text>
                <View
                  style={{
                    borderWidth: 5,
                    borderColor: "grey",
                    borderRadius: 5,
                  }}
                >
                  <TextInput
                    placeholder={props.orgInfo.address}
                    value={address}
                    onChangeText={setAddress}
                    style={[styles.textInput, { textAlign: "center" }]}
                  />
                  <Button
                    title="Save Changes"
                    onPress={() => handleSubmit("address", address)}
                  />
                </View>
              </View>
            </View>
            <Button title="Cancel" onPress={() => closeModal()} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="fade"
        transparent={false}
        visible={descriptionModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
            <Text style={{ fontSize: 30 }}>Edit Address</Text>
            <View
              style={{
                width: "75%",
                height: "30%",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 15 }}>Enter new Description:</Text>
                <View
                  style={{
                    borderWidth: 5,
                    borderColor: "grey",
                    borderRadius: 5,
                  }}
                >
                  <TextInput
                    placeholder={props.orgInfo.description}
                    value={address}
                    onChangeText={setDescription}
                    style={[styles.textInput, { textAlign: "center" }]}
                  />
                  <Button
                    title="Save Changes"
                    onPress={() => handleSubmit("description", description)}
                  />
                </View>
              </View>
            </View>
            <Button title="Cancel" onPress={() => closeModal()} />
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
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
