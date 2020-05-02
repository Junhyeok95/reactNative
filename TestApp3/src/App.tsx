import 'react-native-gesture-handler';
import React, {Fragment, useEffect} from 'react';
import Styled from 'styled-components/native';
import {UserContextProvider} from '~/Contexts/User';
import Navigator from '~/Screens/Navigator';

interface Props {}

const App = ({ }: Props) => {

  useEffect(() => {
    console.log("App.tsx useEffect");
  }, []);

  return (
    <Fragment>
      <UserContextProvider>
        <Navigator />
      </UserContextProvider>
    </Fragment>
  );
};

export default App;
