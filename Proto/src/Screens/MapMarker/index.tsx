import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
// import {KEY} from 'react-native-dotenv'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Platform, Alert} from "react-native";
import Geolocation from 'react-native-geolocation-service';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
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
  // const [location, setLocation] = useState<IGeolocation>({
  //   latitude: 35.896311,
  //   longitude: 128.622051,
  // });

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
        distanceFilter: 10,
        interval: 3000,
      },
    );
  }, [locations]);
  
  
  useEffect(() => {
    console.log("-- MapMarker Mount");
    return () => {
      if (_watchId !== null) {
        Geolocation.clearWatch(_watchId);
      }
    }
  },[]); 

  // onRegionChangeComplete={region => {
  //   setLocation({
  //     latitude: region.latitude,
  //     longitude: region.longitude,
  //   });
  // }}

  return (
    <Container>
      {/* {locations.length > 0 && ( */}
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            // latitude: locations[0].latitude,
            // longitude: locations[0].longitude,
            latitude: 35.896311,
            longitude: 128.622051,
            latitudeDelta: 0.0800,
            longitudeDelta: 0.0400,
          }}>
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
      {/* )} */}
    </Container>
  );
};

export default MapMarker;