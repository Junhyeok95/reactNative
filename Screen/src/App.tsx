import React, { Fragment, useEffect } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  
} from 'react-native/Libraries/NewAppScreen';

// 0.60 부터 클래스 컴포넌트 X -> 함수형 컴포넌트 O
const App = () => {
  console.log("App start");
  useEffect(()=> {
    setTimeout(() => {
      console.log("App useEffect");
      SplashScreen.hide();
    }, 1000);
  },[]);
  return (
    // <Fragment> 의 축약형 <>
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Header />
          <LearnMoreLinks />
      </SafeAreaView>
    </>
  );
};

export default App;
