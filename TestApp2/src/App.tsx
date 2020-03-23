import 'react-native-gesture-handler';
import React from 'react';

import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0F0;
`;

const Label = Styled.Text`
  color: #777;
  font-size: 30px;
  font-weight: bold;
`;

const App = () => {
  return (
    <Container>
      <Label>Hello React Native</Label>
    </Container>
  );
};

export default App;