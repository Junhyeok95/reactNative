import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {Text, View, TouchableHighlight, FlatList, Button} from 'react-native';
import {
  Platform, PermissionsAndroid, Alert, AppState,
  NativeModules, NativeEventEmitter, } from "react-native";
import BleManager from 'react-native-ble-manager';
import Geolocation from 'react-native-geolocation-service';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const ContainerContainer = Styled.View`
  flex: 1;
  backgroundColor: #AAA;
  flex-direction: row;
`;
const ButtonContainer = Styled.View`
  backgroundColor: #00FF7F;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const View2 = Styled.View`
  margin: 4px;
  padding: 8px;
  border: 1px solid #000;
  backgroundColor: #E6E6FA;
`;
const FlatListContainer = Styled(FlatList)``;
const Container = Styled.View`
  flex: 1;
  backgroundColor: #E0FFFF;
  margin: 2%;
`;
  
const App = () => {

  const [scanning, setScanning] = useState<boolean>(false);
  const [peripherals, setPeripherals] = useState(new Map());
  const [appState, setAppState] = useState<string>(AppState.currentState);

  const [connectedPeripheral, setConnectedPeripheral] = useState<string>('');

  // return 필요 변수
  const list = Array.from(peripherals.values());
  const btnScanTitle = '블루투스 검색 (  ' + (scanning ? 'on' : 'off') + '  )';

  // 인터넷 요구 networks need
  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermissionBluetooth();
      androidPermissionLocation();
    }

    // ReactNative AppState handle
    AppState.addEventListener("change", _handleAppStateChange);
    BleManager.start({showAlert: false}); // StartOptions 가능, showAlert->ios

    const handlerDiscoverPeripheral = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', _handleDiscoverPeripheral );
    const handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', _handleStopScan );
    const handlerDisconnectedPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', _handleDisconnectedPeripheral );
    const handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', _handleUpdateValueForCharacteristic );

    // // BleManager.connect(peripheral.id) 가 호출되서 성공하면 실행 될 함수
    // const handlerConnectedPeripheral = bleManagerEmitter.addListener('BleManagerConnectPeripheral', (data) => {
    //   console.log(data);
    // });
    // // BleManager.checkState() 가 호출되면 실행 될 함수
    // const handlerDidUpdateState = bleManagerEmitter.addListener('BleManagerDidUpdateState', (args) => {
    //   console.log(args);
    // });
  
    return () => {
      console.log("====================== componentWillUnmount ======================");
      handlerDiscoverPeripheral.remove();
      handlerStop.remove();
      handlerDisconnectedPeripheral.remove();
      handlerUpdate.remove();

      // handlerConnectedPeripheral.remove();
      // handlerDidUpdateState.remove();
      AppState.removeEventListener("change", _handleAppStateChange); // AppState 를 이용한 헨들러 컨트롤
    };
  
  },[]);

  // ReactNative AppState handle 재연결 부분
  const _handleAppStateChange = (nextAppState:any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      // point
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    setAppState(nextAppState);
  };

  // 위치 정보 요청
  const getCurrentlocation = () => {
    Geolocation.getCurrentPosition(position => {
      console.log('위치 정보를 가져오는데 성공');
    },
    error => {  
      console.log('위치 정보를 가져오는데 실패');
    });

    // Geolocation.getCurrentPosition((position:any) => {
    //   console.log("> 위도 경도 ###########################");
    //   // 리턴값이 온다 / 위도와 경도를 position으로 받아옴
    //   const { latitude, longitude } = position.coords;
    //     // // fetch API를 사용하여서 비동기로 데이터를 받아옴
    //     // fetch()
    //     // // response.json() 은 res 정보를 JSON 형식으로 promise를 반환
    //     // .then(response => response.json())
    //     // .then(json => {
    //     // })
    //     // .catch(error => {
    //     //     showError('날씨 정보를 가져오는데 실패' );
    //     // });
    // }, (error:any) => {
    //   console.log('위치 정보를 가져오는데 실패 / 권한을 확인하자');
    // });
  };

  // 안드로이드 블루투스 요청
  const androidPermissionBluetooth = () => {
    // android PermissionsAndroid Bluetooth
    if (Platform.OS === 'android') {
      BleManager.enableBluetooth() // Android only
      .then(() => {
        console.log('Bluetooth is already enabled');
      })
      .catch((error) => {
        Alert.alert('You need to enable bluetooth to use this app.');
      });
    } else {
      console.log('Android only');
    }
  };

  // 안드로이드 위치권한 요청
  const androidPermissionLocation = () => {
    // android PermissionsAndroid ACCESS_COARSE_LOCATION
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
    }
  };

  // 반복호출됨
  // 1. Emitter addListener 장치 검색
  const _handleDiscoverPeripheral = (peripheral:any) => {
    console.log('>>> Got ble peripheral : ', peripheral.id);
    let _peripherals = peripherals;
    if (!peripheral.name) { // 이름이 없을 경우
      peripheral.name = 'NO NAME';
    }
    _peripherals.set(peripheral.id, peripheral);
    setPeripherals( new Map(_peripherals) );
  };

  // 2. Emitter addListener 장치 검색 취소 BleManagerStopScan 중지되면 실행
  const _handleStopScan = () => {
    console.log('========= Scan stopped =========');
    setScanning(false);
  };

  // 3. Emitter addListener 연결 취소 됬을 경우
  const _handleDisconnectedPeripheral = (data:any) => {
    let _peripherals = peripherals;
    // data 의 peripheral 을 찾아내서 변경
    let _peripheral = _peripherals.get(data.peripheral);
    if (_peripheral) {
      _peripheral.connected = false;
      _peripherals.set(_peripheral.id, _peripheral);
      setPeripherals(new Map(_peripherals));
    }
    console.log('>>> Disconnected from ' + data.peripheral);
  };

  // 4. Emitter addListener 변경
  const _handleUpdateValueForCharacteristic = (data:any) => {
    // 체크하자 value, peripheral, characteristic, service 
    console.log('>>> DidUpdateValueForCharacteristic');
    console.log('> characteristic / peripheral / service / return value');
    try {
      if (!data){

      }
    } catch (error) {
    }
  };

  // ========================================================
  // ######                                            ######
  // ========================================================

  // Btn -> 스캔
  const _startScan = () => {
    if (!scanning) {
      setPeripherals(new Map()); // 기본 장치 값 초기화
      BleManager.scan([], 3, true).then((results) => {
        // JSON.stringify(results, null, 5);
        console.log('========= Scanning... =========');
        setScanning(true);
      });
    }
  }

  // Btn -> 장치 재연결
  const _retrieveConnected = () => {
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

  function test(peripheral:any) {
    if (peripheral){
      if (peripheral.connected){ // boolean
        BleManager.disconnect(peripheral.id).then(() => {
          // Success code
          setConnectedPeripheral('');
          console.log('----------------------Disconnected');
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
      }else{
        BleManager.connect(peripheral.id).then(() => { // 연결시도
          console.log('연결 중'); // 연결중

          let _peripherals = peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            _peripherals.set(peripheral.id, p);
            setPeripherals(new Map(peripherals));
          }
          console.log('Connected to ' + peripheral.id); // 연결됨

          setTimeout(() => {

            /* Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);

              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
              });
            });*/

            /* Test write */
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              setConnectedPeripheral(peripheral.id); // 연결된 장치
              console.log(peripheralInfo); // 이 정보로 코딩
              var service = '13333333-3333-3333-3333-333333333337';
              var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
              // var crustCharacteristic = '13333333-3333-3333-3333-333333330001';
              BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                console.log('Started notification on ' + peripheral.id);
                setTimeout(() => {
                  // BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {});

                  BleManager.write(peripheral.id, service, bakeCharacteristic, [1,10]).then(() => {
                    console.log('Writed 351 temperature, the pizza should be BAKED');
                  });
                }, 500);
              }).catch((error) => {
                console.log('Notification error', error);
              });
            });

          }, 1000);
        }).catch((error) => { // connect .then
          console.log('Connection error', error);
        });
      }
    }
  }

  // // FlatList 조건
  const renderItem = (item:any) => {
    const color = item.connected ? '#00BFFF' : '#F5FFFA';
    return (
      <TouchableHighlight onPress={() => { test(item) }}>
        <View style={{borderWidth: 2, borderColor: '#000', backgroundColor: color, margin: 4}}>
          <Text style={{fontSize: 15, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 1}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 1, paddingBottom: 10}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  
  return (
    <ContainerContainer>
      <Container>
        <View2>
          <Text>
{`"advertising"
    "isConnectable"
    "manufacturerData"
        "CDVType"
        "data"
    "serviceData"
    "serviceUUIDs"
    "txPowerLevel"
"id"
"name"
"rssi"`}
          </Text>
        </View2>

        <View style={{margin: 10}}>
          <Button title="안드 블루투스 권한 요청" onPress={() => {
            androidPermissionBluetooth();
          }} />
        </View>

        <View style={{margin: 10}}>
          <Button title="안드 위치정보 권한 요청" onPress={() => {
            androidPermissionLocation();
          }} />
        </View>

        <View style={{margin: 10}}>
          <Button title="위치정보 요청" onPress={() => {
            getCurrentlocation();
          }} />
        </View>

        <View style={{margin: 10}}>
          <Button title="연결된 장치 찾기" onPress={() => _retrieveConnected() } />
        </View>

        <ButtonContainer>
          <View style={{margin: 5}}>
            <Button title={connectedPeripheral+"\n데이터 요청"} onPress={() => {
              BleManager.write(connectedPeripheral, '13333333-3333-3333-3333-333333333337', '13333333-3333-3333-3333-333333330003', [1,10]).then(() => {
                console.log('Writed 351 temperature, the pizza should be BAKED');            
              });
            }} />
          </View>
        </ButtonContainer>

        <ButtonContainer>
          <View style={{margin: 5}}>
            <Button title={btnScanTitle} onPress={() => _startScan() } />
          </View>
        </ButtonContainer>

        <View style={{margin: 10}}>
          <Button title="new" onPress={() => {
          }} />
        </View>

        <View style={{margin: 10}}>
          <Button title="new" onPress={() => {
          }} />
        </View>

      </Container>

      <Container>
        {(list.length == 0) &&
          <View style={{flex:1, margin: 20}}>
            <Text style={{textAlign: 'center'}}>No peripherals</Text>
          </View>
        }
        <FlatListContainer
          data={list}
          renderItem={({ item }) => renderItem(item) }
          keyExtractor={item => item.id}
          />
      </Container>
    </ContainerContainer>
  );
}

export default App;