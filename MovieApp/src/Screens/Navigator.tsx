import {
    createSwitchNavigator,  // 로그인 여부를 판단
    createStackNavigator,   // 영화 리스트 화면에서 상세 페이지
    createAppContainer,     // State, 링크 등을 관리
} from 'react-navigation';
  
import CheckLogin from '~/Screens/CheckLogin';
import Login from '~/Screens/Login';
import MovieHome from '~/Screens/MovieHome';
import MovieDetail from '~/Screens/MovieDetail'

const LoginNavigator = createStackNavigator({
    Login,
});

const MovieNavigator = createStackNavigator({
    MovieHome,
    MovieDetail,
});

const AppNavigator = createSwitchNavigator(
    {
        CheckLogin,
        LoginNavigator,
        MovieNavigator,
    },
    {
        initialRouteName: 'CheckLogin',
    }
);

export default createAppContainer(AppNavigator);