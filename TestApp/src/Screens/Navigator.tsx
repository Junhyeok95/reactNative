import {
    createAppContainer,     // State, 링크 등을 관리
    createSwitchNavigator,  // 로그인 여부를 판단
} from 'react-navigation';

import {
    createStackNavigator,   // 상세 페이지
} from 'react-navigation-stack';

import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';

// 이걸 늘리자
import Home from '~/Screens/Home';
// import KurumaDetail from '~/Screens/KurumaDetail';

const LoginNavigator = createStackNavigator({
    Login, // 로그인 + 회원 가입
});

const HomeNavigator = createStackNavigator({
    Home,
});

const AppNavigator = createSwitchNavigator(
    {
        CheckLogin, // 로그인 체크하는 빙글빙글 도는 화면 / 값확인 중, use Hooks 이용해서 서버와 통신 세션유지
        LoginNavigator, // 로그인을 할 화면
        HomeNavigator,
    },
    {
        initialRouteName: 'CheckLogin',
    }
);

// State를 관리하기에 마지막에는 이렇게 createApp으로 감싼다
export default createAppContainer(AppNavigator);
  