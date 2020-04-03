import React from 'react';
import Styled from 'styled-components/native';
import BluetoothList from '~/Screens/BluetoothList';

const Container = Styled.View`
  flex: 1;
`;

const App = () => {
  return (
    <Container>
      <BluetoothList />
    </Container>
  );
};

export default App;