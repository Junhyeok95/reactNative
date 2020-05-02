import React from 'react';
import Styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = Styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border-width: 1px;
  border-color: #000000;
`;

interface Props {
  icon: string;
  style?: Object;
  color?: string;
  onPress?: () => void;
}

const IconButton = ({icon, style, color, onPress}: Props) => {
  return (
    <Container style={style} onPress={onPress}>
      <Icon name={icon} color={color ? color : 'white'} size={24} />
    </Container>
  );
};

export default IconButton;
