import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  Platform, PermissionsAndroid,
  Button, Alert,
  NativeModules, NativeEventEmitter, } from "react-native";
import BleManager from 'react-native-ble-manager';

const ContainerContainer = Styled.View`
  flex: 1;
  flex-direction: row;
`;

const Container = Styled.View`
  flex: 1;
  backgroundColor: #FFF;
  justify-content: center;
  align-items: center;
  
`;
const View = Styled.View`
  margin: 4px;
  padding: 8px;
  width: 90%;
  border: 1px solid #000;
  backgroundColor: #DDD;
`;
const Text = Styled.Text`
  font-size: 24px;
`;

const Label = Styled.View`
  width: 90%;
  height: 40px;
  border: 3px solid #CCC;
  margin: 4px;
  align-items: center;
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

  const createThreeButtonAlert = () => {
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
  };

  const reqFunc = () => { // 권한 요청
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

  const req = () => { // 권한 요청
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
    try {
      const BleManagerModule = NativeModules.BleManager;
      const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
      console.log('useEffect ok');
    } catch (error) {
      console.log(error);
    }
  },[]);
  
  return (
    <ContainerContainer>
      <Container>
        <Label>
          <Text>Left</Text>
        </Label>
        <View>
          <Text>startScan</Text>
          <Button title="startScan" onPress={ ()=>{startScan()} } />
        </View>
        <View>
          <Text>createThree
            ButtonAlert</Text>
          <Button title="createThree
          ButtonAlert" onPress={ ()=>{createThreeButtonAlert()} } />
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
          <Text>console / reset</Text>
          <Button title="console" onPress={ ()=>{
            setScanning(false);
            console.log("console reset");
          } } />
        </View>
      </Container>
      <Container>
        <Label>
          <Text>Right</Text>
        </Label>
      </Container>

    </ContainerContainer>
  );
};

export default App;
