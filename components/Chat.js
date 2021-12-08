import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../store/chats";

export const Chat = (props) => {
  const dispatch = useDispatch();
  let timeAgo = require("node-time-ago");

  useEffect(() => {
    (async () => {
      await dispatch(fetchChats());
    })();
  }, []);

  const chats = useSelector((state) => state.chats);

  function handleOnPress(orgId) {
    props.navigation.navigate("ChatView", {
      foreignId: orgId,
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ScrollView>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                handleOnPress(item.id);
              }}
            >
              <View style={styles.listItemView}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 20, maxWidth: "50%" }}
                  >
                    {item.orgName}
                  </Text>
                  <Text numberOfLines={1} style={{ fontSize: 15 }}>
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
                <Text numberOfLines={1} style={{ fontSize: 10 }}>
                  {item.msg}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  listItem: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 2,
    borderColor: "#eee",
  },
  listItemView: {},
  btn: {
    marginRight: 315,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});

export default Chat;
