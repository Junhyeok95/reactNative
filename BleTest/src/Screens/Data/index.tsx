import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

import { Context } from '~/Context/Rasb';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TouchableOpacity = Styled.TouchableOpacity`
  height: 20%;  
  background-color: #8CD3C5;
  align-items: center;
  justify-content: center;
  width: 40%;
`;
const TouchableOpacity2 = Styled.TouchableOpacity`
  height: 20%;  
  background-color: #AACCFF;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: 10px;
`;
const Label = Styled.Text`
  font-size: 24px;
`;
const View = Styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const RaspView = Styled.View`
  background-color: #0F0;
`;

type NavigationProp = StackNavigationProp<{
  Data: undefined;
  // AStackNavi: undefined; // A -> Connect
  Connect: undefined;
}, 'Data'>;

interface Props {
  navigation: NavigationProp;
  route ?: any
}

const Data = ({navigation, route}: Props) => {
  const {logout, raspData} = useContext<IContext>(Context); // 프로바이더에서 타입을 정해서 만들어둠

  useEffect(() => {
    console.log("Data useEffect");
    console.log(route);
    console.log("Data useEffect");
  },[]);

  return (
    <Container>
      <View>
        <Label>BLE DATA</Label>
        <RaspView>
          <Label>>>> {raspData}</Label>
        </RaspView>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Connect')}>
        <Label>Connect 로 이동</Label>
      </TouchableOpacity>
      <TouchableOpacity2 onPress={() => logout()}>
        <Label>logout</Label>
      </TouchableOpacity2>
    </Container>
  );
};

export default Data;
