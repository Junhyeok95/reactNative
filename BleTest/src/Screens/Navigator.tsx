import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '~/Screens/Main';
import GPS from '~/Screens/GPS';
import BLE from '~/Screens/BLE';
import Data from '~/Screens/Data';
import Connect from '~/Screens/Connect';
import SplashScreen from 'react-native-splash-screen'

import { Context } from '~/Context/Rasb';

const Stack = createStackNavigator();

////////// ////////// ////////// ////////// //////////

const DataStackNavi = () => {
  useEffect(() => {
    console.log("DataStackNavi useEffect");
  },[]);
  return (
    <Stack.Navigator>
      <Stack.Screen     
        name="Data"
        component={Data}
      />
    </Stack.Navigator>
  );
};
const BStackNavi = () => {
  useEffect(() => {
    console.log("BStackNavi useEffect");
  },[]);
  return (
    <Stack.Navigator>
      <Stack.Screen     
        name="DataStackNavi"
        component={DataStackNavi}
      />
    </Stack.Navigator>
  );
};

////////// ////////// ////////// ////////// //////////

const ConnectStackNavi = () => {
  useEffect(() => {
    console.log("ConnectStackNavi useEffect");
  },[]);
  return (
    <Stack.Navigator>
      <Stack.Screen     
        name="Connect"
        component={Connect}
      />
    </Stack.Navigator>
  );
};
const AStackNavi = () => {
  useEffect(() => {
    console.log("AStackNavi useEffect");
  },[]);
  return (
    <Stack.Navigator>
      <Stack.Screen     
        name="ConnectStackNavi"
        component={ConnectStackNavi}
        options={{
        }}
      />
    </Stack.Navigator>
  );
};

////////// ////////// ////////// ////////// //////////

const TestStackNavi = () => {

  useEffect(() => {
    console.log("TestStackNavi useEffect");
  },[]);

  return (
    <Stack.Navigator>
      <Stack.Screen     
        name="AStackNavi"
        component={AStackNavi}
      />
      <Stack.Screen     
        name="BStackNavi"
        component={BStackNavi}
      />
    </Stack.Navigator>
  );
};

////////// ////////// ////////// ////////// //////////
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
  const {info} = useContext<IContext>(Context); // 프로바이더에서 타입을 정해서 만들어둠

  useEffect(()=> {
    console.log(info);
    console.log("Navigator useEffect");
  },[]);

  return (
    <NavigationContainer>
      {info ? <TestStackNavi /> : <RootNavi />}
    </NavigationContainer>
  );
};
