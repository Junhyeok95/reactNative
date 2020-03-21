import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ActivityIndicator } from 'react-native';
import Styled from 'styled-components/native';

import { Alert } from 'react-native';

const Container = Styled.View`
    flex: 1;
    background-color: #8CD3C5;
    justify-content: center;
    align-items: center;
`;

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const CheckLogin = ({ navigation }: Props) => {
    AsyncStorage.getItem('loginKey')
        .then(value => {
            if (value) {
                setTimeout(() => {
                    navigation.navigate('KurumaNavigator');
                }, 1000);
            } else {
                setTimeout(() => {
                    navigation.navigate('LoginNavigator');
                }, 1000);
                setTimeout(() => {
                    Alert.alert("로그인 하자");
                }, 1000);
            }
        })
        .catch((error: Error) => {
            console.log(error);
        });

    return (
        <Container>
            <ActivityIndicator size="large" color="#DEDEDE" />
        </Container>
    );
};

// 이것을 이용해서 네비게이션 헤더를 없에서 깔끔하게 표기한다
CheckLogin.navigationOptions = {
  header: null,
};

export default CheckLogin;
