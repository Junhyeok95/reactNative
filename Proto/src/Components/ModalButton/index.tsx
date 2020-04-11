import React from 'react';
import Styled from 'styled-components/native';

const StyleButton = Styled.TouchableOpacity`
`;
const Label = Styled.Text`
  color: #FFFFFF;
  font-weight: 700;
`;

interface Props {
  label: string;
  style?: Object;
  color?: string;
  font?: number;
  onPress?: () => void;
}

const ButtonMini = ({ label, style, color, font, onPress }: Props) => {
  return (
    <StyleButton style={style} onPress={onPress}>
      <Label style={{ color: color ? color : '#64BEC8', fontSize: font ? font : 16 }}>{label}</Label>
    </StyleButton>
  );
};

export default ButtonMini;
