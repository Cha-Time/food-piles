import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  Button,
  TextInput,
} from "react-native";
import ChatView from "./ChatView";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchChats, setChats } from "../store/chats";
import { fetchForeignOrganization } from "../store/singleForeignOrg";

export const Chat = (props) => {
  const [visible, setVisible] = useState(false);

  const orgInfo = useSelector((state) => state.singleOrg);

  const dispatch = useDispatch();
  let timeAgo = require("node-time-ago");

  useEffect(() => {
    (async () => {
      await dispatch(fetchChats());
    })();
  }, [props.chats]);

  function toggleVisibility(status) {
    setVisible(status);
  }

  async function handleOnPress(orgId) {
    await props.fetchOrganization(Number(orgId));
    setVisible(true);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={props.chats}
        renderItem={({ item }) => (
          <ScrollView>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                handleOnPress(item.id);
              }}
            >
              <View style={styles.listItemView}>
                <View style={styles.textContainer}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item.orgName}
                  </Text>
                  <Text numberOfLines={1} style={styles.subTitle}>
                    {item.msg}
                  </Text>
                </View>
                <Text numberOfLines={1} style={{ fontSize: 12 }}>
                  {`${
                    (Date.now() - new Date(item.msgTime).valueOf()) /
                      1000 /
                      60 /
                      60 /
                      24 >
                    1
                      ? new Date(item.msgTime).toDateString()
                      : (Date.now() - new Date(item.msgTime).valueOf()) /
                          1000 /
                          60 <
                        1
                      ? "just now"
                      : timeAgo(item.msgTime)
                  }`}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
      {visible === true ? (
        <ChatView
          visibleStatus={visible}
          org={props.org}
          receiverId={props.org.id}
          toggleVisibility={toggleVisibility}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(219, 154, 155, 0.1)",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    padding: "5%",
    borderBottomColor: "gray",
    width: "96%",
    borderBottomWidth: 0.5,
    alignItems: "center",
  },
  listItemView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: 20,
    width: "70%",
    fontWeight: "bold",
    color: "#353839",
  },
  subTitle: {
    paddingTop: "3%",
    fontSize: 14,
    width: "70%",
    color: "#4f4e4e",
  },
});

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth,
    chats: state.chats,
    org: state.singleForeignOrg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChats: () => dispatch(fetchChats()),
    fetchOrganization: (id) => dispatch(fetchForeignOrganization(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
