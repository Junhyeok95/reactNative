import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Platform, Alert} from "react-native";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
`;

const MapMarker = () => {

  useEffect(() => {
    console.log("--- --- MapMarker Mount");
    return () => {

    }
  },[]); 

  return (
    <Container>
      <MapView
        style={{flex: 1}}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 35.896311,
          longitude: 128.622051,
          latitudeDelta: 0.0800,
          longitudeDelta: 0.0400,
        }}
      >
      </MapView>
    </Container>
  );
};

export default MapMarker;