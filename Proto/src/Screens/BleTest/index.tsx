import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {
  Platform, PermissionsAndroid, Alert, AppState,
  NativeModules, NativeEventEmitter, } from "react-native";
import BleManager from 'react-native-ble-manager';
import Geolocation from 'react-native-geolocation-service';
import Button from '~/Components/Button';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SafeAreaView = Styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  background-color: #FFF;

`;
const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #AFA;
  margin: 6px;
`;
const View = Styled.View`
  flex: 1;
  border: 1px solid #000;
  border: 2px;
  margin: 2px;
  padding: 2px;
  justify-content: center;
  align-items: center;
`;
const Header = Styled.View`
  height: 20%;
  width: 90%;
  border: 2px solid #000;
  margin: 4px;
  padding: 4px;
  background-color: #FFF;
`;
const HeaderContainer = Styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;`;
const Body = Styled(FlatList)`
  width: 80%;
  margin: 4px;
  padding: 4px;
  background-color: #FFF;
`;
const Footer = Styled.View`
  width: 90%;
  margin: 4px;
  padding: 4px;
  background-color: #AAA;
`;
const Text = Styled.Text`
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
`;
const TextContainer = Styled.Text`
  borderColor: #000;
  borderStyle: solid;
  borderWidth: 1px;
`;
const RowContainer = Styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const TouchableHighlight = Styled.TouchableHighlight`
`;
const TouchableOpacity = Styled.TouchableOpacity`
`;
const Info = Styled.View`
  width:100%;
  align-items: center;
  background-color: #BBF;
  padding: 16px 8px;
`;
const MyLocation = Styled.View`
  width:100%;
  margin-bottom: 16px;
  background-color: #FFF;
`;
const Speed_Time = Styled.View`
  width:100%;
  margin-bottom: 16px;
  background-color: #FFF;
`;
const EyesScore_Direction = Styled.View`
  width:100%;
  margin-bottom: 16px;
  background-color: #FFF;
`;
const Tilt = Styled.View`
  width:100%;
  margin-bottom: 16px;
  background-color: #FFF;
`;
const Camera_Mode = Styled.View`
  width:100%;
  margin-bottom: 16px;
  background-color: #FFF;
`;
const Sensor_Mode = Styled.View`
  width:100%;
  background-color: #FFF;
`;
const Label = Styled.View`
  margin-bottom: 2px;
`;


interface IGeolocation {
  latitude: number;
  longitude: number;
}

const BleTest = () => {
  useEffect(() => {
    console.log("-- BleTest Mount");
  }, []);

  const [scanning, setScanning] = useState<boolean>(false);
  const [peripherals, setPeripherals] = useState(new Map());
  const [appState, setAppState] = useState<string>(AppState.currentState);
  const [raspId, setRaspId] = useState<string>('');

  const [location, setLocation] = useState<IGeolocation>({
    // latitude: 35.896311,
    // longitude: 128.622051
    latitude: 0,
    longitude: 0,
  });

  const [carSpeed, setCarSpeed] = useState<number>(0); // 속도 라이브러리
  const [drivingTime, setDrivingTime] = useState<number>(0); // 백그라운드 타이머 라이브러리
  const [drivingState, setDrivingState] = useState<boolean>(false); // 백그라운드 타이머 라이브러리

  const [leftEyeScore, setLeftEyeScore] = useState<number>(0);
  const [rightEyeScore, setRightEyeScore] = useState<number>(0);
  const [tracking, setTracking] = useState<string>("OFF");

  const [tiltX, setTiltX] = useState<number>(0);
  const [tiltY, setTiltY] = useState<number>(0);
  const [tiltZ, setTiltZ] = useState<number>(0);

  const [cameraX, setCameraX] = useState<number>(0);
  const [cameraY, setCameraY] = useState<number>(0);
  const [autoFocus, setAutoFocus] = useState<boolean>(false);

  const [arduinoState, setArduinoState] = useState<boolean>(false);
  const [reportingTime, setReportingTime] = useState<number>(0);
  const [shock, setShock] = useState<number>(0);

  const RASP_SERVICE_UUID = '13333333-3333-3333-3333-333333333000';
  const RASP_NOTIFY_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333333001';
  const RASP_READ_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333333002';
  const RASP_WRITE_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333333003';
  
  useEffect(() => {
    console.log("BleTest componentDidMount");
    console.log("checkState ->", BleManager.checkState());
    if (Platform.OS === 'android') {
      androidPermissionBluetooth();
      androidPermissionLocation();
    }
    // ReactNative AppState handle
    AppState.addEventListener("change", _testHandleAppStateChange);
    BleManager.start({showAlert: false}); // StartOptions 가능, showAlert->ios

    const testHandlerDiscoverPeripheral = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', _testHandleDiscoverPeripheral );
    const testHandlerStop = bleManagerEmitter.addListener('BleManagerStopScan', _testHandleStopScan );
    const testHandlerDisconnectedPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', _testHandleDisconnectedPeripheral );
    const testHandlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', _testHandleUpdateValueForCharacteristic );

    return () => {
      console.log("BleTest componentWillUnmount");
      testHandlerDiscoverPeripheral.remove();
      testHandlerStop.remove();
      testHandlerDisconnectedPeripheral.remove();
      testHandlerUpdate.remove();
      AppState.removeEventListener("change", _testHandleAppStateChange); // AppState 를 이용한 헨들러 컨트롤
    };
  },[]);

  // ReactNative AppState handle 재연결 부분
  const _testHandleAppStateChange = (nextAppState:any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('!!! App has come to the foreground!')
      // point
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('!!! Connected peripherals: ' + peripheralsArray.length);
      });
    }
    setAppState(nextAppState);
  };

  // 위치 정보 요청
  const getCurrentlocation = () => {
    Geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      console.log('위치 정보를 가져오는데 성공');
      setLocation({latitude, longitude});
      // Alert.alert('latitude = '+latitude+"\nlongitude = "+longitude);
    },
    error => {  
      console.log('위치 정보를 가져오는데 실패');
    });
  };

  // 안드로이드 블루투스 요청
  const androidPermissionBluetooth = () => {
    // android PermissionsAndroid Bluetooth
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
    } else if (Platform.OS === 'ios') {
      Alert.alert('PermissionLocation, Android only');
    }
  };

  // 1. Emitter addListener 장치 검색
  const _testHandleDiscoverPeripheral = (peripheral:any) => {
    console.log('!!! 장치 검색 성공 : ', peripheral.id);
    let _peripherals = peripherals;
    if (!peripheral.name) { // 이름이 없을 경우
      peripheral.name = 'NO NAME';
    }
    _peripherals.set(peripheral.id, peripheral);
    setPeripherals( new Map(_peripherals) );
  };

  // 2. Emitter addListener 장치 검색 취소 BleManagerStopScan 중지되면 실행
  const _testHandleStopScan = () => {
    console.log('!!! Scan stopped');
    setScanning(false);
  };

  // 3. Emitter addListener 연결 취소 됬을 경우
  const _testHandleDisconnectedPeripheral = (data:any) => {
    let _peripherals = peripherals;
    // data 의 peripheral 을 찾아내서 변경
    let _peripheral = _peripherals.get(data.peripheral);
    if (_peripheral) {
      _peripheral.connected = false;
      _peripherals.set(_peripheral.id, _peripheral);
      setPeripherals(new Map(_peripherals));
    }
    console.log('!!! Disconnected from ' + data.peripheral) + '장치 확인바람';
  };

  // 4. Emitter addListener 변경
  const _testHandleUpdateValueForCharacteristic = (data:any) => {
    // 체크하자 value, peripheral, characteristic, service 
    // console.log('> characteristic / peripheral / service / return value');
    try {
      if (!data){

      }
    } catch (error) {
    }
  };

  // Btn -> 스캔
  const _testStartScan = () => {
    if (!scanning) {
      setPeripherals(new Map()); // 기본 장치 값 초기화
      BleManager.scan([], 2, true).then((results) => {
        // JSON.stringify(results, null, 5);
        console.log('=== Scanning ...');
        setScanning(true);
      });
    }
  }
  
  // Btn -> 장치 재연결 자동화
  const _testRetrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log("=== connected peripherals List");
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

  const connectBtn = (peripheral:any) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id).then(() => {
          setRaspId('');
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
              setRaspId(peripheral.id); // 연결된 장치의 상세한 값 검색
              console.log("### retrieveServices");
              console.log(peripheralInfo);

              setTimeout(() => { // 2 setTimeout
                BleManager.startNotification(peripheral.id, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
                  console.log('### Started notification on ' + peripheral.id);
                }).catch((error) => { // startNotification
                  console.log('Notification error', error);
                });
              }, 300); // 2 setTimeout
            });
          }, 500); // 1 setTimeout
        }).catch((error) => { // connect catch
          console.log('Connection error', error);
        });
      }
    }
  };

  const readBtn = () => {
    if(raspId != ''){
      BleManager.read(raspId, RASP_SERVICE_UUID, RASP_READ_CHARACTERISTIC_UUID)
      .then((readData) => {
        // Success code
        console.log('Read : ');
        console.log(readData);
        // console.log('Read: ' + readData[1]);
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
    }
  };

  const writeBtn = (data?:any) => {
    if(raspId != ''){
      // // 'B' array
      const _data = new Uint8Array([1,2,3,4,5,6,7,8,9,10]);
      BleManager.write(raspId, RASP_SERVICE_UUID, RASP_WRITE_CHARACTERISTIC_UUID, _data)
      .then(() => {
        // Success code
        console.log('write : ');
        console.log(_data);
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
    }
  };

  const renderItem = (item:any) => {
    const color = item.connected ? '#00BFFF' : '#F5FFFA';
    return (
      <TouchableHighlight onPress={() => { connectBtn(item) }}>
        <View style={{margin: 10, backgroundColor: color, borderColor: '#000'}}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  const list = Array.from(peripherals.values());
  const btnScanTitle = 'Ble 검색 ('+(scanning?'ON':'OFF')+')';

  return (
    <SafeAreaView>
      <Container>
        <Info>
          <MyLocation>
            <Label style={{alignItems: "center"}}>
              <Text>위치정보 P</Text>
            </Label>
              <Text>위도 : {location.latitude}</Text>
              <Text>경도 : {location.longitude}</Text>
          </MyLocation>
          <Speed_Time>
            <Label style={{alignItems: "center"}}>
              <Text>차량속도, 주행시간 P</Text>
            </Label>
            <Text>속도 : {carSpeed}</Text>
            <Text>시간 : {drivingTime}</Text>
          </Speed_Time>
          <EyesScore_Direction>
            <Label style={{alignItems: "center"}}>
              <Text>졸음점수, 방향 R</Text>
            </Label>
            <Text> >  좌 : {leftEyeScore}</Text>
            <Text> >  우 : {rightEyeScore}</Text>
            <Text> >  방향 : {tracking}</Text>
          </EyesScore_Direction>
          <Tilt>
            <Label style={{alignItems: "center"}}>
              <Text>차량 기울기 A</Text>
            </Label>
            <Text> >  x : {tiltX}</Text>
            <Text> >  y : {tiltY}</Text>
            <Text> >  z : {tiltZ}</Text>
          </Tilt>
          <Camera_Mode>
            <Label style={{alignItems: "center"}}>
              <Text>카메라각도, 초점 A</Text>
            </Label>
            <Text>상하 : {cameraX}</Text>
            <Text>좌우 : {cameraY}</Text>
            <Text>자동초점 : {autoFocus?"ON":"OFF"}</Text>
          </Camera_Mode>
          <Sensor_Mode>
            <Label style={{alignItems: "center"}}>
              <Text>아두이노 센서 상태 A</Text>
            </Label>
            <Text>온오프 : {arduinoState?"ON":"OFF"}</Text>
            <Text> >  신고 카운트 : {reportingTime}</Text>
            <Text> >  차량 충격량 : {shock}</Text>
          </Sensor_Mode>

        </Info>
      </Container>
      <Container>
        <Header>
          <HeaderContainer>
            <Button style={{margin:4}} label={"> "+btnScanTitle} onPress={() => _testStartScan() } />
          </HeaderContainer>
          <HeaderContainer>
            <Button style={{margin:4}} label={"> Ble 재연결"} onPress={() => _testRetrieveConnected() } />
          </HeaderContainer>
          <TextContainer>
            <Text style={{flex:1, fontSize: 20, textAlign: 'center', color: '#333333'}}>connect : {raspId?raspId:'NO'}</Text>
          </TextContainer>
        </Header>
        <Body
          data={list}
          renderItem={({ item }) => renderItem(item) }
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={{justifyContent: 'center', margin: 2, height: 60}}>
              <Text style={{textAlign: 'center'}}>No peripherals</Text>
            </View>
          }
        />
        <Footer>
          <RowContainer>
            <Button style={{margin:2}} label="read" onPress={() => readBtn() } />
            <Button style={{margin:2}} label="write" onPress={() => writeBtn() } />
          </RowContainer>
          <RowContainer>
            <Button style={{margin:2}} label={"Phone"+"\n"+"Info"} onPress={() => {
              getCurrentlocation(); // 위치정보
              Alert.alert("위치정보, 속도 확인");
            }} />
            <Button
              style={drivingState?{margin:2, backgroundColor:"#0F0"}:{margin:2}} 
              label={drivingState?"Driving"+"\n"+"end":"Driving"+"\n"+"start"} 
              onPress={() => {
                setDrivingState(!drivingState);
              }
            } />
          </RowContainer>
          <RowContainer>
            <Button style={{margin:2, paddingTop:4, paddingBottom:4}} label="◀" onPress={() => {
              setCameraX(cameraX-10);
            }} />
            <Button style={{margin:2, paddingTop:4, paddingBottom:4}} label="▶" onPress={() => {
              setCameraX(cameraX+10);
            }} />
          </RowContainer>
          <RowContainer>
            <Button style={{margin:2, paddingTop:4, paddingBottom:4}} label="▼" onPress={() => {
              setCameraY(cameraY-10);
            }} />
            <Button style={{margin:2, paddingTop:4, paddingBottom:4}} label="▲" onPress={() => {
              setCameraY(cameraY+10);
            }} />
          </RowContainer>
          <RowContainer>
            <Button
              style={arduinoState?{margin:2, backgroundColor:"#0F0"}:{margin:2}} 
              label={arduinoState?"Sensor"+"\n"+"On":"Sensor"+"\n"+"Off"}
              onPress={() => {
                setArduinoState(!arduinoState);
              }
            }/>
            <Button
              style={autoFocus?{margin:2, backgroundColor:"#0F0"}:{margin:2}} 
              label={autoFocus?"Focus"+"\n"+"On":"Focus"+"\n"+"Off"}
              onPress={() => {
                setAutoFocus(!autoFocus);
              }
            }/>
          </RowContainer>
          <RowContainer>
            <Button style={{margin:2, paddingTop:8, paddingBottom:8}} label="신고" onPress={() => console.log("C") } />
            <Button style={{margin:2, paddingTop:8, paddingBottom:8}} label="멈춤" onPress={() => console.log("D") } />
          </RowContainer>
        </Footer>
      </Container>
    </SafeAreaView>
  );
};

export default BleTest;
