import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserContext} from '~/Contexts/User';
import Styled from 'styled-components/native';
const TitleContainer = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = Styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export default () => {
  const {userInfo} = useContext<IUserContext>(UserContext);

  return (
    <NavigationContainer>
      <TitleContainer>
        <Text>Hello</Text>
      </TitleContainer>
    </NavigationContainer>
  );
};
