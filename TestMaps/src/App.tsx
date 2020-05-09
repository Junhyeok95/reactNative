import React, {useState, useEffect, useRef} from 'react';
import {PermissionsAndroid, Platform, Alert}from 'react-native';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const SafeAreaView = Styled.SafeAreaView`
  flex: 1;
`;

const View = Styled.View`
  border-color: #00F;
  border-width: 2px;
  padding: 8px;
  margin: 8px;
`;
const View2 = Styled.View`
  border-color: #0AA;
  border-width: 2px;
  padding: 8px;
  margin: 8px;
`;
const Text = Styled.Text`
  text-align: center;
  font-size: 16px;
`;
const TouchableOpacityView = Styled.View`
  flex-direction: row;
  justify-content: center;
`;

// position: absolute;
// top: 32px;
// left: 32px;
const TouchableOpacity = Styled.TouchableOpacity`
  background-color: #00F;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  margin-right: 32px;
`;
const TouchableOpacity2 = Styled.TouchableOpacity`
  background-color: #0AA;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
`;
interface ILocation {
  latitude: number;
  longitude: number;
}
interface ICoordinate {
  latitude: number;
  longitude: number;
  altitude: number;
  timestamp: number;
  accuracy: number;
  speed: number;
  heading: number;
  isFromMockProvider: boolean;
}

interface Props {}

const App = ({ }: Props) => {
  // ACCESS_FINE_LOCATION -> GPS 기반
  // ACCESS_COARSE_LOCATION -> NETWORK 기반
  // ACCESS_BACKGROUND_LOCATION -> 백그라운드

  const [onMap, setOnMap] = useState<boolean>(false);
  const [onSave, setOnSave] = useState<boolean>(false);
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const [marginTop, setMarginTop] = useState<number>(1);
  const [coordinate, setCoordinate] = useState<ICoordinate | undefined>(undefined);

  const [locations, setLocations] = useState<Array<ILocation>>([]);
  const [nowSpeed, setNowSpeed] = useState<number>(0);
  const [nowTimestamp, setNowTimestamp] = useState<number>(0);

  useEffect(() => {
    console.log("------------------ useEffect ------------------");

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => { // check
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
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    return () => {

    };
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacityView>
        <TouchableOpacity
          onPress={()=>{
            setLocations([]);
            setNowSpeed(0);
            setNowTimestamp(0);
          }}
        >
          <Text
            style={{color:"#FFFFFF"}}
          >
            초기화
          </Text>
        </TouchableOpacity>
        <TouchableOpacity2
          onPress={()=>{
            setOnSave(!onSave);
          }}
        >
          <Text
            style={{color:"#FFFFFF"}}
          >
            {onSave?"중지":"기록"}
          </Text>
        </TouchableOpacity2>
      </TouchableOpacityView>
      {location && (
        <MapView
          style={{flex:1, marginTop}}
          loadingEnabled={true}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onMapReady={() => {
            setMarginTop(0)
            setOnMap(true)
          }}
          showsMyLocationButton={true}
          showsCompass={false}

          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}

          onRegionChangeComplete={region => {
            console.log(region);
          }}

          onUserLocationChange={ e => {
            if(onSave){
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
              const {speed} = e.nativeEvent.coordinate;
              const {timestamp} = e.nativeEvent.coordinate;
              setNowSpeed(parseFloat(speed.toFixed(3)));
              setNowTimestamp(timestamp);
            }
            console.log(e.nativeEvent.coordinate);
          }}
        >
          {onSave && (<Polyline
            coordinates={locations}
            strokeWidth={2}
            strokeColor="#00F" 
          />)}
        </MapView>
      )}
      <View>
        <Text>
        {JSON.stringify(coordinate)}
        </Text>
      </View>
      <View2>
        <Text>
          save {locations.length} : {}/ speed : {nowSpeed} / time : {nowTimestamp}
        </Text>
      </View2>
      
    </SafeAreaView>
  );
};

export default App;
