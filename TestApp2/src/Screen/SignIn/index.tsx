import React, {useContext} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {UserContext} from '~/Context/User';
import Button from '~/Component/Button';

//https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/MaterialIcons';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #8CD3C5;
`;

const IconContainer = Styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const HeaderImage = Styled.Image`
  width: 80%;
  height: 50px;
  margin-bottom: 30px;
`;

type NavigationProp = StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;

interface Props {
  navigation: NavigationProp;
}

const SignIn = ({navigation}: Props) => {
  const {login} = useContext<IUserContext>(UserContext);

  return (
    <Container>
      <HeaderImage
        source={require('~/Assets/Images/kuru.png')}
        // style={{ width: 50, height: 50 }}
      />
      <IconContainer>
        <Icon name="account-circle" color={'#888'} size={200} />
      </IconContainer>
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