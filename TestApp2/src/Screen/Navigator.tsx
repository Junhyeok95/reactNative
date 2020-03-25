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

//https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/MaterialIcons';

import {UserContext} from '~/Context/User';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import TabFirst from './TabFirst';
import TabSecond from './TabSecond';
import TabThird from './TabThird';
import Modal from './Modal';

const Container = () => { return (<></>); }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// ------------------------------------------------------------------------
// type TypeDrawerProp = DrawerNavigationProp<
//   {
//     TabNavi: undefined;
//     Logout: undefined;
//   },
//   'TabNavi'
// >;
// interface DrawerProp {
//   navigation: TypeDrawerProp;
// }
const LoginStackNavi = () => {
  // {navigation}: DrawerProp 전달하고
  // headerLeft: (props: StackHeaderLeftButtonProps) => (
  // onPress={() => navigation.openDrawer() 를 통해서 드로우 호출 가능
// ------------------------------------------------------------------------
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth:3
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
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
        options={{
          headerTitle:"회원가입",
          headerBackTitleVisible: false
        }} // 뒤로가기 버튼 타이틀
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerTitle:"비밀번호 재설정",
          headerBackTitleVisible: false,
        }} // 뒤로가기 버튼 타이틀
      />
    </Stack.Navigator>
  );
};

const TabFirstStackNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#446784',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="MyInfo"
        component={TabFirst}
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

const TabSecondStackNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#446784',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="DrivingScore"
        component={TabSecond}
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

const TabThirdStackNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#446784',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="Setup"
        component={TabThird}
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

const TabNavi = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TabFirstStackNavi"
        component={TabFirstStackNavi}
        options={{
          tabBarLabel: '내 정보',
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="TabSecond"
        component={TabSecondStackNavi}
        options={{
          tabBarLabel: '운전 점수',
          tabBarIcon: ({color}) => (
            <Icon name="drive-eta" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="TabThird"
        component={TabThirdStackNavi}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({color}) => (
            <Icon name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const CustomDrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
  logout: () => void,
) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        // label="Logout"
        label="로그아웃"
        onPress={() => logout()}
      />
    </DrawerContentScrollView>
  );
};

const DrawNavi = () => {
  const {logout} = useContext<IUserContext>(UserContext);

  return (
    <Drawer.Navigator
      drawerContent={props => CustomDrawerContent(props, logout)}
      drawerPosition={"right"}
      // drawerType={'back'}
      // hideStatusBar={true}
    >
      <Drawer.Screen
        name="TabNavi"
        component={TabNavi}
        options={{
          title: '메인 페이지',
        }}
      />
      <Drawer.Screen
        name="page"
        component={Container}
        options={{
          title: '보조 페이지',
        }}
      />
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
          headerShown: false, // false == header: null
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
