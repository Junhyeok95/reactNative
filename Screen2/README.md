# Hello

## install

### typescript / styled / babel
```
npm i -S styled-components
npm i -D typescript @types/react @types/react-native @types/styled-components babel-plugin-root-import
```
[ tsconfig.json / babel.config.js ]

### icon / splash
```
npm i -D @bam.tech/react-native-make
npm i -S react-native-splash-screen
```
[ ./Tip/README.md ]
[ react-native set-icon --path ./Tip/icon.png --background "#FFFFFF" ]
[ react-native set-splash --path ./Tip/splash.png --resize center --background "#FFFFFF" ]

### storage / geolocation / maps
```
npm i -S @react-native-community/async-storage
npm i -S react-native-geolocation-service react-native-maps
```

### navigation / vector
```
npm i -S @react-navigation/native
npm i -S react-native-vector-icons react-native-reanimated react-native-gesture-handler
npm i -S react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm i -S @react-navigation/compat @react-navigation/stack @react-navigation/drawer @react-navigation/bottom-tabs
npm i -S @react-navigation/material-top-tabs react-native-tab-view
npm i -S @react-navigation/material-bottom-tabs react-native-paper
npm i -D @types/react-native-vector-icons
```
[ ./Tip/README.md ]
[ Xcode -> New Group -> create Fonts -> node_modules/react-native-vector-icons/Fonts/ Copy, references ->  cmd + shift + k ]
