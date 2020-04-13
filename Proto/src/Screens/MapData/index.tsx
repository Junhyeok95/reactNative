import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {KEY} from 'react-native-dotenv'
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

const MapData = () => {

  const [device, setDevice] = useState<boolean>(false);
  const [driving, setDriving] = useState<boolean>(false);
  
  console.log(Platform.OS === 'ios');

  useEffect(() => {
    
    console.log("Effect");

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
      }}>
        <Marker
          coordinate={{latitude: 35.896311, longitude: 128.622051}}
          title="영진 전문 대학교"
          description="this is example"
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
  ) : (
    <Container>
      {/* <MapView style={{flex: 1}} /> */}
    </Container>
  );
};

export default MapData;
