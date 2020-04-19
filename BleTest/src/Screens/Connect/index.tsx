import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TouchableOpacity2 = Styled.TouchableOpacity`
  height: 20%;  
  background-color: #AACCFF;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: 10px;
`;
const TouchableOpacity = Styled.TouchableOpacity`
  justify-content: center;
  background-color: #8CD3C5;
  align-items: center;
  height: 30%;  
  width: 50%;
`;
const Label = Styled.Text`
  font-size: 32px;
`;

type NavigationProp = StackNavigationProp<{
  Connect: undefined;
  BStackNavi: undefined; // B -> Data
}, 'Connect'>;

interface Props {
  navigation: NavigationProp;
}

const Connect = ({navigation} : Props) => {
  console.log(">>>>>>>>>>>>>>>>navigation");
  const asdf = navigation.navigate;
  console.log(asdf);

  useEffect(() => {
    console.log("Connect useEffect");
  },[]);

  return (
    <Container>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Data')
      }}>
        <Label>이동</Label>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('BStackNavi')}>
        <Label>Data 로 이동</Label>
      </TouchableOpacity>
    </Container>
  );
};

export default Connect;
