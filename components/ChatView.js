import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { clearMessages, fetchMessages, sendMessage } from "../store/messages";
import { fetchForeignOrganization } from "../store/singleForeignOrg";

const ChatView = (props) => {
  const [message, setMessage] = useState(null);
  const [allMessages, setAllMessages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchForeignOrganization(props.route.params.foreignId));
      await dispatch(fetchMessages(props.route.params.foreignId));
    })();
  }, []);

  const foreignOrgInfo = useSelector((state) => state.singleForeignOrg);
  const messagesList = useSelector((state) => state.messages);

  console.log(Date.now());

  /*   useEffect(() => {
    let isMounted = true;
    const func = async () => {
      await props.fetchMessages(foreignOrgInfo.id);
      if (isMounted) {
        setAllMessages(props.messages);
      }
    };
    func();
    return () => {
      isMounted = false;
    };
  }, [allMessages]); */

  function displayMessages() {
    return messagesList.map((message) =>
      message.receiverId === foreignOrgInfo.id ? (
        <Text
          key={message.id}
          style={{
            backgroundColor: "whitesmoke",
            borderRadius: 25,
            borderBottomRightRadius: 0,
            margin: 5,
            padding: 10,
            maxWidth: "50%",
            alignSelf: "flex-end",
          }}
        >
          {message.messageText}
        </Text>
      ) : (
        <Text
          key={message.id}
          style={{
            backgroundColor: "lightblue",
            borderRadius: 25,
            borderBottomLeftRadius: 0,
            margin: 5,
            padding: 10,
            maxWidth: "50%",
            alignSelf: "flex-start",
          }}
        >
          {message.messageText}
        </Text>
      )
    );
  }

  async function handleSend() {
    await dispatch(sendMessage(message, foreignOrgInfo.id));
    setMessage(null);
  }

  async function handleClose() {
    setAllMessages([]);
    props.clearMessages();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={styles.container}>
        <ScrollView>{displayMessages()}</ScrollView>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#93c47d",
            alignItems: "center",
            minHeight: 20,
            maxHeight: 50,
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={setMessage}
            value={message}
          />
          <TouchableOpacity
            onPress={() => {
              handleSend();
            }}
            style={{
              backgroundColor: "lightblue",
              width: "15%",
              minHeight: "50%",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 25,
            }}
          >
            <Text style={{ textAlign: "center" }}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#93c47d",
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 3,
    paddingRight: 3,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  listItem: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 2,
    borderColor: "#eee",
  },
  listItemView: {},
  listText: {
    fontSize: 40,
  },
  btn: {
    alignSelf: "flex-start",
    width: "20%",
  },
  input: {
    backgroundColor: "whitesmoke",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 25,
    paddingLeft: 10,
    margin: 10,
    minHeight: "30%",
    width: "75%",
  },
  messageUser: {},
  messageReceiver: {},
});

const mapState = (state) => {
  return {
    messages: state.messages,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    sendMessage: (msg, recId) => dispatch(sendMessage(msg, recId)),
    clearMessages: () => dispatch(clearMessages()),
  };
};

export default connect(mapState, mapDispatch)(ChatView);
