import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View , Dimensions} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from './Home'
import Chat from './Chat'

import socketIOClient from 'socket.io-client'
export const socket = socketIOClient("http://192.168.1.54:3000")

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: Dimensions.get("window").width,
    backgroundColor: "grey",
  },
  input: {
    width: "70%",
  },
  list : {
    width: Dimensions.get("window").width
  }
});

export const rooms = ["Family", "Work", "Sport"]

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        {rooms.map((e) => (
          <Stack.Screen name={e} component={Chat}/>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
