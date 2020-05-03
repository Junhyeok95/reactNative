import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import {Platform, Alert} from "react-native";
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';

import IconButton from '~/Components/IconButton';
import Button from '~/Components/Button';

const RightView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  overflow: hidden;
  width: 200px;
  height: 200px;
  right: 24px;
  bottom: 24px;
  border: 1px;
  padding: 8px;
  justify-content: center;
`;
const LeftView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  width: 75px;
  height: 75px;
  left: 24px;
  bottom: 24px;
  border: 1px;
  padding: 8px;
`;
const TopView = Styled.View`
  position: absolute;
  background-color: #0F0C;
  width: 200px;
  height: 50px;
  top:60px;
  left: 24px;
  border: 1px;
  padding: 8px;
`;
const Text = Styled.Text`
  font-size: 16px;
`;

interface IGeolocation {
  latitude: number;
  longitude: number;
}
interface ICoordinate {
  altitude: number;
  latitude: number;
  longitude: number;
  speed: number;
  timestamp: number;
}

type TypeDrawerProp = DrawerNavigationProp<DrawNaviParamList, 'MainTabNavi'>;
interface DrawerProp {
  navigation: TypeDrawerProp;
}

const MapData = ({navigation}: DrawerProp) => {

  const [driving, setDriving] = useState<boolean>(false);
  const [device, setDevice] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(0);

  const [time, setTime] = useState<any>();

  const [coordinate, setCoordinate] = useState<ICoordinate>({
    altitude: 0,
    latitude: 0,
    longitude: 0,
    speed: 0,
    timestamp: 0, // Milliseconds since Unix epoch
  });
  
  const [location, setLocation] = useState<IGeolocation>({
    latitude: 35.896311,
    longitude: 128.622051,
  });

  useEffect(() => {
    console.log("--- --- MapData Mount");
    let id = setInterval(() => {
      let now = new Date();
      // console.log(now.getHours());
      // console.log(now.getMinutes());
      // console.log(now.getSeconds());
      setTime(now.getHours()+" : "+now.getMinutes()+" : "+now.getSeconds());
    }, 1000);
    return () => clearInterval(id);
  },[]);

  return (
    <>
      <MapView style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.01,
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
        onUserLocationChange={e => { // EventUserLocation
          if(device){
            setCoordinate({
              altitude: e.nativeEvent.coordinate.altitude,
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              speed: e.nativeEvent.coordinate.speed,
              timestamp: e.nativeEvent.coordinate.timestamp,
            });
            // isFromMockProvider 모의 위치 차단
          }
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
      <IconButton
        style={{position:"absolute", top:60, right:24, width:50, height:50, backgroundColor:"#0008", borderRadius:30, paddingTop:2}}
        icon="menu"
        color="#FFFFFF"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <RightView>
        <Text>latitude : {location.latitude.toFixed(4)}</Text>
        <Text>longitude : {location.longitude.toFixed(4)}</Text>
        <Text>----- ----- -----</Text>
        <Text>고도 altitude : {coordinate.altitude.toFixed(4)}</Text>
        <Text>위도 latitude : {coordinate.latitude.toFixed(4)}</Text>
        <Text>경도 longitude : {coordinate.longitude.toFixed(4)}</Text>
        <Text>speed : {coordinate.speed.toFixed(2)}</Text>
        <Text>----- timestamp -----</Text>
        <Text>{coordinate.timestamp}</Text>
      </RightView>
      <LeftView>
        <Button
          label={device?"start\n"+" on":"start\n"+" off"}
          style={{backgroundColor:"#FFF"}}
          onPress={()=>{
            setDevice(!device);
        }}/>
      </LeftView>
      <TopView>
        <Text 
          style={{flex:1, padding:8, backgroundColor:"#FFF"}}
        >
          Time      {time}
        </Text>
      </TopView>
    </>
  );
};

export default MapData;

