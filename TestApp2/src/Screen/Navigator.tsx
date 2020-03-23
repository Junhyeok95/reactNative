import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

import {UserContext} from '~/Context/User';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import TabFirst from './TabFirst';
import TabSecond from './TabSecond';
import TabThird from './TabThird';
import TabFourth from './TabFourth';
import Modal from './Modal';

import Styled from 'styled-components/native';

const TouchableOpacity = Styled.TouchableOpacity`
  background-color: black;
  margin-left: 8px;
`;

const Label = Styled.Text`
  color: white;
`;

import YJU from './YJU';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

type TypeDrawerProp = DrawerNavigationProp<
  {
    TabNavi: undefined;
    MaterialTabNavi: undefined;
    MaterialTopTabNaviStackNavi: undefined;
    Logout: undefined;
  },
  'TabNavi'
>;

interface DrawerProp {
  navigation: TypeDrawerProp;
}

const LoginStackNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0000FF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="SignaIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />      
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerBackTitleVisible: false}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

const TabFirstStackNavi = ({navigation}: DrawerProp) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#446784',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 30,
        },
      }}>
      <Stack.Screen
        name="クルマもり"
        component={TabFirst}
        options={{
          headerLeft: (props: StackHeaderLeftButtonProps) => (
            // <IconButton
            //   iconName="menu"
            //   onPress={() => navigation.openDrawer()}
            // />
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Label>Touch Img</Label>
              <Label>openDrawer</Label>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Modal" component={Modal} />
    </Stack.Navigator>
  );
};

const TabNavi = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen
        name="TabFirstStackNavi"
        component={TabFirstStackNavi}
        options={{
          tabBarLabel: 'Frist',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="TabSecond"
        component={TabSecond}
        options={{
          tabBarLabel: 'Second',
          tabBarIcon: ({color}) => (
            <Icon name="message" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="TabFirstStackNavi"
        component={TabFirstStackNavi}
        options={{
          tabBarLabel: 'Frist',
          tabBarIcon: ({color}) => (
            <Label>Icon</Label>
          ),
        }}
      />
      <Tab.Screen
        name="TabSecond"
        component={TabSecond}
        options={{
          tabBarLabel: 'Second',
          tabBarIcon: ({color}) => (
            <Label>Icon</Label>
          ),
        }}
      />
      <Tab.Screen
        name="TabThird"
        component={TabThird}
        options={{
          tabBarLabel: 'Third',
          tabBarIcon: ({}) => (
            <Label>Icon</Label>
          ),
        }}
      />
      <Tab.Screen
        name="TabFourth"
        component={TabFourth}
        options={{
          tabBarLabel: 'Fourth',
        }}
      />
      <Tab.Screen
        name="YJU"
        component={YJU}
        options={{
          tabBarLabel: 'TabFourth5',
          tabBarIcon: () => (
            <Label>Icon</Label>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const MaterialTabNavi = () => {
//   return (
//     <MaterialTab.Navigator>
//       <MaterialTab.Screen
//         name="TabFirstStackNavi"
//         component={TabFirstStackNavi}
//         options={{
//           tabBarColor: '#281b39',
//           tabBarLabel: 'Frist',
//           tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
//         }}
//       />
//       <MaterialTab.Screen
//         name="TabSecond"
//         component={TabSecond}
//         options={{
//           tabBarColor: '#0e141d',
//           tabBarLabel: 'Second',
//           tabBarIcon: ({color}) => (
//             <Icon name="people" color={color} size={26} />
//           ),
//         }}
//       />
//       <MaterialTab.Screen
//         name="TabThird"
//         component={TabThird}
//         options={{
//           tabBarColor: '#E64A19',
//           tabBarLabel: 'Third',
//           tabBarIcon: ({color}) => (
//             <Icon name="message" color={color} size={26} />
//           ),
//         }}
//       />
//       <MaterialTab.Screen
//         name="TabFourth"
//         component={TabFourth}
//         options={{
//           tabBarColor: '#524365',
//           tabBarLabel: 'Fourth',
//           tabBarIcon: ({color}) => (
//             <Icon name="settings" color={color} size={26} />
//           ),
//         }}
//       />
//     </MaterialTab.Navigator>
//   );
// };

// const MaterialTopTabNavi = () => {
//   return (
//     <MaterailTopTab.Navigator>
//       <MaterailTopTab.Screen name="TabFirst" component={TabFirst} />
//       <MaterailTopTab.Screen name="TabSecond" component={TabSecond} />
//       <MaterailTopTab.Screen name="TabThird" component={TabThird} />
//       <MaterailTopTab.Screen name="TabFourth" component={TabFourth} />
//     </MaterailTopTab.Navigator>
//   );
// };

// const MaterialTopTabNaviStackNavi = ({navigation}: DrawerProp) => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerLeft: (props: StackHeaderLeftButtonProps) => (
//           <IconButton
//             iconName="menu"
//             onPress={() => navigation.openDrawer()}
//             color="black"
//           />
//         ),
//       }}>
//       <Stack.Screen name="MaterialTopTabNavi" component={MaterialTopTabNavi} />
//     </Stack.Navigator>
//   );
// };

const CustomDrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
  logout: () => void,
) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => logout()} />
    </DrawerContentScrollView>
  );
};

const DrawNavi = () => {
  const {logout} = useContext<IUserContext>(UserContext);

  return (
    <Drawer.Navigator
      drawerContent={props => CustomDrawerContent(props, logout)}>
      <Drawer.Screen name="TabNavi" component={TabNavi} />
      {/* <Drawer.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
      <Drawer.Screen
        name="MaterialTopTabNaviStackNavi"
        component={MaterialTopTabNaviStackNavi}
      /> */}
      <Drawer.Screen name="TabNavi2" component={TabNavi} />
      <Drawer.Screen name="TabNavi3" component={TabNavi} />
      <Drawer.Screen name="TabNavi4" component={TabNavi} />
      <Drawer.Screen name="TabNavi5" component={TabNavi} />
      <Drawer.Screen name="TabNavi6" component={TabNavi} />
      <Drawer.Screen name="TabNavi7" component={TabNavi} />
      <Drawer.Screen name="TabNavi8" component={TabNavi} />
      <Drawer.Screen name="TabNavi9" component={TabNavi} />
    </Drawer.Navigator>
  );
};

const MainNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawNavi"
        component={DrawNavi}
        options={{
          headerShown: false,
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
      {userInfo ? <MainNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
};
