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

import { connect } from 'react-redux';

export const Chat = props => {

  const [chats, setChats] = useState([
    { id: 1, item: 'Chat1' },
    { id: 2, item: 'Chat2' },
    { id: 3, item: 'Chat3' },
    { id: 4, item: 'Chat4' },
    { id: 5, item: 'Chat5' },
    { id: 6, item: 'Chat6' },
    { id: 7, item: 'Chat7' },
    { id: 8, item: 'Chat9' },
    { id: 9, item: 'Chat9' },
    { id: 10, item: 'Chat10' },
    { id: 11, item: 'Chat11' },
    { id: 12, item: 'Chat12' },
    { id: 13, item: 'Chat13' },
    { id: 14, item: 'Chat14' },
    { id: 15, item: 'Chat15' },
  ]);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null)

  async function handleSend() {
    // await props.sendMessage()
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ScrollView>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                setVisible(true);
              }}
            >
              <View style={styles.listItemView}>
                <Text style={styles.listText}>{item.item}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
      />

      <Modal animationType="fade" transparent={false} visible={visible}>
        <View style={styles.container}>
          <View style={styles.btn}>
            <Button
              style={styles.btn}
              title="Back"
              onPress={() => {
                setVisible(false);
              }}
            ></Button>
          </View>
          <View>
            <TextInput style={styles.input} onChangeText={setMessage} value={message} />
            <Button title="Send" onPress={() => {handleSend()}} />
          </View>
        </View>
      </Modal>
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
    user: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(fetchMessages()),
    sendMessage: () => dispatch(sendMessage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
