import 'react-native-gesture-handler';
import React from 'react';

import {UserContextProvider} from '~/Contexts/User';

import Navigator from './Screens/Navigator';

const App = () => {
  return (
    <UserContextProvider>
      <Navigator />
    </UserContextProvider>
  );
};

export default App;
