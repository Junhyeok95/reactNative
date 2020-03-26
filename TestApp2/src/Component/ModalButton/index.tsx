import React from 'react';
import Styled from 'styled-components/native';

const StyleButton = Styled.TouchableOpacity`
`;
const Label = Styled.Text`
  color: #FFFFFF;
  font-size: 16px;
`;

interface Props {
  label: string;
  style?: Object;
  color?: string;
  onPress?: () => void;
}

const ButtonMini = ({ label, style, color, onPress }: Props) => {
  return (
    <StyleButton style={style} onPress={onPress}>
      <Label style={{ color: color ? color : '#64BEC8' }}>{label}</Label>
    </StyleButton>
  );
};

export default ButtonMini;
