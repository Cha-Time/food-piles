import * as React from "react";
import MainContainer from "./MainContainer";
import { StatusBar, StyleSheet } from "react-native";

function App() {
  return <MainContainer style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default App;
