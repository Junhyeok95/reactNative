import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Navigator from '~/Screens/Navigator';
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(()=> {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  },[]);
  
  return (
    <Navigator />
  );
};

export default App;
