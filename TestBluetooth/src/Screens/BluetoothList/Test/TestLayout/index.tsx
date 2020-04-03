import React from 'react';
import Styled from 'styled-components/native';

const View = Styled.View`
  border: 5px;
  border-color: #F00;
`;
const Text = Styled.Text`
  font-size: 24px;
`;

interface Props {
  children?: JSX.Element | Array<JSX.Element>;
  title?: string;
}

const TestLayout = ({ children, title }: Props) => {
  return (
    <View>
      <Text>TsetItem + {title}</Text>
      {children}
    </View>
  );
};
export default TestLayout;
