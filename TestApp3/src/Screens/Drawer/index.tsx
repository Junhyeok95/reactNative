import React, {useContext} from 'react';
import Styled from 'styled-components/native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {UserContext} from '~/Contexts/User';
import {TouchableHighlight} from "react-native";

const Header = Styled.View`
  border-bottom-width: 1px;
  border-color: #D3D3D3;
  padding: 8px 16px;
`;
const Title = Styled.Text``;
const ButtonContainer = Styled.View`
  flex-direction: row;
  align-items: center;
`;
const Footer = Styled.View`
  width: 100%;
  border-top-width: 1px;
  padding: 8px 16px;
  border-color: #D3D3D3;
`;

interface Props {
  props: DrawerContentComponentProps<DrawerContentOptions>;
}

const Drawer = ({props}: Props) => {
  const {logout} = useContext<IUserContext>(UserContext);
  return (
    <DrawerContentScrollView {...props}>
      <Header>
        <Title>User ID</Title>
      </Header>
      <DrawerItemList {...props} />
      <Footer>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => {
            logout();
          }}>
          <ButtonContainer>
            <Title>로그아웃</Title>
          </ButtonContainer>
        </TouchableHighlight>
      </Footer>
    </DrawerContentScrollView>
  );
};

export default Drawer;
