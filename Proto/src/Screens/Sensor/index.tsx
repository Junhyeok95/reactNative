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

const Sensor = () => {
  return (
    <Container>
      <Label>Sensor</Label>
    </Container>
  );
};

export default Sensor;
