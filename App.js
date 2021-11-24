import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Map } from './Map'
import { Text, View, Button } from 'react-native';


const Stack = createNativeStackNavigator(
);

const YourApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Map' options={{ title: '' }} component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default YourApp;