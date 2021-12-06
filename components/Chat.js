import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { fetchMessages } from '../store/messages';
import ChatView from './ChatView';
import { connect, useDispatch } from 'react-redux';
import { fetchChats } from '../store/chats';
import { fetchOrganization } from '../store/SingleOrg';

export const Chat = props => {

  const [visible, setVisible] = useState(false);

  async function loadData() {
    await props.fetchChats()
  }

  function toggleVisibility(status) {
    setVisible(status)
  }

  async function handleOnPress(orgId) {
    await props.fetchOrganization(Number(orgId))
    console.log(props.org)
    setVisible(true)
  }

  loadData()
  return (
    <View style={styles.container}>
      <FlatList
        data={props.chats}
        renderItem={({ item }) => (
          <ScrollView>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                
                handleOnPress(item.id)
              }}
            >
              <View style={styles.listItemView}>
                <Text numberOfLines={1} style={styles.listText}>{item.msg}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
      {visible === true ? ( <ChatView visibleStatus={visible} org={props.org} receiverId={props.org.id} toggleVisibility={toggleVisibility}/>) : (<View></View>)}
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
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  listItemView: {},
  listText: {
    fontSize: 40,
  },
  btn: {
    marginRight: 315,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});

const mapStateToProps = state => {
  return {
    messages: state.messages,
    user: state.auth,
    chats: state.chats,
    org: state.singleOrg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(fetchMessages()),
    sendMessage: () => dispatch(sendMessage()),
    fetchChats: () => dispatch(fetchChats()),
    fetchOrganization: (id) => dispatch(fetchOrganization(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
