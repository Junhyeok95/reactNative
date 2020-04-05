import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  Platform, PermissionsAndroid,
  Button, Alert,
  NativeModules, NativeEventEmitter, } from "react-native";
import BleManager from 'react-native-ble-manager';

const Container = Styled.View`
  flex: 1;
  backgroundColor: #FFF;
  justify-content: center;
  align-items: center;
  
`;
const View = Styled.View`
  margin: 4px;
  padding: 8px;
  width: 80%;
  border: 1px solid #000;
  backgroundColor: #DDD;
`;
const Text = Styled.Text`
  font-size: 16px;
`;

const App = () => {
  const func = async () => {
    if(Platform.OS === "android"){
      try {
      } catch (err) {
      }
    } else if (Platform.OS === "ios"){
    }

  };
  const req = () => {
    async function androidPermissionCheckPermission() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: "ACCESS_COARSE_LOCATION",
          message: "ACCESS_COARSE_LOCATION",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('ok');
      } else {
        console.log('AndroidManifest');
      }
    }
    if (Platform.OS === 'android') {
      androidPermissionCheckPermission();
    } else if (Platform.OS === "ios"){
    }
  }
  const reqFunc = () => {
    if(Platform.OS === 'android' && Platform.Version >= 23){
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        if(!result){
          PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if(!result){
              Alert.alert('You need to give access to coarse location to use this app.');
            }
          });
        }
    });
    }
  };
  const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
// -----------------------------------------------------------------
const [scanning, setScanning] = useState<boolean>(false);
const [peripherals, setPeripherals] = useState<any>();
const [appState, setAppState] = useState<string>('');

function startScan() {
  if (!scanning) {
    //this.setState({peripherals: new Map()});
    BleManager.scan([], 3, true).then((results) => {
      console.log('Scanning...');
      setScanning(true);
    });
  } else{
    console.log('err');
  }
}

// -----------------------------------------------------------------



  useEffect(() => {
    
    const BleManagerModule = NativeModules.BleManager;
    const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
    console.log('useEffect ok');


  },[]);
  
  return (
    <Container>
      <View>
        <Text>Permissions</Text>
        <Button title="Permissions" onPress={ ()=>{} } />
      </View>
      <View>
        <Text>startScan</Text>
        <Button title="startScan" onPress={ ()=>{startScan()} } />
      </View>
      <View>
        <Text>createThreeButtonAlert</Text>
        <Button title="createThreeButtonAlert" onPress={ ()=>{createThreeButtonAlert()} } />
      </View>
      <View>
        <Text>reqFunc</Text>
        <Button title="reqFunc" onPress={ ()=>{
          console.log("reqFunc");
          reqFunc();
        } } />
      </View>
      <View>
        <Text>req</Text>
        <Button title="req" onPress={ ()=>{
          console.log("req");
          req();
        } } />
      </View>
      <View>
        <Text>console</Text>
        <Button title="console" onPress={ ()=>{
          setScanning(false);
          console.log("console reset");
        } } />
      </View>
    </Container>
  );
};

export default App;
