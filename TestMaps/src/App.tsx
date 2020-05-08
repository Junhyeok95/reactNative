import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform, Alert}from 'react-native';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
const SafeAreaView = Styled.SafeAreaView`
  flex: 1;
`;
const Text = Styled.Text`
  padding: 8px;
  text-align: center;
  border-width: 1px;
  font-size: 24px;
`;

interface Props {}

const App = ({ }: Props) => {
  // ACCESS_FINE_LOCATION -> GPS 기반
  // ACCESS_COARSE_LOCATION -> NETWORK 기반
  // ACCESS_BACKGROUND_LOCATION -> 백그라운드
  const androidPermissionLocation = () => {
    if (Platform.OS === 'android') { // && Platform.Version >= 23
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        if (result) {
          console.log("android ACCESS_COARSE_LOCATION ok");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("android ACCESS_COARSE_LOCATION resolve");
            } else {
              console.log("android ACCESS_COARSE_LOCATION reject");
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    androidPermissionLocation();
    console.log("--- useEffect");
  }, []);

  const [data, setData] = useState<any>();

  return (
    <SafeAreaView>
      <MapView
        style={{flex:1}}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}

        showsUserLocation={true}
        showsMyLocationButton={false}
        showsPointsOfInterest={false}

        initialRegion={{
          latitude: 35.896311,
          longitude: 128.622051,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onUserLocationChange={ e => {
          console.log(e.nativeEvent.coordinate);
          setData(JSON.stringify(e.nativeEvent.coordinate));
        }}
      />
      <Text>
        {data}
      </Text>
    </SafeAreaView>
  );
};

export default App;
