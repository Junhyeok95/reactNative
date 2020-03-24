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
import Modal from './Modal';

import Styled from 'styled-components/native';

const TouchableOpacity = Styled.TouchableOpacity`
  background-color: black;
  margin-left: 8px;
`;

const Label = Styled.Text`
  color: white;
`;

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
          backgroundColor:'#FFC',
        },
        headerTintColor: '#00FF00',
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
        options={{
          headerBackTitleVisible: false
        }} // 뒤로가기 버튼 타이틀
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerBackTitleVisible: false
        }} // 뒤로가기 버튼 타이틀
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
          // 왼쪽 햄버거 버튼 상속?
          headerLeft: (props: StackHeaderLeftButtonProps) => (

            /*
            onPress
            backImage
            tintColor

            */

            // <IconButton
            //   iconName="menu"
            //   onPress={() => navigation.openDrawer()}
            // />
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Label>Touch Img</Label>
              <Label>openDrawer</Label>
            </TouchableOpacity>
          ),
          headerRight: (props: {}) => (
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
      <Tab.Screen
        name="TabFirstStackNavi"
        component={TabFirstStackNavi}
        options={{
          tabBarLabel: 'Frist',
        }}
      />
      <Tab.Screen
        name="TabSecond"
        component={ () => {
          return (
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#0000CC',
                },
            }}>
              <Stack.Screen
                name="クルマもり"
                component={ () => {
                    return (
                      <Stack.Navigator
                        screenOptions={{
                          headerStyle: {
                            backgroundColor: '#008800',
                          },
                      }}>
                        <Stack.Screen
                          name="クルマもり"
                          component={ () => {
                              return (
                                <TouchableOpacity/>
                              );
                            }
                          }
                          options={{
                            headerRight: (props: {}) => (
                              <TouchableOpacity>
                                <Label>Touch Img</Label>
                                <Label>openDrawer</Label>
                              </TouchableOpacity>
                            ),
                          }}
                        />
                      </Stack.Navigator>
                    );
                  }
                }
                options={{
                  headerRight: (props: {}) => (
                    <TouchableOpacity>
                      <Label>Touch Img</Label>
                      <Label>openDrawer</Label>
                    </TouchableOpacity>
                  ),
                }}
              />
            </Stack.Navigator>
          );
        }
      }
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
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => logout()} />
      <DrawerItem label="Logout" onPress={() => logout()} />
    </DrawerContentScrollView>
  );
};

const DrawNavi = () => { // 왼쪽에서 드래그
  const {logout} = useContext<IUserContext>(UserContext);

  return (
    <Drawer.Navigator // 컨텐츠로 커스텀 가능
      // contentContainerStyle={[
      //   {
      //     paddingTop: insets.top + 4,
      //     paddingLeft: drawerPosition === 'left' ? insets.left : 0,
      //     paddingRight: drawerPosition === 'right' ? insets.right : 0,
      //   },
      //   contentContainerStyle,
      // ]}
      drawerContent={props => CustomDrawerContent(props, logout)}
      drawerPosition={"right"}
      drawerType={'front'}
      hideStatusBar={true} // StatusBar가 사라지면서 드로우가 열림
      >
      <Drawer.Screen name="TabNavi" component={TabNavi} />
      {/* <Drawer.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
      <Drawer.Screen
        name="MaterialTopTabNaviStackNavi"
        component={MaterialTopTabNaviStackNavi}
      /> */}
      <Drawer.Screen name="TabNavi2" component={TabNavi} />
      <Drawer.Screen name="TabNavi3" component={TabNavi} />
    </Drawer.Navigator>
  );
};

const MainNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFC',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="DrawNavi"
        component={DrawNavi}
        options={{

          /*
          title
          header
          headerShown
          safeAreaInsets
          */

          // headerShown: true, // == header: null
          headerShown: true, // == header: null

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
