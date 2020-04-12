import React from 'react';
import Styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Label = Styled.Text`
  font-size: 32px;
`;
const Absolute = Styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const Camera = () => {
  return (
    <Container>
      <Icon name="face" color={'#333'} size={400} />
      <Absolute>
        <Icon name="sync" color={'#00F'} size={50} />
      </Absolute>
    </Container>
  );
};

export default Camera;
