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
import ChatView from './ChatView';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchChats, setChats } from '../store/chats';
import { fetchForeignOrganization } from '../store/singleForeignOrg';

export const Chat = props => {

  const [visible, setVisible] = useState(false);

  const orgInfo = useSelector((state) => state.singleOrg);
  const [chats, setChats] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchChats());
      setChats(props.chats)
    })();
  }, [chats]);

  function toggleVisibility(status) {
    setVisible(status)
  }

  async function handleOnPress(orgId) {
    await props.fetchOrganization(Number(orgId))
    setVisible(true)
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
                handleOnPress(item.id)
              }}
            >
              <View style={styles.listItemView}>
                <Text numberOfLines={1} style={{ fontSize: 20 }}>{`Org Name`}</Text>
                <Text numberOfLines={1} style={{ fontSize: 10 }}>{item.msg}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
      {visible === true ? (<ChatView visibleStatus={visible} org={props.org} receiverId={props.org.id} toggleVisibility={toggleVisibility} />) : (<View></View>)}
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
    org: state.singleForeignOrg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChats: () => dispatch(fetchChats()),
    fetchOrganization: (id) => dispatch(fetchForeignOrganization(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
