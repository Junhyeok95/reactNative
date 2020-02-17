/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App'; // 첫 번째로 렌더링 되는 컴포넌트인 App.js
import {name as appName} from './app.json'; // 기본적으로 프로젝트를 생성할 때 자동으로 생성, 연결됨

// .네티이브 브릿지에서 사용할 모듈을 지정 ( 모듈 이름 지정, 렌더링(화면에 표시) 될 컴포넌트 )
AppRegistry.registerComponent(appName, () => App);
