import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SecondIntroScreen from './SecondIntroScreen';
import HelpeeScreen from './HelpeeScreen';
import HelperScreen from './HelperScreen';

const SeconStack = createStackNavigator();

const RequestScreen = ({navigation}) => (
    <SeconStack.Navigator headerMode='none'>
        <SeconStack.Screen name="SecondIntroScreen" component={SecondIntroScreen}/>
        <SeconStack.Screen name="HelpeeScreen" component={HelpeeScreen}/>
        <SeconStack.Screen name="HelperScreen" component={HelperScreen}/>
    </SeconStack.Navigator>
);

export default RequestScreen;