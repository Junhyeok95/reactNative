import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Platform, Alert} from "react-native";

import ModalButton from '~/Components/ModalButton';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
`;
const DrivingButtonContainer = Styled.View`
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 8px 8px;
  border-radius: 24px;
`;
const DeviceButtonContainer = Styled.View`
  position: absolute;
  left: 12px;
  top: 12px;
  padding: 8px 8px;
  border-radius: 24px;
`;

interface IGeolocation {
  latitude: number;
  longitude: number;
}

const MapData = () => {

  const [device, setDevice] = useState<boolean>(false);
  const [driving, setDriving] = useState<boolean>(false);
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 35.896311,
    longitude: 128.622051,
  });

  useEffect(() => {
    console.log("Effect, MapDate 여기 윗부분 호출 많이됨");    
    console.log("-- Camera Mount");
    // if (Platform.OS === 'android') {
    //   Alert.alert('Google KEY 발급 대기중');
    // }
  },[]);

  return (
    <Container>
      <MapView style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
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
      <DeviceButtonContainer style={{backgroundColor: device?'#00F':'#555'}}>
        <ModalButton
          style={{flex:1}}
          font={18}
          color='#FFF'
          label={device?'페어링':'신호없음'}
          onPress={() => {
            setDevice(!device);
            // navigation.navigate('MapData')
          }}
        />
      </DeviceButtonContainer>
      <DrivingButtonContainer style={{backgroundColor: driving?'#F00':'#555'}}>
        <ModalButton
          style={{flex:1}}
          font={18}
          color='#FFF'
          label={driving?'운전중':'운전정지'}
          onPress={() => {
            setDriving(!driving);
            // navigation.navigate('MapData')
          }}
        />
      </DrivingButtonContainer>
    </Container>
  );
};

export default MapData;
