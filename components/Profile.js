import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { me } from '../store/auth';
import { connect, useDispatch, useSelector } from "react-redux";

////// Import Components
import AccountInfo from "./AccountInfo";
import OrganizationInfo from "./OrganizationInfo";

////// Main
export const Profile = (props) => {

  const [user, setUser] = useState(props.user)
  const [page, setPage] = useState('hub')

  function handleChangePage(pageName) {
    setPage(pageName)
  }

  if (page === 'hub') {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>{user.username}</Text>
        <View>
          <Button title='Account Info' name='accountInfo' onPress={() => setPage('Account Info')}></Button>
          <Button title='Organization Info' name='organizationInfo' onPress={() => setPage('Organization Info')}></Button>
          <Button title='Status Info' name='statusInfo' onPress={() => setPage('Status Info')}></Button>
        </View>
      </View>
    );
  } else if (page === 'Account Info') {
    return (
      <AccountInfo handleChangePage={handleChangePage} user={user} />
    );
  } else if (page === 'Organization Info') {
    return (
      <OrganizationInfo handleChangePage={handleChangePage} user={user} />
    );
  }
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


