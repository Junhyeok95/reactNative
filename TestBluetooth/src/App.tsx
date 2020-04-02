import React from 'react';
import Styled from 'styled-components/native';
import BluetoothList from '~/Screens/BluetoothList';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;
const Header = Styled.View`
  margin: 10px;
  padding: 10px;
  background-color: #0F0;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 32px;
  text-align: center;
`;
const SafeAreaView = Styled.SafeAreaView`
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: #83F;
`;


const App = () => {
  return (
    <Container>
      <SafeAreaView>
        <Header>
          <Text>Hello Bluetooth</Text>
        </Header>
      </SafeAreaView>
      
      <BluetoothList />
    </Container>
  );
};

export default App;