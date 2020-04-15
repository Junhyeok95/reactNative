import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
// import {
//   Platform, PermissionsAndroid, Alert, AppState,
//   NativeModules, NativeEventEmitter, } from "react-native";
// import BleManager from 'react-native-ble-manager';
// import Geolocation from 'react-native-geolocation-service';

// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const Container = Styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;
// const Label = Styled.Text`
//   font-size: 32px;
// `;
// const Absolute = Styled.View`
//   position: absolute;
//   top: 16px;
// `;
// const Text = Styled.Text`
//   font-size: 32px;
//   font-weight: 700;
// `;

const BleTest = () => {
  // // countTest
  // const [count, setCount] = useState<number>(0);

  // const [scanning, setScanning] = useState<boolean>(false);
  // const [peripherals, setPeripherals] = useState(new Map());
  // const [appState, setAppState] = useState<string>(AppState.currentState);
  // const [connectedPeripheral, setConnectedPeripheral] = useState<string>('');

  // // ReactNative AppState handle 재연결 부분
  // const _handleAppStateChange = (nextAppState:any) => {
  //   if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //     console.log('App has come to the foreground!')
  //     // point
  //     BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
  //       console.log('Connected peripherals: ' + peripheralsArray.length);
  //     });
  //   }
  //   setAppState(nextAppState);
  // };
  // // 안드로이드 블루투스 요청
  // const androidPermissionBluetooth = () => {
  //   // android PermissionsAndroid Bluetooth
  //   if (Platform.OS === 'android') {
  //     BleManager.enableBluetooth() // Android only
  //     .then(() => {
  //       console.log('android Bluetooth check OK');
  //     })
  //     .catch((error) => {
  //       Alert.alert('You need to enable bluetooth to use this app.');
  //     });
  //   } else if (Platform.OS === 'ios') {
  //     Alert.alert('PermissionBluetooth, Android only');
  //   }
  // };
  // // 안드로이드 위치권한 요청
  // const androidPermissionLocation = () => {
  //   // android PermissionsAndroid ACCESS_COARSE_LOCATION
  //   if (Platform.OS === 'android' && Platform.Version >= 23) {
  //     PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => { // check
  //       if (result) {
  //         console.log("android LOCATION check OK");
  //       } else {
  //         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => { // request
  //           if (result) {
  //             console.log("android LOCATION request Ok");
  //           } else {
  //             console.log("android LOCATION reject");
  //           }
  //         });
  //       }
  //     });
  //   } else if (Platform.OS === 'ios') {
  //     Alert.alert('PermissionLocation, Android only');
  //   }
  // };
  // // 1. Emitter addListener 장치 검색
  // const _handleDiscoverPeripheral = (peripheral:any) => {
  //   console.log('>>> Got ble peripheral : ', peripheral.id);
  //   let _peripherals = peripherals;
  //   if (!peripheral.name) { // 이름이 없을 경우
  //     peripheral.name = 'NO NAME';
  //   }
  //   _peripherals.set(peripheral.id, peripheral);
  //   setPeripherals( new Map(_peripherals) );
  // };
  // // 2. Emitter addListener 장치 검색 취소 BleManagerStopScan 중지되면 실행
  // const _handleStopScan = () => {
  //   console.log('========= Scan stopped =========');
  //   setScanning(false);
  // };
  // // 3. Emitter addListener 연결 취소 됬을 경우
  // const _handleDisconnectedPeripheral = (data:any) => {
  //   let _peripherals = peripherals;
  //   // data 의 peripheral 을 찾아내서 변경
  //   let _peripheral = _peripherals.get(data.peripheral);
  //   if (_peripheral) {
  //     _peripheral.connected = false;
  //     _peripherals.set(_peripheral.id, _peripheral);
  //     setPeripherals(new Map(_peripherals));
  //   }
  //   console.log('>>> Disconnected from ' + data.peripheral);
  // };
  // // 4. Emitter addListener 변경
  // const _handleUpdateValueForCharacteristic = (data:any) => {
  //   // 체크하자 value, peripheral, characteristic, service 
  //   console.log('>>> DidUpdateValueForCharacteristic');
  //   console.log('> characteristic / peripheral / service / return value');
  //   try {
  //     if (!data){

  //     }
  //   } catch (error) {
  //   }
  // };
  // // Btn -> 스캔
  // const _startScan = () => {
  //   if (!scanning) {
  //     setPeripherals(new Map()); // 기본 장치 값 초기화
  //     BleManager.scan([], 3, true).then((results) => {
  //       // JSON.stringify(results, null, 5);
  //       console.log('========= Scanning... =========');
  //       setScanning(true);
  //     });
  //   }
  // }
  // // Btn -> 장치 재연결
  // const _retrieveConnected = () => {
  //   BleManager.getConnectedPeripherals([]).then((results) => {
  //     if (results.length == 0) {
  //       console.log('No connected peripherals');
  //     }
  //     console.log(results);
  //     let _peripherals = peripherals;
  //     for (let i = 0; i < results.length; i++) {
  //       let _peripheral = results[i];
  //       _peripheral.connected = true;
  //       _peripherals.set(_peripheral.id, _peripheral);
  //       setPeripherals( new Map(_peripherals) );
  //     }
  //   });
  // }
  
  // useEffect(() => {
  //   console.log("BleTest componentDidMount");
  //   if (Platform.OS === 'android') {
  //     androidPermissionBluetooth();
  //     androidPermissionLocation();
  //   }
    
  //   // ReactNative AppState handle
  //   AppState.addEventListener("change", _handleAppStateChange);
  //   BleManager.start({showAlert: false}); // StartOptions 가능, showAlert->ios

  //   const handlerDiscoverPeripheral = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', _handleDiscoverPeripheral );
  //   const handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', _handleStopScan );
  //   const handlerDisconnectedPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', _handleDisconnectedPeripheral );
  //   const handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', _handleUpdateValueForCharacteristic );
    
  //     // test
  //     const interval = setInterval(() => {
  //       setCount(count => count+1);
  //     }, 1000);    
  //   return () => {
  //     //test
  //     clearInterval(interval);
  //     console.log("BleTest componentWillUnmount");
  //     handlerDiscoverPeripheral.remove();
  //     handlerStop.remove();
  //     handlerDisconnectedPeripheral.remove();
  //     handlerUpdate.remove();
  //     AppState.removeEventListener("change", _handleAppStateChange); // AppState 를 이용한 헨들러 컨트롤
  //   };
  // },[]);
  
  return (
    // <Container>
    //   <Absolute>
    //     <Text>{count}</Text>
    //   </Absolute>
    //   <Label>BleTest</Label>
    // </Container>
    <>
    </>
  );
};

export default BleTest;
