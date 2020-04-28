import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {
  Platform, PermissionsAndroid, Alert, AppState,
  NativeModules, NativeEventEmitter, } from "react-native";
import BleManager from 'react-native-ble-manager';
import Geolocation from 'react-native-geolocation-service';
import Button from '~/Components/Button';
import {stringToBytes} from 'convert-string';
import {Buffer} from 'buffer';

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
  height: 27%;
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
  flex: 1;
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
const MyCnt = Styled.View`
  width:100%;
  margin-bottom: 16px;
  background-color: #FFF;
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
  
  const [myCnt, setMyCnt] = useState<number>(-1);

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
  const [isReport, setIsReport] = useState<boolean>(false);
  const [reportingTime, setReportingTime] = useState<number>(0);
  const [shock, setShock] = useState<number>(0);

  const RASP_SERVICE_UUID = '13333333-3333-3333-3333-333333330000';
  const RASP_NOTIFY_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333330001';
  const RASP_READ_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333330002';
  const RASP_WRITE_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333330003';
  const RASP_MOVE_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333330004';
  const RASP_STATE_CHARACTERISTIC_UUID = '13333333-3333-3333-3333-333333330005';
  
  useEffect(() => {
    console.log("raspId");
    console.log(raspId);
    console.log(typeof(raspId));

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

    if (Platform.OS === 'android') {
      androidPermissionBluetooth();
      androidPermissionLocation();
    }

    return () => {
      console.log("un ################################");
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
      Alert.alert('latitude = '+latitude+"\nlongitude = "+longitude);
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
    console.log('>>>>>>>>>>>>>>>>>>>>>>> ' + data.peripheral);

    BleManager.stopNotification(data.peripheral, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
      console.log('>> _testHandleDisconnected stopNotification off ' + data.peripheral);
    }).catch((error) => { // startNotification
      console.log('>> _testHandleDisconnected fication error', error);
    });
    let _peripherals = peripherals;
    let _peripheral = _peripherals.get(data.peripheral);
    if (_peripheral) {
      _peripheral.connected = false;
      _peripherals.set(_peripheral.id, _peripheral);
      setPeripherals(new Map(_peripherals));
    }
    setRaspId('');
    console.log('>>> Disconnected from ' + data.peripheral);
  };

  // 4. Emitter addListener 변경
  const _testHandleUpdateValueForCharacteristic = (data:any) => {
    try {
      if (data){
        console.log(data.value);
        setMyCnt(data.value[0]);
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
    // off
    setArduinoState(false);
    setCameraX(0);
    setCameraY(0);
    setAutoFocus(false);
    setIsReport(false);
    // off
    if (peripheral){
      if (peripheral.connected){
        BleManager.stopNotification(peripheral.id, RASP_SERVICE_UUID, RASP_NOTIFY_CHARACTERISTIC_UUID).then(() => {
          console.log('### stopNotification off ' + peripheral.id);
        }).catch((error) => { // startNotification
          console.log('Notification error', error);
        });
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
            setPeripherals(new Map(_peripherals));
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
  const buf = Buffer.allocUnsafe(5);
  buf.writeUInt8(1,0);
  buf.writeUInt8(200,1);
  buf.writeUInt8(255,2);
  console.log(buf);
  
  const testData22 = stringToBytes("0123");
  console.log(testData22);
  
  const writeBtn = (data?:any) => {
    // let bu = Buffer(3); -> node 식
    // bu.writeInt8(10, 0);
    if(raspId != ''){
      // // 'b' array
      const testData = stringToBytes("00001111");
      const test = [2,2,2,2,3,3,-1]

      BleManager.write(raspId, RASP_SERVICE_UUID, RASP_WRITE_CHARACTERISTIC_UUID, testData)
      .then(() => {
          BleManager.write(raspId, RASP_SERVICE_UUID, RASP_WRITE_CHARACTERISTIC_UUID, test)
          .then(() => {
            // Success code
          })
          .catch((error) => {
            // Failure code
            console.log(error);
          });
      })
      .catch((error) => {
      });
    }
  };

  const moveBtn = (data?:any) => {
    /*
      0 -> H 좌
      1 -> J 하
      2 -> K 상
      3 -> L 우
    */
    if(raspId != ''){
      const _data = stringToBytes(""+data);
      BleManager.write(raspId, RASP_SERVICE_UUID, RASP_MOVE_CHARACTERISTIC_UUID, _data)
      .then(() => {
        console.log('write : '+_data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const stateBtn = (data?:any) => {
    /*
      0 -> Ardu
      1 -> Focus
      라즈베리에서 트리거 ... 방법을 모르곘음
    */
    if(raspId != ''){
      const _data = stringToBytes(""+data);
      BleManager.write(raspId, RASP_SERVICE_UUID, RASP_STATE_CHARACTERISTIC_UUID, _data)
      .then(() => {
        console.log('write : '+_data);
      })
      .catch((error) => {
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
          <MyCnt style={{alignItems: "center"}}>
            <Text>연결상태 : {myCnt}</Text>
          </MyCnt>
          <MyLocation>
            <Label style={{alignItems: "center"}}>
              <Text>위치정보 P</Text>
            </Label>
              <Text style={{fontSize: 11}}>위도 : {location.latitude}</Text>
              <Text style={{fontSize: 11}}>경도 : {location.longitude}</Text>
          </MyLocation>
          <Speed_Time>
            <Label style={{alignItems: "center"}}>
              <Text>차량속도, 주행시간 P</Text>
            </Label>
            <Text>속도 : {carSpeed}</Text>
            <Text>시간 : {drivingTime}</Text>
            <Text
              style={drivingState?{color:"#0F0"}:{}}
            >운전 : {drivingState?"start":"end"}</Text>
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
            <Text
              style={autoFocus?{color:"#0F0"}:{}}
            >자동초점 : {autoFocus?"ON":"OFF"}</Text>
          </Camera_Mode>
          <Sensor_Mode>
            <Label style={{alignItems: "center"}}>
              <Text>아두이노 상태 A</Text>
            </Label>
            <Text
              style={arduinoState?{color:"#0F0"}:{}}
            >온오프 : {arduinoState?"ON":"OFF"}</Text>
            <Text
              style={isReport?{color:"#F00"}:{}}
            > >  신고 상태 : {isReport?"ON":"OFF"}</Text>
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
            <Text style={{flex:1, fontSize: 20, textAlign: 'center', color: '#333333'}}>connect : {raspId==''?'NO ID':raspId}</Text>
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
              // Alert.alert("위치정보, 속도 확인");
            }} />
            <Button
              style={drivingState?{margin:2, backgroundColor:"#0F0"}:{margin:2}}
              label={drivingState?"Driving"+"\n"+"start":"Driving"+"\n"+"end"} 
              onPress={() => {
                setDrivingState(!drivingState);
              }
            } />
          </RowContainer>
          <RowContainer>
            <Button style={{margin:2, paddingTop:4, paddingBottom:4}} label="◀" onPress={() => {
              if(!arduinoState){
                Alert.alert("Arduino On 필요");
              } else {
                setCameraX(cameraX-10);
                moveBtn(0);
              }
            }} />
            <Button style={{margin:2, paddingTop:4, paddingBottom:4}} label="▶" onPress={() => {
              if(!arduinoState){
                Alert.alert("Arduino On 필요");
              } else {
                setCameraX(cameraX+10);
                moveBtn(3);
              }
            }} />
          </RowContainer>
          <RowContainer>
            <Button style={{margin:2, paddingTop:4, paddingBottom:4}} label="▼" onPress={() => {
              if(!arduinoState){
                Alert.alert("Arduino On 필요");
              } else {
                setCameraY(cameraY-10);
                moveBtn(1);
              }
            }} />
            <Button style={{margin:2, paddingTop:4, paddingBottom:4}} label="▲" onPress={() => {
              if(!arduinoState){
                Alert.alert("Arduino On 필요");
              } else {
                setCameraY(cameraY+10);
                moveBtn(2);
              }
            }} />
          </RowContainer>
          <RowContainer>
            <Button
              style={arduinoState?{margin:2, backgroundColor:"#0F0"}:{margin:2}} 
              label={arduinoState?"Ardu"+"\n"+"On":"Ardu"+"\n"+"Off"}
              onPress={() => {
                if(raspId != ''){
                  setArduinoState(!arduinoState);
                  if(arduinoState){
                    setCameraX(0);
                    setCameraY(0);
                    setAutoFocus(false);
                    setIsReport(false);
                  }
                  stateBtn(0);
                } else{
                  Alert.alert("Rasp On 필요");
                }
              }
            }/>
            <Button
              style={autoFocus?{margin:2, backgroundColor:"#0F0"}:{margin:2}} 
              label={autoFocus?"Focus"+"\n"+"On":"Focus"+"\n"+"Off"}
              onPress={() => {
                if(!arduinoState){
                  Alert.alert("Arduino On 필요");
                } else{
                  setAutoFocus(!autoFocus);
                  stateBtn(1);
                }
              }
            }/>
          </RowContainer>
          <RowContainer>
            <Button 
              style={isReport?{margin:2, paddingTop:8, paddingBottom:8, backgroundColor:"#F00"}:{margin:2, paddingTop:8, paddingBottom:8}}
              label="신고" 
              onPress={() => {
                stateBtn(2);
                setIsReport(true);
              }}/>
            <Button
              style={isReport?{margin:2, paddingTop:8, paddingBottom:8, backgroundColor:"#000"}:{margin:2, paddingTop:8, paddingBottom:8}}
              color={isReport?"#FFF":"#000"}
              label="멈춤" 
              onPress={()  => {
                stateBtn(3);
                setIsReport(false);
              }}/>
          </RowContainer>
        </Footer>
      </Container>
    </SafeAreaView>
  );
};

export default BleTest;
