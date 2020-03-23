import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Styled from 'styled-components/native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import Info from '~/Components/Info';
import CastList from './CastList'; // 배역
import ScreenShotList from './ScreenShotList'; // 스크린샷

const Container = Styled.ScrollView`
    flex: 1;
    background-color: #141414;
`;
const LoadingContainer = Styled.View`
    flex: 1;
    background-color: #141414;
    align-items: center;
    justify-content: center;
`;

const ContainerTitle = Styled.Text`
    font-size: 16px;
    color: #FFFFFF;
    font-weight: bold;
    padding: 24px 16px 8px 16px;
`;
const DescriptionContainer = Styled.View``;
const Description = Styled.Text`
    padding: 0 16px;
    color: #FFFFFF;
`;
const SubInfoContainer = Styled.View``;
const InfoContainer = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px;
`;
const LabelInfo = Styled.Text`
    color: #FFFFFF;
`;

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const HomeDetail = ({ navigation }: Props) => {
    // const [data, setData] = useState<IMovieDetail>();
    const [data, setData] = useState<Array<string>>(["마","지","막"]);
    const myCast = ["W","D","J"];

    useEffect(() => {
        const id = navigation.getParam('id'); // 전달받은 Param으로 값을 새로 조회
    //     fetch(
    //         `https://yts.lt/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`
    //     )
    //         .then(response => response.json())
    //         .then(json => {
    //             console.log(json);
    //             setData(json.data.movie);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    }, []);

    return data ? (
        // 데이터가 있으면 이거 제이선으로 받아와서 실행하면 위에꺼
        // 삼항 연산자를 이용해서 리엑트 특징을 살린 코딩이군요 !
        <Container>
            <Info
                id={2}
                // image={data.large_cover_image}
                // year={data.year}
                // title={data.title}
                // genres={data.genres}
                // 함수를 할당하지 않아도 괜찮음
            />
            <SubInfoContainer>
                <ContainerTitle>영화 정보</ContainerTitle>
                <InfoContainer>
                    <LabelInfo>분</LabelInfo>
                    <LabelInfo>평점: </LabelInfo>
                    <LabelInfo>좋아요: </LabelInfo>
                </InfoContainer>
            </SubInfoContainer>
            <DescriptionContainer>
                <ContainerTitle>줄거리</ContainerTitle>
                <Description>data.description_full</Description>
            </DescriptionContainer>
            {// cast란 ? 배역 ... ㅎㅎ ; 
            }            
            { true && <CastList cast={myCast} />}
            <ScreenShotList
                images={[
                    require('~/Assets/Images/remove.png'),
                    require('~/Assets/Images/remove.png'),
                    require('~/Assets/Images/remove.png'),
                ]}
            />
        </Container>
    ) : (
        <LoadingContainer>
            <ActivityIndicator size="large" color="#E70915" />
        </LoadingContainer>
    );
};

HomeDetail.navigationOptions = {
    title: 'HomeDetail',
    headerTintColor: '#E70915',
    headerStyle: {
        backgroundColor: '#141414',
        borderBottomWidth: 0,
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export default HomeDetail;
