import React, {useContext} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {UserContext} from '~/Context/User';
import Button from '~/Component/Button';
import Input from '~/Component/Input';

//https://oblador.github.io/react-native-vector-icons/
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = Styled.View`
  flex: 1;
  background-color: #8CD3C5;
  justify-content: center;
  align-items: center;
`;
const FormContainer = Styled.View`
  width: 80%;
  height: 200px;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = Styled.View`
  flex: 1;
  flex-direction: row;
`;
const ImageContainer = Styled.View`
  width: 80%;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;
const Image = Styled.Image``;
const IconContainer = Styled.View`
  width: 80%;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;
const ButtonMargin = Styled.View`
  width: 16px;
`;

type NavigationProp = StackNavigationProp<LoginStackNaviParamList, 'SignIn'>;

interface Props {
  navigation: NavigationProp;
}

const SignIn = ({navigation}: Props) => {
  const {login} = useContext<IUserContext>(UserContext);

  return (
    <Container>
      <ImageContainer>
        <Image source={require('~/Assets/Images/kuru.png')} />
      </ImageContainer>
      <IconContainer>
        <Icon name="account-circle" color={'#888'} size={200} />
      </IconContainer>
      <FormContainer>
        <Input
          style={{ marginBottom: 8 }}
          placeholder={'이메일'}
        />
        <Input
          style={{ marginBottom: 8 }}
          placeholder={'비밀번호'}
        />
        <Button
          // label="Sign In"
          style={{ marginBottom: 8 }}
          label="로그인"
          onPress={() => login('WDJ@YJU', 'password')} // 이 동작이 setUserInfo 실행 -> NavigationContainer 의 함수로 인해서 MainNavi 스택으로 이동
          />
        <ButtonContainer>
          <Button
            label="회원가입"
            onPress={() => navigation.navigate('SignUp')}
          />
          <ButtonMargin />
          <Button
            label="비밀번호 재설정"
            onPress={() => navigation.navigate('ResetPassword')}
          />
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default SignIn;