import React, { Fragment, useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Styled from 'styled-components/native';
import { UserContextProvider } from '~/Contexts/User';
import Navigator from '~/Screens/Navigator';

const SafeAreaView = Styled.SafeAreaView`
  flex: 1;
`;
// const View = Styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;
// const Text = Styled.Text`
//   font-size: 32px;
//   padding: 8px;
//   border: 1px;
// `;

interface Props {}

const App = ({ }: Props) => {

  // useEffect(() => {
  //   console.log("App.tsx useEffect");
  //   setTimeout(() => SplashScreen.hide(), 1000);
  // }, []);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <UserContextProvider>
          <Navigator />
        </UserContextProvider>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
