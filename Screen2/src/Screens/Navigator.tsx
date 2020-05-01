import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {UserContext} from '~/Contexts/User';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import Modal from './Modal';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LoginStackNavi = () => {
  useEffect(() => {
    console.log("--- LoginStackNavi useEffect");
    return () => {
      console.log(">>> LoginStackNavi WillUnmount");
    }
  },[]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#AAAAAA',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
  logout: () => void
) => {

  useEffect(() => {
    console.log("--- CustomDrawerContent useEffect");
    return () => {
      console.log("--- CustomDrawerContent WillUnmount");
    }
  },[]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="로그아웃"
        onPress={() => logout()}
      />
    </DrawerContentScrollView>
  );
};

const DrawNavi = () => {

  useEffect(() => {
    console.log("--- DrawNavi useEffect");
    return () => {
      console.log("--- DrawNavi WillUnmount");
    }
  },[]);

  const {logout} = useContext<IUserContext>(UserContext);

  return (
    <Drawer.Navigator
      drawerContent={props => CustomDrawerContent(props, logout)}
      drawerPosition="right"
    >
      <Drawer.Screen
        name="MainTabNavi"
        component={Modal}
        options={{
          title: '메인',
        }}
      />
      <Drawer.Screen
        name="MapStackNavi"
        component={Modal}
        options={{
          title: '지도',
        }}
      />
    </Drawer.Navigator>
  );
};

const RootNavi = () => {

  // useEffect(() => {
  //   console.log("--- RootNavi useEffect");
  //   return () => {
  //     console.log("--- RootNavi WillUnmount");
  //   }
  // },[]);

  return (
    <Stack.Navigator>
      <Stack.Screen     
        name="DrawNavi"
        component={DrawNavi}
        options={{
          headerShown: false,
          animationEnabled: true,
        }}
      />
      {/* <Stack.Screen name="FullModal" component={} /> */}
    </Stack.Navigator>
  );
};

export default () => {

  // useEffect(() => {
  //   console.log("--- Navigation useEffect");
  //   return () => {
  //     console.log("--- Navigation WillUnmount");
  //   }
  // },[]);

  const {userInfo} = useContext<IUserContext>(UserContext);

  return (
    <NavigationContainer>
      {userInfo ? <RootNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
};
