import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MessageHomeScreen from './MessageHomeScreen';
import MessageLayoutScreen from './MessageLayoutScreen';


const SecondStack = createStackNavigator();

const SecondStackScreen = ({navigation}) => (
    <SecondStack.Navigator headerMode='none'>
        <SecondStack.Screen name="MessageHomeScreen" component={MessageHomeScreen}/>
        <SecondStack.Screen name="MessageLayoutScreen" component={MessageLayoutScreen}/>

    </SecondStack.Navigator>
);

export default SecondStackScreen;