import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

import Styled from 'styled-components/native';
//https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import IconButton from '~/Components/IconButton';
// Contexts
import {UserContext} from '~/Contexts/User';
// Screens
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import Modal from './Modal';

import Driving from './Driving';
import Profile from './Profile';
import Setting from './Setting';

import MapData from './MapData';
import MapMarker from './MapMarker';
import BleTest from './BleTest';

import Device from './Device';
import Camera from './Camera';
import Sensor from './Sensor';

import CustomDrawer from '~/Screens/Drawer';

const TestContainer = () => { return (<></>); }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const MaterailTopTab = createMaterialTopTabNavigator();

type TypeDrawerProp = DrawerNavigationProp<DrawNaviParamList, 'MainTabNavi'>;
interface DrawerProp {
  navigation: TypeDrawerProp;
}

const LoginStackNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
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
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

// MainTabNavi ----------------------------------------
const MainFirstStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#446784',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: (props: {}) => (
          <IconButton
            iconName="menu"
            color="black"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Driving"
        component={Driving}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};
const MainSecondStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#446784',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: (props: {}) => (
          <IconButton
            iconName="menu"
            color="black"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};
const MainThirdStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#446784',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: (props: {}) => (
          <IconButton
            iconName="menu"
            color="black"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};
const MainTabNavi = () => {
  return (
    <Tab.Navigator tabBarOptions={{activeTintColor: 'black'}}>
      <Tab.Screen
        name="MainFirstStackNavi"
        component={MainFirstStackNavi}
        options={{
          tabBarLabel: '운전',
          tabBarIcon: ({color}) => (
            <Icon name="drive-eta" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="MainSecondStackNavi"
        component={MainSecondStackNavi}
        options={{
          tabBarLabel: '프로필',
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="MainThirdStackNavi"
        component={MainThirdStackNavi}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({color}) => (
            <Icon name="settings" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
// MainTabNavi ----------------------------------------

// MapStackNavi ----------------------------------------
const MapMaterialTopTabNavi = () => {
  return (
    <MaterailTopTab.Navigator>
      <MaterailTopTab.Screen
        name="MapData"
        component={MapData}
        options={{
        }}
      />
      <MaterailTopTab.Screen
        name="MapMarker"
        component={MapMarker}
        options={{
        }}
      />
      <MaterailTopTab.Screen
        name="BleTest"
        component={BleTest}
        options={{
        }}
      />
    </MaterailTopTab.Navigator>
  );
};
const MapStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#446784',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: (props: {}) => (
          <IconButton
            iconName="menu"
            color="black"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="MapMaterialTopTabNavi"
        component={MapMaterialTopTabNavi}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};
// MapStackNavi ----------------------------------------

// DeviceStackNavi ----------------------------------------
const DeviceMaterialTopTabNavi = () => {
  return (
    <MaterailTopTab.Navigator>
      <MaterailTopTab.Screen
        name="Device"
        component={Device}
        options={{
        }}
      />
      <MaterailTopTab.Screen
        name="Camera"
        component={Camera}
        options={{
        }}
      />
      <MaterailTopTab.Screen
        name="Sensor"
        component={Sensor}
        options={{
        }}
      />
    </MaterailTopTab.Navigator>
  );
};

const DeviceStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#446784',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerRight: (props: {}) => (
          <IconButton
            iconName="menu"
            color="black"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="DeviceMaterialTopTabNavi"
        component={DeviceMaterialTopTabNavi}
        options={{
          headerTitle:"クルマモリ9",
          headerBackTitleVisible: false
        }}
      />
    </Stack.Navigator>
  );
};
// DeviceStackNavi ----------------------------------------

// const CustomDrawerContent = (
//   props: DrawerContentComponentProps<DrawerContentOptions>,
//   logout: () => void
// ) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         // label="Logout"
//         label="로그아웃"
//         onPress={() => logout()}
//       />
//     </DrawerContentScrollView>
//   );
// };

const DrawNavi = () => {
  // const {logout} = useContext<IUserContext>(UserContext);

  return (
    <Drawer.Navigator
      // drawerContent={props => CustomDrawerContent(props, logout)}
      drawerPosition="right"
      // drawerType={'back'}
      // hideStatusBar={true}
      drawerContent={props => <CustomDrawer props={props} />}
    >
      <Drawer.Screen
        name="MainTabNavi"
        component={MainTabNavi}
        options={{
          title: '메인',
        }}
      />
      <Drawer.Screen
        name="MapStackNavi"
        component={MapStackNavi}
        options={{
          title: '지도',
        }}
      />
      <Drawer.Screen
        name="DeviceStackNavi"
        component={DeviceStackNavi}
        options={{
          title: '장치',
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
          headerShown: false, // false == header: null
          animationEnabled:false,
        }}
      />
      <Stack.Screen name="FullModal" component={Modal} />
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
