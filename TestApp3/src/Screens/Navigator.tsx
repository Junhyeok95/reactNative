import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';
import {UserContext} from '~/Contexts/User';

import CustomDrawer from '~/Screens/Drawer';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import Modal from './Modal';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

type TypeDrawerProp = DrawerNavigationProp<DrawNaviParamList, 'MainTabNavi'>;
interface DrawerProp {
  navigation: TypeDrawerProp;
}

const LoginStackNavi = () => {
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
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerBackTitleVisible: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerBackTitleVisible: false,
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

const DrawNavi = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer props={props} />}
      drawerPosition="right"
    >
      <Drawer.Screen
        name="MainTabNavi"
        component={Modal}
        options={{
          title: '메인',
          animationEnabled: false,
        }}
      />
      <Drawer.Screen
        name="MapStackNavi"
        component={Modal}
        options={{
          title: '지도',
          animationEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const RootNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen     
        name="DrawNavi"
        component={DrawNavi}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
      />
      {/* <Stack.Screen name="FullModal" component={} /> */}
    </Stack.Navigator>
  );
};

export default () => {
  const {userInfo} = useContext<IUserContext>(UserContext);
  return (
    <NavigationContainer>
      {userInfo ? <RootNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
};
