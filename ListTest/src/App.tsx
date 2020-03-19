import React, { Fragment } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import { SaveListContextProvider } from '~/Context/SaveListContext';
import Save from './Screens/Save';

import Styled from 'styled-components/native';

const ScrollView = Styled.ScrollView`
  background-color: rgb(90,150,230);
`;

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`

interface Props {}

const App = ( {}: Props ) => {
  return (
    <SaveListContextProvider>
      <Container>
        <Save/>
      </Container>
    </SaveListContextProvider>
  );
};

export default App;
