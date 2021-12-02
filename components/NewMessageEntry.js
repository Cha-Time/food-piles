import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { writeMessage } from '../store/messages';

const NewMessageEntry = () => {
  const [message, setMessage] = useState('');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Let's get you started.</Text>
        <View
          style={{
            width: '100%',
            minHeight: '10%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={[styles.textInput, { marginBottom: '5%' }]}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: '75%' }}>
          <Button title="Next >" name="next" onPress={() => console.log('test')}></Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    write: str => dispatch(writeMessage(str)),
  };
};
const mapStateToProps = state => {
  return {
    NewMessageEntry: state.NewMessageEntry, //global state but props in this file
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    flexDirection: 'column',
    backgroundColor: '#93c47d',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'whitesmoke',
    color: 'black',
    width: '75%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
