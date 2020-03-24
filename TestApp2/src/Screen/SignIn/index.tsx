import React, {useContext} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {UserContext} from '~/Context/User';
import Button from '~/Component/Button';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = Styled.View`
  flex-direction: row;
`;

type NavigationProp = StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;

interface Props {
  navigation: NavigationProp;
}

const SignIn = ({navigation}: Props) => {
  const {login} = useContext<IUserContext>(UserContext);

  return (
    <Container>
      <Button
        // label="Sign In"
        label="로그인"
        onPress={() => login('WDJ@YJU', 'password')} // 이 동작이 setUserInfo 실행 -> NavigationContainer 의 함수로 인해서 MainNavi 스택으로 이동
      />
      {/* <ButtonContainer> */}
        <Button
          label="회원가입"
          onPress={() => navigation.navigate('SignUp')}
        />
        <Button
          label="비밀번호 재설정"
          onPress={() => navigation.navigate('ResetPassword')}
        />
      {/* </ButtonContainer> */}
    </Container>
  );
};

export default SignIn;
