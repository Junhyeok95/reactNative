import React, {useState} from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex-direction: row;
  margin: 8px;
`;
const Text = Styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

interface Props {
  title?: string;
}

const Subtitle = ({ title }: Props) => {

  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  );
};
export default Subtitle;
