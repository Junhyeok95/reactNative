# geolocation / maps -> /ios/__/Info.plist
<key>NSLocationWhenInUseUsageDescription</key>
<string>permissions</string>
<key>NSBluetoothAlwaysUsageDescription</key> // add this line
<string>permissions</string> // add this line

# geolocation / maps    Android
react-native link react-native-maps




# vicon / splash    ios   /ios/__/AppDelegate.m
[RNSplashScreen show]; // add this line
return YES;

# vicon / splash    Android
react-native link react-native-splash-screen




# vector-icons    ios   /ios/__/Info.plist
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Zocial.ttf</string>
  <string>Fontisto.ttf</string>
</array>

# vector-icons    Android   android/app/build.gradle
apply from: "../../node_modules/react-native/react.gradle"
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" // add this line