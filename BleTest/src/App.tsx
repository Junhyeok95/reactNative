import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigator from '~/Screens/Navigator';
import SplashScreen from 'react-native-splash-screen'

import {ContextProvider} from '~/Context/Rasb';

const App = () => {
  useEffect(()=> {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  },[]);
  
  return (
    <ContextProvider>
      <Navigator />
    </ContextProvider>
  );
};

export default App;
