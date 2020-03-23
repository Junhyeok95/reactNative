import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';

import InfoList from './InfoList';
import SubList from './SubList';

const Container = Styled.ScrollView`
    flex: 1;
    background-color: #8CD3C5;
`;

const StyleButton = Styled.TouchableOpacity`
    padding: 8px;
`;
const Icon = Styled.Image`
`;
const Label = Styled.Text`
    color: #FFFFFF;
`;

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const Home = ({ navigation }: Props) => {
    const _logout = () => {
        AsyncStorage.removeItem('LoginKey'); // 세션 관리하자
        navigation.navigate('LoginNavigator'); // 로그아웃 후 로그인 창으로 이동
    };

    useEffect(() => {
        navigation.setParams({
            // 렌더링 후 로그인이 됬으니까 로그아웃에다가 어떤 함수를 설정할지 입력해 놓은 것
            // 이렇게 매개변수를 설정하면 navigation을 사용하는 모든 부분에서 활용가능
            logout: _logout,
        });
    }, []);

    return (
        <Container>
            <InfoList
                url="JMT"
                // 매개변수로 전달 할 뿐 Props .. 실행은 다른 컴포넌트가 한다
                onPress={(id: number) => {
                    navigation.navigate('HomeDetail', {
                        id,
                    });
                }}
            />
            <SubList
                title="비상연락망"
                url="1"
                onPress={(id: number) => {
                    navigation.navigate('HomeDetail', {
                        id,
                });
                }}
            />
        </Container>
    );
};

/*
    <InfoList
        url="0"
        onPress={(id: number) => {
            navigation.navigate('HomeNavigator', {
                id,
            });
        }}
    />

    <SubCatalogList
        title="비상연락망"
        url="1"
        onPress={(id: number) => {
            navigation.navigate('MovieDetail', {
                id,
        });
        }}
    />
    <InfoList
        title="의료 정보"
        url="2"
        onPress={(id: number) => {
            navigation.navigate('MovieDetail', {
                id,
            });
        }}
    />
    <SubCatalogList
        title="손해보험사"
        url="3"
        onPress={(id: number) => {
            navigation.navigate('MovieDetail', {
                id,
            });
        }}
    /> 
*/

interface INaviProps {
    navigation: NavigationScreenProp<NavigationState>;
}

Home.navigationOptions = ({ navigation }: INaviProps) => {
    const logout = navigation.getParam('logout'); // setParam('logout') 으로 저장해둔 값을 가저옴
    return {
        headerTitle: 'STACK',
        headerTintColor: '#FFFFFF',
        headerBackTitle: "string",
        headerStyle: {
            backgroundColor: '#446784',
            borderBottomWidth: 10,
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        backTitleVisible: false, // 투명화
        headerRight: (
            <StyleButton
                onPress={() => {
                    if (logout && typeof logout === 'function') {
                        logout();
                    }
                }}>
                <Icon source={require('~/Assets/Images/ic_logout.png')} />
            </StyleButton>            
        )
    };
};

export default Home;
