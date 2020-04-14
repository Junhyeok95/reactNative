import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {KEY} from 'react-native-dotenv'
import MapView, {PROVIDER_GOOGLE, Marker, Callout, Circle} from 'react-native-maps';
import {Platform, Alert} from "react-native";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
`;

import ModalButton from '~/Components/ModalButton';

const TestButtonContainer = Styled.View`
  position: absolute;
  left: 20%;
  bottom: 20%;
  padding: 8px 8px;
  border-radius: 24px;
  background-color: #333;
  justify-content: center;
  align-items: center;
`;

const MapMarker = () => {

  useEffect(() => {
    if (Platform.OS === 'android') {
      Alert.alert('Google KEY 발급 대기중');
    }
  },[]); 

  return (Platform.OS === 'ios') ? (
    <Container>
      <MapView style={{flex: 1}}
        initialRegion={{
          latitude: 35.896311,
          longitude: 128.622051,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
      }}
      >
        <Marker
          coordinate={{latitude: 35.896311, longitude: 128.622051}}
          title="영진 전문 대학교"
          description="this is example"
        />
        
      </MapView>
      <TestButtonContainer>
        <ModalButton
          style={{flex:1, marginLeft:16, marginRight:16}}
          label="test"
          color='#FFF'
        />
      </TestButtonContainer>
    </Container>
  ) : (
    <Container>
      {/* <MapView style={{flex: 1}} /> */}
    </Container>
  );
};

export default MapMarker;