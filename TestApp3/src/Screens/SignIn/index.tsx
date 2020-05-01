import React, {useContext, useState, useEffect} from 'react';
import {Platform} from 'react-native';
import Styled from 'styled-components/native';
import {UserContext} from '~/Contexts/User';
import {StackNavigationProp} from '@react-navigation/stack';

import {Keyboard} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/Components/Button';

const TouchableWithoutFeedback = Styled.TouchableWithoutFeedback``;
const Container = Styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #8CD3C5;
  justify-content: center;
  align-items: center;
`;
const View = Styled.View`
  height: 50%;
  width: 50%;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 32px;
  padding: 8px;
  border: 1px;
`;

type NavigationProp = StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;

interface Props {
  navigation: NavigationProp;
}

const SignIn = ({navigation}: Props) => {
  const {login} = useContext<IUserContext>(UserContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View>
          <Icon
            style={{marginBottom: 8}}
            name="account-circle"
            color={'#888'}
            size={200}
          />
          <Button
            style={{marginBottom: 8}}
            label="로그인"
            onPress={() => login('WDJ@YJU', 'password')} // 이 동작이 setUserInfo 실행 -> NavigationContainer 의 함수로 인해서 MainNavi 스택으로 이동
          />
          <Button
            style={{marginBottom: 8}}
            label="회원가입"
            onPress={() => navigation.navigate('SignUp')}
          />
          <Button
            style={{ marginBottom: 8}}
            label="비밀번호 재설정"
            onPress={() => navigation.navigate('ResetPassword')}
          />
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;