import React, { useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Styled from 'styled-components/native';
import { UserContext } from '~/Contexts/User';
import { StackNavigationProp } from '@react-navigation/stack';

const TouchableWithoutFeedback = Styled.TouchableWithoutFeedback``;
const Container = Styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #8CD3C5;
  justify-content: center;
  align-items: center;
`;
const View = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 32px;
  padding: 8px;
  border: 1px;
`;


interface Props {}

import {Keyboard} from "react-native";

const SignIn = ({ }: Props) => {
  const {login} = useContext<IUserContext>(UserContext);

  useEffect(() => {
    console.log("SignIn useEffect");
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View>
          <Text>
            SignIn
          </Text>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;