import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchMessages } from '../store/messages';

import { connect } from 'react-redux';

export const Chat = props => {
  useEffect(() => {
    (async () => {
      await props.getMessages();
    })();
  }, []);
  // console.log('----->', props);
  console.log('----->', props.messages);

  return (
    <View style={styles.container}>
      <Text>Chat component is a work in progress!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

const mapStateToProps = state => {
  return {
    messages: state.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(fetchMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
