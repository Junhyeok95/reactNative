import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
  justify-content: center;
  align-items: center;
`;
const Button = Styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #DDD;
  padding: 0 8px;
  margin: 8px;
`;
const Label = Styled.Text``;

type NavigationProp = StackNavigationProp<StackNaviParamList, 'Main'>;

interface Props {
  navigation: NavigationProp;
}

const GPS = ({navigation}: Props) => {

  return (
    <Container>
      <Button>
        <Label>GPS</Label>
      </Button>
    </Container>
  );
};

export default GPS;