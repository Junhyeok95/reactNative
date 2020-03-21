import React, { Fragment } from 'react';

import { SaveListContextProvider } from '~/Context/SaveListContext';

import Save from './Screens/Save';
import Weather from './Screens/Weather';

import { StatusBar} from 'react-native';
import Navigator from '~/Screens/Navigator';

import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`

interface Props {}

const App = ( {}: Props ) => {
  // return (
  //   <SaveListContextProvider>
  //     <Container>
  //       <Save/>
  //       <Weather/>
  //     </Container>
  //   </SaveListContextProvider>
  // );
  return(
    <>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </>
  );
};

export default App;
