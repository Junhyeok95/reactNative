import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {KEY} from 'react-native-dotenv'
import MapView, {PROVIDER_GOOGLE, Marker, Callout, Circle, AnimatedRegion, Animated} from 'react-native-maps';
import {Platform, Alert} from "react-native";
import Geolocation from 'react-native-geolocation-service';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
`;

import ModalButton from '~/Components/ModalButton';

const TestLeftButtonContainer = Styled.View`
  position: absolute;
  left: 10%;
  bottom: 20%;
  padding: 8px 8px;
  border-radius: 24px;
  background-color: #333;
  justify-content: center;
  align-items: center;
`;
const TestCenterButtonContainer = Styled.View`
  position: absolute;
  top: 2%;
  left: 16%;
  padding: 8px 8px;
  border-radius: 24px;
  background-color: #555;
  justify-content: center;
  align-items: center;
`;
const TestRightButtonContainer = Styled.View`
  position: absolute;
  right: 10%;
  bottom: 20%;
  padding: 8px 8px;
  border-radius: 24px;
  background-color: #333;
  justify-content: center;
  align-items: center;
`;

interface ILocation {
  latitude: number;
  longitude: number;
}
interface IGeolocation {
  latitude: number;
  longitude: number;
}

const MapMarker = () => {

  const [locations, setLocations] = useState<Array<ILocation>>([]);
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 35.896311,
    longitude: 128.622051,
  });

  let _watchId: number;

  useEffect(() => {
    _watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocations([...locations, {latitude, longitude}]);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  }, [locations]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      Alert.alert('Google KEY 발급 대기중');
    }
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
    }
  },[]); 

  return (Platform.OS === 'ios') ? (
    <Container>
      {/* <MapView style={{flex: 1}}
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
      </MapView> */}
      {locations.length > 0 && (
        <MapView
          style={{flex: 1}}
          initialRegion={{
            // latitude: locations[0].latitude,
            // longitude: locations[0].longitude,
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0800,
            longitudeDelta: 0.0400,
          }}
          onRegionChange={region => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          onRegionChangeComplete={region => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          >
          {locations.map((location: ILocation, index: number) => (
            <Marker
              key={`location-${index}`}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          ))}
        </MapView>
      )}
      <TestLeftButtonContainer>
        <ModalButton
          style={{flex:1, marginLeft:16, marginRight:16}}
          label="LEFT"
          color='#FFF'
          onPress={() => {
            Alert.alert('LEFT');
          }}
        />
      </TestLeftButtonContainer>
      <TestCenterButtonContainer>
        <ModalButton
          style={{flex:1, marginLeft:16, marginRight:16}}
          label={"RESET\n"+location.latitude+", "+location.longitude}
          color='#FFF'
          onPress={() => {
            setLocation({
              latitude: 35.896311,
              longitude: 128.622051,
            });
          }}
        />
      </TestCenterButtonContainer>
      <TestRightButtonContainer>
        <ModalButton
          style={{flex:1, marginLeft:16, marginRight:16}}
          label="RIGHT"
          color='#FFF'
          onPress={() => {
            Alert.alert('RIGHT');
          }}
        />
      </TestRightButtonContainer>
    </Container>
  ) : (
    <Container>
      {/* <MapView style={{flex: 1}} /> */}
    </Container>
  );
};

export default MapMarker;