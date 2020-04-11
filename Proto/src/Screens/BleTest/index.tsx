import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Label = Styled.Text`
  font-size: 32px;
`;

const BleTest = () => {
  return (
    <Container>
      <Label>BleTest</Label>
    </Container>
  );
};

export default BleTest;
