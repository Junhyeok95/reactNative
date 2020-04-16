import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  FlatList,
  Dimensions,
  Button,
  SafeAreaView
} from 'react-native';

import {
  Platform, PermissionsAndroid, Alert, AppState,
  NativeModules, NativeEventEmitter, } from "react-native";

import BleManager from 'react-native-ble-manager';

const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const View2 = Styled.View`
  margin: 4px;
  padding: 8px;
  border: 1px solid #000;
  backgroundColor: #FFF;
`;


const App = () => {
  const createThreeButtonAlert = (a, b, c) =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg \nisConnectable ===> "+a+"\nserviceUUIDs ===> "+b+"\nid ===> "+c,
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

  console.log("init--------------------------------------");


  const [scanning, setScanning] = useState<boolean>(false);
  const [peripherals, setPeripherals] = useState<any>(new Map());
  const [appState, setAppState] = useState<string>(AppState.currentState);

  console.log("type of function");
  console.log("_handleDiscoverPeripheral ~ _handleAppStateChange");
  const _handleDiscoverPeripheral = (peripheral:any) => {
    // 발견 시 state peripheral 셋팅, 화면 렌더링
    let _peripherals = peripherals;
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    _peripherals.set(peripheral.id, peripheral);
    setPeripherals( _peripherals );
  };
  const _handleStopScan = () => {
    // sacn 후 호출
    console.log('Scan is stopped');
    setScanning(false);
  };
  const _handleUpdateValueForCharacteristic = (data:any) => {
    console.log('Test ~!');
    console.log(data);
    console.log('Test ~!');
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  };
  const _handleDisconnectedPeripheral = (data:any) => {
    let _peripherals = peripherals;
    // data 의 peripheral 을 찾아내서 변경
    let _peripheral = _peripherals.get(data.peripheral);
    if (_peripheral) {
      _peripheral.connected = false;
      _peripherals.set(_peripheral.id, _peripheral);
      setPeripherals({_peripherals});
    }
    console.log('Disconnected from ' + data.peripheral);
  };

  // ReactNative AppState handle
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

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange); // ReactNative AppState handle

    BleManager.start({showAlert: false}); // StartOptions

    console.log("type of object");
    console.log("handlerDiscover ~ handlerUpdate");
    // Scanning 함수, Options 가능
    const handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', _handleDiscoverPeripheral );
    const handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', _handleStopScan );
    const handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', _handleDisconnectedPeripheral );
    const handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', _handleUpdateValueForCharacteristic );

    // android PermissionsAndroid ACCESS_COARSE_LOCATION
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
      });
    }

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange); // AppState 를 이용한 헨들러 컨트롤

      console.log("componentWillUnmount ... type of object");
      handlerDiscover.remove();
      handlerStop.remove();
      handlerDisconnect.remove();
      handlerUpdate.remove();
    };

  },[]);

  // Scanning -> Btn
  const _startScan = () => {
    if (!scanning) {
      //this.setState({peripherals: new Map()});
      BleManager.scan([], 10, true).then((results) => {
        JSON.stringify(results, null, 2);
        console.log('Scanning...');
        setScanning(true);
      });
    }
  }

  // Connected Peripherals -> Btn
  const _retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      // 하나하나 연결됬다고 변경
      let _peripherals = peripherals;
      for (var i = 0; i < results.length; i++) {
        let _peripheral = results[i];
        _peripheral.connected = true;
        _peripherals.set(_peripheral.id, _peripheral);
        setPeripherals( _peripherals );
      }
    });
  }

  function test(peripheral:any) {

    createThreeButtonAlert(
      peripheral.advertising.isConnectable,
      peripheral.advertising.serviceUUIDs,
      peripheral.id
    );

    // console.log("isConnectable ===> ", peripheral.advertising.isConnectable);
    // console.log("serviceUUIDs ===> ", peripheral.advertising.serviceUUIDs);
    // console.log("id ===> ", peripheral.id);

    // if (peripheral){
    //   if (peripheral.connected){ // boolean
    //     BleManager.disconnect(peripheral.id);
    //   }else{
    //     BleManager.connect(peripheral.id).then(() => { // 연결시도
    //       let _peripherals = peripherals;
    //       let p = peripherals.get(peripheral.id);
    //       if (p) {
    //         p.connected = true;
    //         _peripherals.set(peripheral.id, p);
    //         setPeripherals(peripherals);
    //       }
    //       console.log('Connected to ' + peripheral.id); // 연결됨


    //       // setTimeout(() => {

    //       //   /* Test read current RSSI value
    //       //   BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
    //       //     console.log('Retrieved peripheral services', peripheralData);

    //       //     BleManager.readRSSI(peripheral.id).then((rssi) => {
    //       //       console.log('Retrieved actual RSSI value', rssi);
    //       //     });
    //       //   });*/

    //       //   // Test using bleno's pizza example
    //       //   // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
    //       //   BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
    //       //     console.log(peripheralInfo);
    //       //     var service = '13333333-3333-3333-3333-333333333337';
    //       //     var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
    //       //     var crustCharacteristic = '13333333-3333-3333-3333-333333330001';

    //       //     setTimeout(() => {
    //       //       BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
    //       //         console.log('Started notification on ' + peripheral.id);
    //       //         setTimeout(() => {
    //       //           BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {
    //       //             console.log('Writed NORMAL crust');
    //       //             BleManager.write(peripheral.id, service, bakeCharacteristic, [1,95]).then(() => {
    //       //               console.log('Writed 351 temperature, the pizza should be BAKED');
    //       //               /*
    //       //               var PizzaBakeResult = {
    //       //                 HALF_BAKED: 0,
    //       //                 BAKED:      1,
    //       //                 CRISPY:     2,
    //       //                 BURNT:      3,
    //       //                 ON_FIRE:    4
    //       //               };*/
    //       //             });
    //       //           });

    //       //         }, 500);
    //       //       }).catch((error) => {
    //       //         console.log('Notification error', error);
    //       //       });
    //       //     }, 200);
    //       //   });

    //       // }, 900);


    //     }).catch((error) => { // connect .then
    //       console.log('Connection error', error);
    //     });
    //   }
    // }


  }

  // FlatList 조건
  const renderItem = (item:any) => {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => {
        test(item);
      }}>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }


  // return 필요 변수
  const list = Array.from(peripherals.values());
  const btnScanTitle = 'Scan Bluetooth (' + (scanning ? 'on' : 'off') + ')';

  console.log("init--------------------------------------");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
          <Button title={btnScanTitle} onPress={() => _startScan() } />
        </View>

        <View style={{margin: 10}}>
          <Button title="Retrieve connected peripherals" onPress={() => _retrieveConnected() } />
        </View>

        <ScrollView style={styles.scroll}>
          {(list.length == 0) &&
            <View style={{flex:1, margin: 20}}>
              <Text style={{textAlign: 'center'}}>No peripherals</Text>
            </View>
          }
          <FlatList
            data={list}
            renderItem={({ item }) => renderItem(item) }
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCC',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
});

export default App;