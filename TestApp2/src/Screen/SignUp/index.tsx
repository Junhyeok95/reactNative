import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Label = Styled.Text``;

import { Linking } from 'react-native';

const SignUpText = Styled.Text`
  width: 100%;
  font-size: 30px;
  text-align: center;
`;

const SignUp = () => {
  return (
    <Container>
      <SignUpText
        onPress={() => {
            Linking.openURL('https://yju.ac.kr');
        }}>
        회원가입
      </SignUpText>
    </Container>
  );
};

export default SignUp;
