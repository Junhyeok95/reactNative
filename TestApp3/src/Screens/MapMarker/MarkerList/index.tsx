import React, {useState, useEffect} from 'react';
import {Platform, Alert, FlatList} from "react-native";

import Styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const MarkerContainer = Styled.View`
  padding: 8px;
`;
const TouchableOpacity = Styled.TouchableOpacity`
`;
const Marker = Styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;
const MarkerBackground = Styled.Image`
  position: absolute;
`;
const MarkerName = Styled.Text`
  width: 100%;
  text-align: center;
  background-color: #FFF;
  font-weight: 600;
`;

interface Props {
  markerList: Array<String>;
}


// itme ex)
// interface IUserProfile {
//   name: string;
//   photo: string;
// }
// interface IFeed extends IUserProfile {
//   images: Array<string>;
//   description: string;
// }


const MarkerList = ({markerList}: Props) => {
  return (
    <FlatList
      data={markerList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => {
        return `myMarker-${index}`;
      }}
      renderItem={({item, index}) => (
        <MarkerContainer>
          <TouchableOpacity>
            <Marker>
              <MarkerBackground
                source={require('~/Assets/Images/maker_background.png')}
              />
              <Icon
                name="map"
                color={'#000000'}
                size={30}
              />
            </Marker>
            <MarkerName numberOfLines={1}>{item}</MarkerName>
          </TouchableOpacity>
        </MarkerContainer>
      )}
    />
  );
};

export default MarkerList;