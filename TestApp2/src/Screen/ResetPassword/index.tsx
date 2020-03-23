import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Label = Styled.Text``;

import { Linking } from 'react-native';

const PasswordResetText = Styled.Text`
  width: 100%;
  font-size: 30px;
  color: #000000;
  text-align: center;
`;

const ResetPassword = () => {
  return (
    <Container>
      <Label>This is ResetPassword Screen</Label>
      <Label>온라인 재설정</Label>
      <PasswordResetText
        onPress={() => {
            Linking.openURL('https://yju.ac.kr');
        }}>
        비밀번호 재설정
      </PasswordResetText>
    </Container>
  );
};

export default ResetPassword;
