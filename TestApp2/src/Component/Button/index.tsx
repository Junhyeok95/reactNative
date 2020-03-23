import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 12px;
  background-color: #333333;
  justify-content: center;
  align-items: center;
  margin: 12px;
`;
const Label = Styled.Text`
  color: white;
  font-size: 25px;
`;

interface Props {
  label: string;
  onPress?: () => void;
}
const Button = ({label, onPress}: Props) => {
  return (
    <Container onPress={onPress}>
      <Label>{label}</Label>
    </Container>
  );
};

export default Button;
