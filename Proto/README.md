# 영진전문대학 WDJ6 캡스톤 APP

## 실행
```
npx react-native run-ios / npx react-native run-android
```

## 오류 발생 시
```
npx react-native start --reset-cache
```
```
react-native unlink react-native-gesture-handler / pod install
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
npm install --save-dev @types/react-native-vector-icons // 수동 연결
```