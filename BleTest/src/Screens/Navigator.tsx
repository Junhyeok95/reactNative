import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '~/Screens/Main';
import GPS from '~/Screens/GPS';
import BLE from '~/Screens/BLE';
import SplashScreen from 'react-native-splash-screen'

const Stack = createStackNavigator();

const RootNavi = () => {

  useEffect(()=> {
    console.log("RootNavi useEffect");
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  },[]);

  return (
    <Stack.Navigator>
      <Stack.Screen     
        name="Main"
        component={Main}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="GPS"
        component={GPS}
        options={{
          // headerShown: false
        }}
      />
      <Stack.Screen
        name="BLE"
        component={BLE}
        options={{
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};

export default () => {

  useEffect(()=> {
    console.log("Navigator useEffect");
  },[]);

  return (
    <NavigationContainer>
      <RootNavi />
    </NavigationContainer>
  );
};
