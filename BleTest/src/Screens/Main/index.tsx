import React, {useContext} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Styled from 'styled-components/native';

import {Context} from '~/Context/Rasb';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
  justify-content: center;
  align-items: center;
`;
const Button = Styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #000;
  padding: 0 8px;
  margin: 8px;
`;
const Label = Styled.Text`
  font-size: 32px;
`;

const View = Styled.View`
  position: absolute;
  width: 100%;
  top: 32px;
  margin-bottom: 50px;
`;

type NavigationProp = StackNavigationProp<StackNaviParamList, 'Main'>;

interface Props {
  navigation: NavigationProp;
}

const Main = ({navigation}: Props) => {
  const {login, info} = useContext<IContext>(Context);

  return (
    <Container>
      <View>
        {info ? <Label>{info}님 환영합니다</Label> : <Label> 안녕하세요 </Label>}
      </View>
      <Button
        onPress={() => navigation.navigate('BLE')}
      >
        <Label>BLE</Label>
      </Button>
      <Button
        onPress={() => navigation.navigate('GPS')}
      >
        <Label>GPS</Label>
      </Button>
      <Button
        onPress={() => login('WDJ')}
      >
        <Label>Login / Connect 활성화</Label>
      </Button>
    </Container>
  );
};

export default Main;