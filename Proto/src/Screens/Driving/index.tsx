import React from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

import ModalButton from '~/Components/ModalButton';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #8CD3C5;
`;
const Label = Styled.Text`
  font-size: 32px;
`;
const StartButtonContainer = Styled.View`
  background-color: #F00;
  position: absolute;
  end: 24;
  bottom: 24;
  padding: 8px 16px;
  border-radius: 32px;
`;


type NavigationProp = StackNavigationProp<MainFirstStackNavi, 'Driving'>;

interface Props {
  navigation: NavigationProp;
}

const Driving = ({navigation}: Props) => {
  return (
    <Container>
      <Label>Driving</Label>
      <StartButtonContainer>
        <ModalButton style={{flex:1}} font={24} color='#FFF' label="운전 시작" onPress={() => navigation.navigate('Modal')} />
      </StartButtonContainer>
    </Container>
  );
};

export default Driving;
