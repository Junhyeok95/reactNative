import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Platform, Alert} from "react-native";


const Container = Styled.View`
  flex: 1;
`;

interface IGeolocation {
  latitude: number;
  longitude: number;
}

const MapData = () => {
  
  const [driving, setDriving] = useState<boolean>(false);
  const [device, setDevice] = useState<boolean>(false);
  
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 35.896311,
    longitude: 128.622051,
  });

  useEffect(() => {
    console.log("--- --- MapData Mount");
  },[]);

  return (
    <Container>
      <MapView style={{flex: 1}}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onRegionChange={(region: { latitude: any; longitude: any; }) => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onRegionChangeComplete={(region: { latitude: any; longitude: any; }) => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
      >
        <Marker
          coordinate={{latitude: 35.896311, longitude: 128.622051}}
          title="영진 전문 대학교"
          description="this is example"
        />
        <Marker
          coordinate={{latitude: location.latitude, longitude: location.longitude}}
          title="Test Maker"
          description="Test"
        />
      </MapView>
    </Container>
  );
};

export default MapData;
