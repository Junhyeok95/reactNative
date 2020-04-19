import React, {useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {
  Platform,
  PermissionsAndroid,
  Alert,
  AppState,
  NativeModules,
  NativeEventEmitter,
  Button
} from "react-native";

import BleManager from 'react-native-ble-manager';
import Geolocation from 'react-native-geolocation-service';

import {stringToBytes} from 'convert-string';
import SplashScreen from 'react-native-splash-screen'

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Header = Styled.View`
  width: 80%;
  background-color: #DDD;
  padding: 16px;
  border: 2px;
`;
const Footer = Styled.View`
  width: 80%;
  background-color: #DDD;
  padding: 16px;
  border: 2px;
`;
const RowContainer = Styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TouchableHighlight = Styled.TouchableHighlight``;
const View = Styled.View`
  border: 2px;
  margin: 2px;
`;
const SafeAreaView = Styled.SafeAreaView`
  flex: 1;
`;
const FlatListContainer = Styled(FlatList)`
  width: 80%;
  background-color: #FFF;
`;

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const Text = Styled.Text``;

type NavigationProp = StackNavigationProp<StackNaviParamList, 'Main'>;

interface Props {
  navigation: NavigationProp;
}

const BLE = ({navigation}: Props) => {

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
  
  const [scanning, setScanning] = useState<boolean>(false);
  const [peripherals, setPeripherals] = useState(new Map());
  const [appState, setAppState] = useState<string>(AppState.currentState);
  const [rasp, setRasp] = useState<string>('');
  const [cnt, setCnt] = useState<number>(0);
  const [str, setStr] = useState<string>('');

  const MY_SERVICE_UUID = '13333333-3333-3333-3333-333333333307';
  const NOTIFY_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333333301';
  const READ_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333333302';
  const WRITE_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333333303';
  
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    
    AppState.addEventListener('change', handleAppStateChange);
    BleManager.start({showAlert: false});
    
    const handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral );
    const handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    const handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    const handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android') {
      androidPermissionBluetooth();
      androidPermissionLocation();
    }

    return () => {
      handlerDiscover.remove();
      handlerStop.remove();
      handlerDisconnect.remove();
      handlerUpdate.remove();
      AppState.removeEventListener("change", handleAppStateChange);
    };
    
  },[]);
  
  const handleAppStateChange = (nextAppState:any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    setAppState(nextAppState);
    console.log('>>> handleAppStateChange');
  };

  const handleDisconnectedPeripheral = (data:any) => {
    let _peripherals = peripherals;
    let _peripheral = _peripherals.get(data.peripheral);
    if (_peripheral) {
      _peripheral.connected = false;
      _peripherals.set(_peripheral.id, _peripheral);
      setPeripherals(new Map(_peripherals));
    }
    console.log('>>> Disconnected from ' + data.peripheral);
  };

  const handleUpdateValueForCharacteristic = (data:any) => {
    // service, peripheral, characteristic, value
    console.log('>>> DidUpdateValueForCharacteristic');
    setStr(data.value);
  };
  
  const startScan = () => {
    if (!scanning) {
      setPeripherals(new Map()); // 기본 장치 값 초기화
      BleManager.scan([], 3, true).then((results) => {
        console.log('========= Scanning... =========');
        setScanning(true);
      });
    }
  }

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      let _peripherals = peripherals;
      for (let i = 0; i < results.length; i++) {
        let _peripheral = results[i];
        _peripheral.connected = true;
        _peripherals.set(_peripheral.id, _peripheral);
        setPeripherals( new Map(_peripherals) );
      }
    });
  }

  const handleStopScan = () => {
    console.log('========= Scan stopped =========');
    setScanning(false);
  };

  // 장치 검색
  const handleDiscoverPeripheral = (peripheral:any) => {
    let _peripherals = peripherals;
    console.log('>>> Got ble peripheral : ', peripheral.id);
    if (!peripheral.name) { // 이름이 없을 경우
      peripheral.name = 'NO NAME';
    }
    _peripherals.set(peripheral.id, peripheral);
    setPeripherals( new Map(_peripherals) );
  };

  const testCode = (peripheral:any) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id).then(() => {
          setRasp('');
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        BleManager.connect(peripheral.id).then(() => { // connect
          let _peripherals = peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            _peripherals.set(peripheral.id, p);
            setPeripherals(new Map(peripherals));
          }
          console.log('Connected to ' + peripheral.id); // 연결됨
  
          setTimeout(() => { // 1 setTimeout
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              setRasp(peripheral.id); // 연결된 장치
              console.log('>>> peripheralInfo'); // 이 정보로 코딩
              console.log(peripheralInfo);
              var service = '13333333-3333-3333-3333-333333333307';
              var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
              var crustCharacteristic = '13333333-3333-3333-3333-333333333301';

              setTimeout(() => { // 2 setTimeout
                BleManager.startNotification(peripheral.id, MY_SERVICE_UUID, bakeCharacteristic).then(() => {
                  console.log('Started notification on ' + peripheral.id);
                  setTimeout(() => { // 3 setTimeout
                    BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {
                      console.log('Writed NORMAL crust');
                      BleManager.write(peripheral.id, service, bakeCharacteristic, [1,10]).then(() => {
                        console.log('Writed 351 temperature, the pizza should be BAKED');
                      });
                    });
                  }, 500); // 3 setTimeout
                }).catch((error) => { // startNotification
                  console.log('Notification error', error);
                });
              }, 200); // 2 setTimeout
            });
          }, 800); // 1 setTimeout
        }).catch((error) => { // connect catch
          console.log('Connection error', error);
        });
      }
    }
  };

  const connectBtn = (peripheral:any) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id).then(() => {
          setRasp('');
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        BleManager.connect(peripheral.id).then(() => { // connect
          let _peripherals = peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            _peripherals.set(peripheral.id, p);
            setPeripherals(new Map(peripherals));
          }
          console.log('Connected to ' + peripheral.id); // 연결됨
  
          setTimeout(() => { // 1 setTimeout
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              setRasp(peripheral.id); // 연결된 장치
              console.log("retrieveServices");
              console.log(peripheralInfo);

              setTimeout(() => { // 2 setTimeout
                BleManager.startNotification(peripheral.id, MY_SERVICE_UUID, NOTIFY_CHARACTERISTIC_UUID).then(() => {
                  console.log('Started notification on ' + peripheral.id);
                }).catch((error) => { // startNotification
                  console.log('Notification error', error);
                });
              }, 200); // 2 setTimeout
            });
          }, 800); // 1 setTimeout
        }).catch((error) => { // connect catch
          console.log('Connection error', error);
        });
      }
    }
  };

  const readBtn = () => {
    BleManager.read(rasp, MY_SERVICE_UUID, READ_CHARACTERISTIC_UUID)
    .then((readData) => {
      // Success code
      console.log('Read: ' + readData);
      // console.log('Read: ' + readData[0]);
      // console.log('Read: ' + readData[1]);
      setCnt(cnt+1);
      console.log('Read cnt: ' + cnt);
    })
    .catch((error) => {
      // Failure code
      console.log(error);
    });
  };

  const writeBtn = () => {
    // 'b' array로 감
    const data = stringToBytes('hello월드');
    
    BleManager.write(rasp, MY_SERVICE_UUID, WRITE_CHARACTERISTIC_UUID, data)
    .then(() => {
      // Success code
      console.log('Write: ' + data);
      setCnt(cnt+1);
      console.log('Write cnt: ' + cnt);
    })
    .catch((error) => {
      // Failure code
      console.log(error);
    });
  };

  const renderItem = (item:any) => {
    const color = item.connected ? '#00BFFF' : '#F5FFFA';
    return (
      <TouchableHighlight onPress={() => { connectBtn(item) }}>
        <View style={{margin: 10, backgroundColor: color, borderWidth: 2, borderColor: '#000'}}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  const list = Array.from(peripherals.values());
  const btnScanTitle = '블루투스 검색 ('+(scanning?'ON':'OFF')+')';

  return (
    <SafeAreaView>
      <Container>
        <Header>
          <View>
            <Button title={str+" - "+btnScanTitle} onPress={() => startScan() } />
          </View>
          <View>
            <Button title={"Retrieve connected peripherals"} onPress={() => retrieveConnected() } />
          </View>
        </Header>
        <FlatListContainer
          data={list}
          renderItem={({ item }) => renderItem(item) }
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={{flex:1, justifyContent: 'center', margin: 20, height: 80}}>
              <Text style={{textAlign: 'center'}}>No peripherals</Text>
            </View>
          }
          />
        <Footer>
          <View>
            <Text style={{fontSize: 16, textAlign: 'center', color: '#333333', padding: 10}}>connect : {rasp?rasp:'NO'}</Text>
          </View>
          <RowContainer>
            <View>
              <Button title="readBtn" onPress={() => readBtn() } />
            </View>
            <View>
            <Button title="writeBtn" onPress={() => writeBtn() } />
            </View>
          </RowContainer>
        </Footer>
      </Container>
    </SafeAreaView>
  );
};

export default BLE;