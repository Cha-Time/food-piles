import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { me } from '../store/auth';
import { connect, useDispatch, useSelector } from "react-redux";

export const Profile = (props) => {

  const [user, setUser] = useState(props.user)
  // console.log(props)

  return (
    <View style={styles.container}>
      <Text>{user.username}</Text>
    </View>
  );
};

const mapState = (state) => {
  return {
    user: state.auth
  }
}

export default connect(mapState)(Profile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});


