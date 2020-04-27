# 영진전문대학 WDJ6 캡스톤 APP

## 실행
```
npx react-native run-ios / npx react-native run-android
npx react-native run-ios --simulator="iPhone 11"
```

## 오류 발생 시
```
npx react-native start --reset-cache
```
```
react-native unlink react-native-gesture-handler / pod install
```
```
# NPM
watchman watch-del-all
npm cache clean
cd android && ./gradlew clean
```

### 라이브러리 설치
```
npm install --save styled-components
npm install --save-dev typescript babel-plugin-root-import
npm install --save-dev @types/react @types/react-native @types/styled-components
```
```
tsconfig.json / babel.config.js
```
```
npm install --save @react-navigation/native
npm install --save react-native-reanimated react-native-gesture-handler
npm install --save react-native-screens react-native-safe-area-context
npm install --save @react-native-community/masked-view @react-navigation/stack
npm install --save @react-navigation/drawer @react-navigation/bottom-tabs
npm install --save @react-navigation/material-top-tabs react-native-tab-view
npm install --save @react-native-community/async-storage
npm install --save react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons // self connection
```
```
npm install -g yo generator-rn-toolbox
brew install imagemagick
yo rn-toolbox:assets --icon ./src/Assets/Images/[icon.png] // 1024x1024 png
yo rn-toolbox:assets --splash ./src/Assets/Images/[splash.psd] // 2208x2208 psd
```
```
npm install --save-dev react-native-dotenv
npm uninstall --save-dev @types/react-native-dotenv
npm install --save react-native-geolocation-service react-native-maps
```
```
npm i --save react-native-ble-manager
<uses-permission android:name="android.permission.XXX>
npm install --save convert-string
```
```
npm --save install @types/convert-string
```