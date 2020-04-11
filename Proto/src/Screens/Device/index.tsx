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

const Device = () => {
  return (
    <Container>
      <Label>Device</Label>
    </Container>
  );
};

export default Device;
