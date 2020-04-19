import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Container = Styled.View`
  flex: 1;
  align-items: center;
`;

const TouchableOpacity3 = Styled.TouchableOpacity`
background-color: #CCAAFF;
align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;
const TouchableOpacity2 = Styled.TouchableOpacity`
  background-color: #AACCFF;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 70%;
`;
const TouchableOpacity = Styled.TouchableOpacity`
  justify-content: center;
  background-color: #8CD3C5;
  align-items: center;
  margin: 10px;
  width: 85%;
`;
const Label = Styled.Text`
  font-size: 24px;
  margin: 12px;
`;

type NavigationProp = StackNavigationProp<{
  Connect: undefined;
  LoginBleAStack: undefined; // AStackNavi 서브
  ConnectStackNaviLoginBle: undefined; // ConnectStackNavi 서브
  BStackNavi?: undefined | any; // B -> Data
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
      <TouchableOpacity2 onPress={() => {
        navigation.navigate('LoginBleAStack')
      }}>
        <Label>AStack -> 서브 {"\n"} LoginBleAStack 로 이동</Label>
      </TouchableOpacity2>

      <TouchableOpacity2 onPress={() => {
        navigation.navigate('ConnectStackNaviLoginBle')
      }}>
        <Label>AStack -> 메인 -> 서브 {"\n"}CSNLB 이동</Label>
      </TouchableOpacity2>
    
      <TouchableOpacity3 onPress={() => {
        navigation.navigate('BStackNavi');
      }}>
        <Label>BStack -> 서브{"\n"}TextView 로 이동</Label>
      </TouchableOpacity3>

      <TouchableOpacity3 onPress={() => {
        navigation.navigate('BStackNavi',{
          id: "sub",
          memo: 'BStackNavi 메인 -> 서브 이동',
        });
      }}>
        <Label>BStack -> 메인 -> 서브{"\n"}LoginBle 로 이동</Label>
      </TouchableOpacity3>

      <TouchableOpacity onPress={() => navigation.navigate('BStackNavi',{
          id: "main",
          memo: 'BStackNavi 메인 -> 메인 이동',
      })}>
        <Label>BStack -> 메인 -> 메인
          {"\n"}Data 로 이동</Label>
      </TouchableOpacity>
    </Container>
  );
};

export default Connect;
