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

const Modal = () => {
  return (
    <Container>
      <Label>Modal!</Label>
    </Container>
  );
};

export default Modal;
