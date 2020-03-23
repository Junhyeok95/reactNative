import {
    createAppContainer,     // State, 링크 등을 관리
    createSwitchNavigator,  // 로그인 여부를 판단
} from 'react-navigation';

import {
    createStackNavigator,   // 상세 페이지
} from 'react-navigation-stack';

import CheckLogin from '~/Screens/Navi_v4/Login/CheckLogin';
import Login from '~/Screens/Navi_v4/Login';

// 이걸 늘리자
import Home from '~/Screens/Navi_v4/Home';
import HomeDetail from '~/Screens/Navi_v4/HomeDetail';

const LoginNavigator = createStackNavigator({
    Login, // 로그인 + 회원 가입
});

const HomeNavigator = createStackNavigator({
    Home,
    HomeDetail,
});

const AppNavigator = createSwitchNavigator(
    {
        CheckLogin, // 로그인 체크하는 빙글빙글 도는 화면 / 값확인 중, use Hooks 이용해서 서버와 통신 세션유지
        LoginNavigator, // 로그인을 할 화면
        HomeNavigator,
    },
    {
        initialRouteName: 'CheckLogin', // 처음 로드할 때 초기의 탭 경로에 대한 routeName
        // backBehavior 뒤로가기 버튼을 눌렀을 때, 초기 경로로 전환될지의 여부 / 디폴트는 node
    }
);

// State를 관리하기에 마지막에는 이렇게 createApp으로 감싼다
export default createAppContainer(AppNavigator);
  