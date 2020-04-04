import React, {createContext, useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';

const TouchableOpacity = Styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;
const Text = Styled.Text`
  font-size: 24px;
`;
const ImageView = Styled.View`
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-width: 2px;
`;
const TextView = Styled.View`
  flex: 1;
  padding-left: 16px;
`;
const Image = Styled.Image`
  width: 24px;
  height: 24px;
  margin-left: 8px;
  margin-right: 8px;
`;

interface Props {
  item?: any;
  index?: any;
  iconLeft?: any;
  iconRight?: any;
  onPress?: () => void;
}

const Diveice = ({ item, index, iconLeft, iconRight, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageView>
        <Image source={iconLeft} />
      </ImageView>
      <TextView>
        <Text>
          {item} / {index}
        </Text>
      </TextView>
      <Image source={iconRight} />
    </TouchableOpacity>
  );
};

export default Diveice;
