import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #8CD3C5;
`;
const Text = Styled.Text`
  font-size: 32px;
`;

type NavigationProp = StackNavigationProp<MainFirstStackNavi, 'Driving'>;

interface Props {
  navigation: NavigationProp;
}

const Driving = ({navigation}: Props) => {
  useEffect(() => {
    console.log("--- --- Driving");
  },[]);
  return (
    <Container>
       <Text>
          Driving
       </Text>
    </Container>
  );
};

export default Driving;
