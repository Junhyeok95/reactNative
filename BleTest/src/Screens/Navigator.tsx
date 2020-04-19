import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '~/Screens/Main';
import GPS from '~/Screens/GPS';
import BLE from '~/Screens/BLE';
import Data from '~/Screens/Data';
import Connect from '~/Screens/Connect';
import SplashScreen from 'react-native-splash-screen'
import LoginBle from '~/Screens/BLE';

import { Context } from '~/Context/Rasb';
import Styled from 'styled-components/native';
const View = Styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #DDD;
`;
const Text = Styled.Text`
  font-size: 32px;
`;

const Stack = createStackNavigator();

const TestView = () => { return (<View><Text>뒤로가기</Text></View>); }

interface Props {
  route ?: any;
}

////////// ////////// ////////// ////////// //////////

const DataStackNavi = ({route}:Props) => {
  let stackId:string = route.params.stackId;
  useEffect(() => {
    console.log("DataStackNavi useEffect");
    console.log(route);
  },[]);
  return (
    <Stack.Navigator
      initialRouteName={ stackId == "main" ? "Data" : "LoginBle" }
      >
      <Stack.Screen     
        name="Data"
        component={Data}
      />
      <Stack.Screen     
        name="LoginBle"
        component={LoginBle}
      />
    </Stack.Navigator>
  );
};
const BStackNavi = ({route}:Props) => {
  console.log(route.params);
  let check:boolean;
  let stackId:string = '';
  if (route.params==undefined) check = true;
    else {
      check = false;
      stackId=route.params.id;
    }

  useEffect(() => {
    console.log("BStackNavi useEffect");
  },[]);

  return (
    <Stack.Navigator
      initialRouteName={ route.params==undefined ? "TestView" : "DataStackNavi" }>
      <Stack.Screen     
        name="TestView"
        component={TestView}
      />
      <Stack.Screen     
        name="DataStackNavi"
        component={DataStackNavi}
        initialParams={{stackId}}
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
      <Stack.Screen     
        name="ConnectStackNaviLoginBle"
        component={TestView}
      />
    </Stack.Navigator>
  );
};
////////// ////////// ////////// ////////// //////////
import {StackNavigationProp} from '@react-navigation/stack';
type NavigationProp = StackNavigationProp<{
  Data: undefined;
}, 'Data'>;

interface Props {
  navigation: NavigationProp;
}
////////// ////////// ////////// ////////// //////////
const AStackNavi = ({navigation} : Props) => {
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
      <Stack.Screen     
        name="LoginBleAStack"
        component={TestView}
        options={{
        }}
      />
    </Stack.Navigator>
  );
};

////////// ////////// ////////// ////////// //////////

const TestStackNavi = () => {

  useEffect(() => {
    console.log(">>>>> TestStackNavi useEffect");
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
    console.log(">>>>> >>>>> RootNavi useEffect");
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
    console.log(">>> 최종 ... >>>Navigator useEffect");
  },[]);

  return (
    <NavigationContainer>
      {info ? <TestStackNavi /> : <RootNavi />}
    </NavigationContainer>
  );
};
