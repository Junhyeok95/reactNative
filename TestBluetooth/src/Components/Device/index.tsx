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
const View = Styled.View``;
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
      <View>
        <Image source={iconLeft} />
      </View>
      <View>
        <Text>
          {item} / {index}
        </Text>
      </View>
      <Image source={iconRight} />
    </TouchableOpacity>
  );
};

export default Diveice;
