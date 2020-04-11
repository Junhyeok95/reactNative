import React from 'react';
import Styled from 'styled-components/native';

import {Linking} from 'react-native';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const PasswordResetText = Styled.Text`
  font-size: 32px;
`;

const ResetPassword = () => {
  return (
    <Container>
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
