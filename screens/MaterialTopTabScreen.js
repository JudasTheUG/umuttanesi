import * as React from 'react';
import { Text, View, TouchableOpacity,StatusBar} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import ProfileScreen from './ProfileScreen';
import RequestScreen from './RequestScreen';
import EarthQuakeScreen from './EarthQuakeScreen';
import MapScreen from './MapScreen';
import SecondStackScreen from './SecondStackScreen';


const Tab = createMaterialTopTabNavigator();


const MaterialTopTabScreen = ({navigation}) =>(
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#e91e63',
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: 'orange' },
          showIcon: true,
          showLabel: false,
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icons = {
                Profil: 'account',
                Deprem: 'exclamation-thick',
                Umut: 'weather-sunset-up',
                Harita: 'map',
                Mesaj: 'email',
              };
              
              return (
                <View>
                <StatusBar backgroundColor='orange' barStyle="light-content" />
                <MaterialCommunityIcons
                  name={icons[route.name]}
                  color={'black'}
                  size={26}
                />
                </View>
              );
            },
          })}
      >

        <Tab.Screen
          name="Profil"
          component={ProfileScreen}
          options={{ tabBarLabel: 'Profil' }}
        />
        <Tab.Screen
          name="Deprem"
          component={EarthQuakeScreen}
          options={{ tabBarLabel: 'Deprem' }}
        />
        <Tab.Screen
          name="Umut"
          component={RequestScreen}
          options={{ tabBarLabel: 'Umut' }}
        />
        <Tab.Screen
          name="Harita"
          component={MapScreen}
          options={{ tabBarLabel: 'Harita' }}
        />
          <Tab.Screen
          name="Mesaj"
          component={SecondStackScreen}
          options={{ tabBarLabel: 'Mesaj' }}
        />

      </Tab.Navigator>

    );

export default MaterialTopTabScreen; 