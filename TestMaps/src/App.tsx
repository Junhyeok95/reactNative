import React, {useState, useEffect, useRef} from 'react';
import {StatusBar, PermissionsAndroid, Platform, Dimensions, Alert}from 'react-native';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import SplashScreen from 'react-native-splash-screen';
import { getStatusBarHeight as A } from 'react-native-status-bar-height';
import { getStatusBarHeight as B } from 'react-native-iphone-x-helper';
import { getBottomSpace } from 'react-native-iphone-x-helper';

// const SafeAreaView = Styled.SafeAreaView`
//   background-color: #0F0;
//   flex: 1;
// `;

const View = Styled.View`
  position: absolute;
`;

const TopLeftView = Styled.View`
  position: absolute;
  background-color: #FFFC;
  border-color: #00F;
  border-width: 2px;
  border-radius: 16px;
  bottom: 1%;
  right: 2%;
  padding: 8px;
  width: 190px;
`;
const BottomLeftView = Styled.View`
  position: absolute;
  background-color: #FFFC;
  border-color: #00F;
  border-width: 2px;
  border-radius: 16px;
  bottom: 1%;
  left: 2%;
  padding: 8px;
  width: 190px;
`;
const Text = Styled.Text`
  text-align: center;
  font-size: 16px;
`;
const TouchableView = Styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: center;
`;
const TouchableOpacity = Styled.TouchableOpacity`
  flex: 1;
  background-color: #00F;
  border-radius: 25px;
  justify-content: center;
  margin: 8px 16px;
`;
const TouchableHighlight = Styled.TouchableHighlight`
  flex: 1;
  background-color: #0AA;
  border-radius: 25px;
  justify-content: center;
  margin: 8px 16px;
`;

interface ILocation {
  latitude: number;
  longitude: number;
}
interface ICoordinate {
  latitude: number;
  longitude: number;
  altitude: number;
  timestamp?: number;
  accuracy: number;
  speed: number;
  heading?: number;
  isFromMockProvider?: boolean;
}
interface ICoordinate2 {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number | null;
  heading?: number | null;
  speed: number | null;
  altitudeAccuracy?: number | null;
  timestamp: number;
  mocked?: boolean;
}
interface Props {}

const App = ({ }: Props) => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // ACCESS_FINE_LOCATION -> GPS 기반
  // ACCESS_COARSE_LOCATION -> NETWORK 기반
  // ACCESS_BACKGROUND_LOCATION -> 백그라운드

  const [marginTop, setMarginTop] = useState<number>(1);
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [locations, setLocations] = useState<Array<ILocation>>([]);
  const [coordinate, setCoordinate] = useState<ICoordinate>({
    "latitude": 0,
    "longitude": 0,
    "altitude": 0,
    "timestamp": 0,
    "accuracy": 0,
    "speed": 0,
    "heading": 0,
    "isFromMockProvider": false,
  });
  const [coordinate2, setCoordinate2] = useState<ICoordinate2>({
    "latitude": 0,
    "longitude": 0,
    "accuracy": 0,
    "altitude": 0,
    "heading": 0,
    "speed": 0,
    "timestamp": 0,
    "mocked": false,
  });
  
  const [onSave, setOnSave] = useState<boolean>(false);

  const [onUserLocationChangeCnt, setOnUserLocationChangeCnt] = useState<number>(0);
  const [watchPositionCnt, setWatchPositionCnt] = useState<number>(0);
  const _setWatchPositionCnt = () => {
    setWatchPositionCnt(watchPositionCnt+1);
  }
  let _watchId: number;

  useEffect(() => {
    console.log("------------------ useEffect ------------------");

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => { // check
        if (result) {
          // console.log("android LOCATION check OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => { // request
            if (result) {
              // console.log("android LOCATION request Ok");
            } else {
              // console.log("android LOCATION reject");
            }
          });
        }
      });
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude
        });
        console.log("### Geolocation.getCurrentPosition");
        console.log(position.coords);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        distanceFilter: 0
      },
    );

  _watchId = Geolocation.watchPosition(
    position => {
      const {latitude, longitude, accuracy, speed} = position.coords;
      const {timestamp} = position;
      setCoordinate2({
        latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
        speed: speed,
        timestamp: timestamp,
      });
      _setWatchPositionCnt();
      console.log(">>> Geolocation.watchPosition");
      console.log(position);
    },
    error => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      distanceFilter: 0,
      interval: 1000,
      fastestInterval: 1000,
    },
  );

    console.log("hello");
    console.log(Platform.OS);
    // console.log(A());
    // console.log(B());
    // console.log(getBottomSpace());
    // console.log(windowWidth);

    
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
      Geolocation.stopObserving();
    };

  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, [])

  useEffect(() => {
    return () => {};
  }, [coordinate])

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
      {location && (
        <MapView
          style={{flex:1, marginTop}}
          loadingEnabled={true}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onMapReady={() => {
            setMarginTop(0)
          }}
          showsMyLocationButton={true}
          showsCompass={false}

          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}

          onUserLocationChange={ e => {
            // if(onSave){
            setCoordinate({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              altitude: e.nativeEvent.coordinate.altitude,
              timestamp: e.nativeEvent.coordinate.timestamp,
              accuracy: e.nativeEvent.coordinate.accuracy,
              speed: e.nativeEvent.coordinate.speed,
              heading: e.nativeEvent.coordinate.heading,
              isFromMockProvider: e.nativeEvent.coordinate.isFromMockProvider,
            });
            const {latitude, longitude} = e.nativeEvent.coordinate;
            setLocations([...locations, {latitude, longitude}]);
              // const {speed} = e.nativeEvent.coordinate;
              // const {timestamp} = e.nativeEvent.coordinate;
              // parseFloat(speed.toFixed(3))
            // }
            console.log("onUserLocationChange");
            console.log(e.nativeEvent.coordinate);
            setOnUserLocationChangeCnt(onUserLocationChangeCnt+1);
            console.log("onUserLocationChangeCnt", onUserLocationChangeCnt);
            // setCoordinate(e.nativeEvent.coordinate);
        }}>
          {onSave && ( <Polyline
            coordinates={locations}
            strokeWidth={2}
            strokeColor="#00F" 
          />)}
        </MapView>
      )}

      <TopLeftView style={{marginTop:A(), marginBottom:getBottomSpace()+50}}>
        <Text style={{color:"#000000"}}>onUser / {onUserLocationChangeCnt}</Text>
        <Text style={{color:"#000000"}}>{coordinate.latitude.toFixed(8)}</Text>
        <Text style={{color:"#000000"}}>{coordinate.longitude.toFixed(8)}</Text>
        <Text style={{color:"#000000"}}>{coordinate.speed.toFixed(1)}</Text>
        <Text style={{color:"#000000"}}>{coordinate.timestamp}</Text>
      </TopLeftView>

      <BottomLeftView style={{marginBottom:getBottomSpace()+50}}
      >
        <Text style={{color:"#000000"}}>watch / {watchPositionCnt}</Text>
        <Text style={{color:"#000000"}}>{coordinate2.latitude.toFixed(8)}</Text>
        <Text style={{color:"#000000"}}>{coordinate2.longitude.toFixed(8)}</Text>
        <Text style={{color:"#000000"}}>{typeof coordinate2.speed === 'number' ? coordinate2.speed.toFixed(1) : "0.0"}</Text>
        <Text style={{color:"#000000"}}>{coordinate2.timestamp}</Text>
      </BottomLeftView>

      <TouchableView style={{marginBottom:getBottomSpace()}}> 
        <TouchableOpacity
          onPress={()=>{
            setLocations([]);
            setOnUserLocationChangeCnt(0);
            setWatchPositionCnt(0);
        }}>
          <Text style={{color:"#FFFFFF"}}>초기화</Text>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={()=>{
            setOnSave(!onSave);
        }}>
          <Text style={{color:"#FFFFFF"}}>{onSave?"중지":"기록"}</Text>
        </TouchableHighlight>
      </TouchableView>
    </>
  );
};

export default App;
