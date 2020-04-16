import React, {useEffect} from 'react';
import Styled from 'styled-components/native';
import BluetoothList from '~/Screens/BluetoothList';
import BluetoothList2 from '~/Screens/BluetoothList2';
import { StyleSheet, Text, View, Platform, 
  NativeModules, NativeEventEmitter, PermissionsAndroid, Button } from "react-native";


import BleManager from 'react-native-ble-manager';

const Container = Styled.View`
  flex: 2;
`;

const requestCameraPermission = async () => {
  if(Platform.OS === "android"){
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "CAMERA",
            message: "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("BLUETOOTH");
          } else {
            console.log("BLUETOOTH");
          }
        } catch (err) {
          console.warn(err);
        }
        // try {
        //   const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
        //     {
        //       title: "BLUETOOTH_ADMIN",
        //     message:
        //     "Cool Photo App needs access to your camera " +
        //     "so you can take awesome pictures.",
        //     buttonNeutral: "Ask Me Later",
        //     buttonNegative: "Cancel",
        //     buttonPositive: "OK"
        //   }
        //   );
        //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     console.log("BLUETOOTH_ADMIN");
        //   } else {
        //     console.log("BLUETOOTH_ADMIN");
        //   }
        // } catch (err) {
        //   console.warn(err);
        // }
        // try {
        //   const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        //     {
        //       title: "ACCESS_COARSE_LOCATION",
        //     message:
        //     "Cool Photo App needs access to your camera " +
        //     "so you can take awesome pictures.",
        //     buttonNeutral: "Ask Me Later",
        //     buttonNegative: "Cancel",
        //     buttonPositive: "OK"
        //   }
        //   );
        //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     console.log("ACCESS_COARSE_LOCATION");
        //   } else {
        //     console.log("ACCESS_COARSE_LOCATION");
        //   }
        // } catch (err) {
        //   console.warn(err);
        // }
  } else if (Platform.OS === "ios"){
    console.log("ios Permission");
  }
};

const BleManageraa = async () => {
  if(Platform.OS === "android"){
    try {
          const BleManagerModule = NativeModules.BleManager;
          console.log("야호");
          console.log(BleManagerModule);
          const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
          console.log("야호2");
          console.log(bleManagerEmitter);
    } catch (err) {
      console.warn(err);
    }
  } else if (Platform.OS === "ios"){
    console.log("ios BleManageraa");
    const BleManagerModule = NativeModules.BleManager;
    console.log(BleManagerModule);
    const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
    console.log(bleManagerEmitter);
    console.log("ios");
  }
};


const btt = () => {

  async function androidPermissionCheckPermission() {
    const granted3 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "BLUETOOTH_ADMIN",
        message: "퍼미션을 BLUETOOTH_ADMIN",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    if (granted3 === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('BLUETOOTH_ADMIN 있음')
    } else {
      console.log('BLUETOOTH_ADMIN 퍼미션 거부fd');
      console.log('매니패스트 등록 안됬을 경우');
    }
  }
  if (Platform.OS === 'android') {
    androidPermissionCheckPermission();
    console.log('BLUETOOTH_ADMIN 퍼미션 거부zzz');
  } else {
  }

}


const androidPermissionCheck = () => {

  async function androidPermissionCheckPermission() {
    const granted3 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "ACCESS_FINE_LOCATION",
        message: "퍼미션을 설정하시겠습니까",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    if (granted3 === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('위치검색 퍼미션 있음')
    } else {
      console.log('퍼미션 거부fd');
    }
  }
  if (Platform.OS === 'android') {
    androidPermissionCheckPermission();
    console.log('퍼미션 거부zzz');
  } else {
  }

}

const call = async () => {
  try {
    // 권한을 요청한다.
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
            title: 'Call Log 예제',
            message: 'call logs 엑세스 허용하시겠습니까?',
            buttonNeutral: '나중에 물어보기',
            buttonNegative: '아뇨',
            buttonPositive: '예',
        }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        // call log를 가지고 온다.
        CallLogs.load(5).then(callLog => {
            console.log(callLog)
        });
    } else {
        console.log('Call Log permission denied');
    }
  }
  catch (e) {
      console.log(e);
  }

}
  
const App = () => {
  useEffect(() => {
    
  },[]);
  return (
    <Container>
      <BluetoothList />
      {/* <BluetoothList2 /> */}
      <View style={styles.container}>
        <Text style={styles.item}>Try permissions</Text>
        <Button title="request BleManager !" onPress={BleManageraa} />
      <Text style={styles.item}>Try permissions</Text>
        <Button title="camera btt" onPress={btt} />
        <Text style={styles.item}>Try permissions</Text>
        <Button title="request permissions !" onPress={androidPermissionCheck} />
        <Text style={styles.item}>Try permissions</Text>
        <Button title="call" onPress={call} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default App;
