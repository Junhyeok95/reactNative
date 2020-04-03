import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  width: 80%;
  background-color: #AAA;
  padding: 8px;
`;
const TitleLabel = Styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

interface Props {}

const Header = ({  }: Props) => {
  return (
    <Container>
      <TitleLabel>
        Bluetooth List
      </TitleLabel>
    </Container>
  );
};
export default Header;
