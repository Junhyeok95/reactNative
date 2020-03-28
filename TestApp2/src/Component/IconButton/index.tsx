import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const Icon = Styled.Image``;

interface Props {
  iconName: string;
  style?: object;
  color?: string;
  onPress?: () => void;
}

const IconButton = ({ iconName, color, style, onPress }: Props) => {

  return (
      <Container
        style={style}
        onPress={() => {
            if (onPress && typeof onPress === 'function') {
                onPress();
            }
      }}>
        <Icon
          source={{}} />
      </Container>
  );
};

export default IconButton;