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
import { updateOrganization } from "../store/SingleOrg";
import Ionicons from "react-native-vector-icons/Ionicons";

export const OrganizationInfo = (props) => {

  const [food, setFood] = useState(null);
  const [allergens, setAllergens] = useState(null);

  const [foodInput, setFoodInput] = useState(false);
  const [allergenInput, setAllergenInput] = useState(false);

  const dispatch = useDispatch();

  async function handleSubmit(name, value) {
    if (value !== null) {
      const org = {};
      org[name] = value;
      await dispatch(updateOrganization(org));
      setFood(null)
      setAllergens(null)
      setFoodInput(false);
      setAllergenInput(false);
    }
  }

  function handleBack() {
    setFood(null)
    setAllergens(null)

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
          <Text style={styles.title}>Status Details</Text>
          <View style={styles.allInputs}>
            <View style={styles.inputContainer}>
              <View style={styles.coupledTextContainer}>
                <Text style={styles.inputCategory}>
                  What are you giving away?
                </Text>
                <View style={styles.inputBackground}>
                  {foodInput ? (
                    <TextInput
                      placeholder={props.orgInfo.availableFood}
                      value={food}
                      onChangeText={setFood}
                      multiline={true}
                      style={styles.textInput}
                    />
                  ) : (
                    <Text style={styles.inputValue}>
                      {props.orgInfo.availableFood}
                    </Text>
                  )}
                </View>
              </View>
              {foodInput
                ? submitButton(() => handleSubmit("availableFood", food))
                : editButton(() => setFoodInput(true))}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.coupledTextContainer}>
                <Text style={styles.inputCategory}>Any allergen concerns?</Text>
                <View style={styles.inputBackground}>
                  {allergenInput ? (
                    <TextInput
                      placeholder={props.orgInfo.allergens}
                      value={allergens}
                      onChangeText={setAllergens}
                      multiline={true}
                      style={styles.textInput}
                    />
                  ) : (
                    <Text style={styles.inputValue}>
                      {props.orgInfo.allergens}
                    </Text>
                  )}
                </View>
              </View>
              {allergenInput
                ? submitButton(() => handleSubmit("allergens", allergens))
                : editButton(() => setAllergenInput(true))}
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
    height: "70%",
  },
  coupledTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  inputCategory: {
    fontWeight: "bold",
    fontSize: 18,
    paddingRight: "2%",
    paddingBottom: "2%",
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
    marginTop: "50%",
  },
  backButtonText: {
    fontSize: 22,
    color: "black",
  },
  textInput: {
    width: "90%",
    minHeight: 50,
    color: "black",
    marginLeft: "4%",
  },
  inputValue: {
    width: "100%",
    minHeight: 50,
    color: "black",
    padding: "4%",
  },
  inputBackground: {
    backgroundColor: "white",
    width: 270,
    height: "70%",
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default OrganizationInfo;
