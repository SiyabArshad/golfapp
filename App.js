import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as Font from "expo-font";

import { LogBox } from 'react-native';
import Loading from './src/Components/Loading';
import Onboard from './src/Screens/Onboard';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Forgotpass from './src/Screens/Forgotpass';
import Aboutus from './src/Screens/Aboutus';
import Premium from './src/Screens/Premium';
import UpdateProfile from './src/Screens/UpdateProfile';
import Home from './src/Screens/Home';
import Course from './src/Screens/Course';
import Chat from './src/Screens/Chat';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabNavigation from './src/Components/TabNavigation';
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs()
  const [fontsLoaded, error] = Font.useFonts({
    'Nunito-Black': require('./assets/fonts/Nunito-Black.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito-Light.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'RobotoMono-Bold': require('./assets/fonts/RobotoMono-Bold.ttf'),
    'RobotoMono-Light': require('./assets/fonts/RobotoMono-Light.ttf'),
    'RobotoMono-Medium': require('./assets/fonts/RobotoMono-Medium.ttf'),
    'RobotoMono-Regular': require('./assets/fonts/RobotoMono-Regular.ttf'),
    'RobotoMono-SemiBold': require('./assets/fonts/RobotoMono-SemiBold.ttf'),
    'RobotoMono-Thin': require('./assets/fonts/RobotoMono-Thin.ttf'),
  });
  if(!fontsLoaded)
  {
    return <Loading visible={true}/>
  }
  return (
    <NavigationContainer >
    <Stack.Navigator initialroute="onboard" screenOptions={{headerShown:false}} >
      <Stack.Screen name="onboard" component={Onboard} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="forgot" component={Forgotpass}  />
      <Stack.Screen name='signup' component={Signup}/>
      <Stack.Screen name='about' component={Aboutus}/>
      <Stack.Screen name='premium' component={Premium}/>
      <Stack.Screen name='edit' component={UpdateProfile}/>
      <Stack.Screen name='chat' component={Chat}/>
      <Stack.Screen name='course' component={Course}/>
      <Stack.Screen name='home' component={TabNavigation}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
