## 아이콘, 스플래쉬
```
npm install --save-dev @bam.tech/react-native-make
npm install --save react-native-splash-screen
react-native set-splash --path ./splash.png --resize center --background "#FFFFFF"
react-native set-icon --path ./icon.png --background "#FFFFFF"
```
## 타입스크립트, 바벨
```
npm install --save styled-components
npm install --save-dev typescript @types/react @types/react-native @types/styled-components babel-plugin-root-import
tsconfig.json /babel.config.js
```
## 네비
```
npm install --save @react-navigation/native
npm install --save react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install --save @react-navigation/stack
```
## 위치정보, 맵, 블루투스
```
npm install --save react-native-geolocation-service
npm install --save react-native-maps
npm install --save react-native-ble-manager
```
# BLE 권한 AndroidManifest.xml / Info.plist
```
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<key>NSBluetoothAlwaysUsageDescription</key>
<key>UIBackgroundModes</key>
```
# 읽기 쓰기, 저장
```
npm install --save @react-native-community/async-storage
npm install --save buffer convert-string
```