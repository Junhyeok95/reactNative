import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';

import {
  FlatList, Platform, Alert,
  PermissionsAndroid, AppState,
  NativeModules, NativeEventEmitter,} from 'react-native';

import Toggle from '~/Screens/Device/List/Toggle';
import Subtitle from '~/Screens/Device/List/Subtitle';

import BleManager from 'react-native-ble-manager';
import Geolocation from 'react-native-geolocation-service';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Container = Styled.View`
  flex: 1;
  width: 90%;
  background-color: #CFC;
`;
const View = Styled.View``;
const FlatListContainer = Styled(FlatList)``;

const EmptyItem = Styled.View``;
const TouchableHighlight = Styled.TouchableHighlight``;

const Text = Styled.Text`
  padding: 8px;
  margin: 8px;
  background-color: #EEE;
  border: 5px;
  border-radius: 10px;
  border-color: #00F;
  font-size: 24px;
  text-align: center;
`;

interface Props {}

const List = ({  }: Props) => {

  // 안드로이드 블루투스 요청
  const androidPermissionBluetooth = () => {
    if (Platform.OS === 'android') {
      BleManager.enableBluetooth() // Android only
      .then(() => {
        console.log('android Bluetooth check OK');
      })
      .catch((error) => {
        Alert.alert('You need to enable bluetooth to use this app.');
      });
    } else if (Platform.OS === 'ios') {
      Alert.alert('PermissionBluetooth, Android only');
    }
  };

  // 안드로이드 위치권한 요청
  const androidPermissionLocation = () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => { // check
        if (result) {
          console.log("android LOCATION check OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => { // request
            if (result) {
              console.log("android LOCATION request Ok");
            } else {
              console.log("android LOCATION reject");
            }
          });
        }
      });
    } else if (Platform.OS === 'ios') {
      Alert.alert('PermissionLocation, Android only');
    }
  };

  ////////// ////////// ////////// ////////// //////////

  const [scanning, setScanning] = useState<boolean>(false);
  const [peripherals, setPeripherals] = useState(new Map());
  const [appState, setAppState] = useState<string>(AppState.currentState);
  const [raspId, setRaspId] = useState<string>('');
  const [blueToothEnable, setBlueToothEnable] = useState<boolean>(false);

  useEffect(()=>{

    console.log('> List useEffect');

    AppState.addEventListener("change", HandleAppStateChange);
    const HandlerDiscoverPeripheral = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', HandleDiscoverPeripheral );
    const HandlerStop = bleManagerEmitter.addListener('BleManagerStopScan', HandleStopScan );
    const HandlerDisconnectedPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', HandleDisconnectedPeripheral );
    const HandlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', HandleUpdateValueForCharacteristic );

    if (Platform.OS === 'android') {
      androidPermissionBluetooth();
      androidPermissionLocation();
    }

    return() => {
      // AppState
      // AppState.removeEventListener("change", HandleAppStateChange);
      HandlerDiscoverPeripheral.remove();
      HandlerStop.remove();
      HandlerDisconnectedPeripheral.remove();
      HandlerUpdate.remove();
    };

  }, []);

  ////////// ////////// ////////// ////////// //////////

  // 0. 화면 전환
  const HandleAppStateChange = (nextAppState:any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('> App has come to the foreground!')
      console.log('! _RetrieveConnected() Start')
      // point
      _RetrieveConnected();
    }
    setAppState(nextAppState);
  };

  // 1. Emitter addListener 장치 검색
  const HandleDiscoverPeripheral = (peripheral:any) => {
    console.log('> 장치 검색 성공 : ', peripheral.id);
    let _peripherals = peripherals;
    if (!peripheral.name) { // 이름이 없을 경우
      peripheral.name = 'NO NAME';
    }
    _peripherals.set(peripheral.id, peripheral);
    setPeripherals( new Map(_peripherals) );
  };

  // 2. Emitter addListener 장치 검색 취소 BleManagerStopScan 중지되면 실행
  const HandleStopScan = () => {
    console.log('> 장치 검색 중지');
    setScanning(false);
  };

  // 3. Emitter addListener 연결 취소 됬을 경우
  const HandleDisconnectedPeripheral = (data:any) => {
    console.log('disconnect Test2');

    console.log('> 연결 취소 : ' + data.peripheral);
    // startNotification
    // BleManager.stopNotification(data.peripheral, "SERVICE_UUID", "NOTIFY_CHARACTERISTIC_UUID").then(() => {
    //   console.log('> stopNotification ' + data.peripheral);
    // }).catch((error) => { // startNotification
    //   console.log('> stopNotification error', error);
    // });

    let _peripherals = peripherals;
    let _peripheral = _peripherals.get(data.peripheral);
    if (_peripheral) {
      _peripheral.connected = false;
      _peripherals.set(_peripheral.id, _peripheral);
      setPeripherals(new Map(_peripherals));
    }
    console.log('> Disconnected from ' + data.peripheral);
  };

  // 4. Emitter addListener 변경
  const HandleUpdateValueForCharacteristic = (data:any) => {
    try {
      if (data){
        console.log(data.value);
        /*
          임시 테스트 규칙
          0 -> 카운트
          1 -> 왼눈
          2 -> 오눈
          3 -> 방향
          4 -> 기울기 x
          5 -> y
          6-> z
          7 -> 카메라 x
          8 -> y
          9 -> 초점
          10 -> 온오프
          11 -> 신고 상태
          12 -> 카운트
          13 -> 충격량
          14 ->
          15 ->
          16 ->
          17 ->
          18 ->
          19 ->
          20 ->
        */
      }
    } catch (error) {

    }
  };

  const _Scan = () => {
    if (!scanning) {
      // 기본 장치 값 초기화
      setPeripherals( new Map() );
      BleManager.scan([], 2, true).then((results) => {
        setScanning(true);
        console.log('> Scanning ...');
      });
    }
  }

  const _RetrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('> No connected peripherals');
        console.log('! _Scan Start');
        _Scan();
      }

      console.log("> connected peripherals List");
      let _peripherals = peripherals;
      for (let i = 0; i < results.length; i++) {
        let _peripheral = results[i];
        _peripheral.connected = true;
        _peripherals.set(_peripheral.id, _peripheral);
        setPeripherals( new Map(_peripherals) );
      }
    });
  }

  const connectBtn = (peripheral:any) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id).then(() => {
          console.log('disconnect Test1');
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        BleManager.connect(peripheral.id).then(() => {
          let _peripherals = peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            _peripherals.set(peripheral.id, p);
            setPeripherals(new Map(_peripherals));
          }
          console.log('> Connected to ' + peripheral.id);
  
          setTimeout(() => { // 1 setTimeout
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              // Connected peripheralInfo
              console.log("# retrieveServices, Connected peripheralInfo");
              console.log(peripheralInfo);

              // setTimeout(() => { // 2 setTimeout
              //   BleManager.startNotification(peripheral.id, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
              //     console.log('### Started notification on ' + peripheral.id);
              //   }).catch((error) => { // startNotification
              //     console.log('Notification error', error);
              //   });
              // }, 300);

            });
          }, 500);

        }).catch((error) => {
          console.log('> Connection error', error);
        });
      }
    }
  };

  const renderEmpty = () => <EmptyItem><Text style={{textAlign: 'center'}}>NO List</Text></EmptyItem>
  const renderItem = ({ item, index }:any) => {
    const color = item.connected ? '#00BFFF' : '#F5FFFA';
    return (
      <TouchableHighlight onPress={() => { connectBtn(item) }}>
        <View style={{margin: 10, backgroundColor: color}}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 4}}>{item.name}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  const list = Array.from(peripherals.values());
  const btnScanTitle = 'Ble 검색 ('+(scanning?'ON':'OFF')+')';

  return (
    <Container>
      <Toggle />
      <Subtitle title = 'Device List' btnLabel={btnScanTitle} onPress={_Scan} />
      <FlatListContainer
        keyExtractor={( item, index ):any => {
          return `key-${index}`;
        }}
        data={list}
        ListEmptyComponent={renderEmpty} // data 배열이 없을 경우 표시되는 컴포넌트
        renderItem={renderItem}
      />
    </Container>
  );
};
export default List;
