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
import { connect } from "react-redux";
import { clearMessages, fetchMessages, sendMessage } from "../store/messages";

const ChatView = (props) => {
  const [message, setMessage] = useState(null);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const func = async () => {
      await props.fetchMessages(props.receiverId);
      if (isMounted) {
        setAllMessages(props.messages);
      }
    };
    func();
    return () => {
      isMounted = false;
    };
  }, [allMessages]);

  function displayMessages() {
    return allMessages.map((message) =>
      message.receiverId === props.receiverId ? (
        <Text
          key={message.id}
          style={{
            backgroundColor: "white",
            borderRadius: 25,
            borderBottomRightRadius: 0,
            borderWidth: 2,
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
            backgroundColor: "#f5565a",
            borderRadius: 25,
            borderBottomLeftRadius: 0,
            borderWidth: 2,
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
    await props.sendMessage(message, props.receiverId);
    setMessage(null);
  }

  async function handleClose() {
    setAllMessages([]);
    props.clearMessages();
    props.toggleVisibility(false);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Modal animationType="fade" transparent={false} visible={props.visible}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "darkgrey",
              flexDirection: "row",
              minHeight: 50,
              maxHeight: 50,
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleClose();
              }}
            >
              <Text style={{ fontSize: 35, paddingLeft: 10 }}>{"<"}</Text>
            </TouchableOpacity>
            <Text numberOfLines={1} style={{ fontSize: 30, paddingLeft: 10 }}>
              {props.org.name}
            </Text>
          </View>
          <ScrollView>{displayMessages()}</ScrollView>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ececec",
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
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ececec",
    flex: 1,
    marginTop: 50,
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
    fetchMessages: (receiverId) => dispatch(fetchMessages(receiverId)),
    sendMessage: (msg, recId) => dispatch(sendMessage(msg, recId)),
    clearMessages: () => dispatch(clearMessages()),
  };
};

export default connect(mapState, mapDispatch)(ChatView);
