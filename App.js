/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './screens/RootStackScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
function App() {
  return (
    <NavigationContainer>
      <RootStackScreen/>
    </NavigationContainer>
  );
}

export default App;