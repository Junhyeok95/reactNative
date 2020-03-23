import React from 'react';
import { Dimensions } from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity``;
const CatalogImage = Styled.Image``;
const InfoContainer = Styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    align-items: flex-start;
`;
const LabelYear = Styled.Text`
    background-color: #E70915;
    color: #FFFFFF;
    padding: 4px 8px;
    margin-left: 4px;
    margin-bottom: 4px;
    font-weight: bold;
    border-radius: 4px;
`;
const SubInfoContainer = Styled.View`
`;
const Background = Styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #141414;
    opacity: 0.9;
`;
const LabelTitle = Styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
    padding: 8px 16px 4px 16px;
`;
const LabelGenres = Styled.Text`
    font-size: 12px;
    color: #FFFFFF;
    padding: 4px 16px 8px 16px;
`;

interface Props {
    id: number;
    // image: string;
    // year: number;
    // title: string;
    // genres: Array<string>;
    onPress?: (id: number) => void; // ? 를 통해서 넣어도 안넣어도 상관없다
}

const Info = ({
    // id, image, year, title, genres,
    id, 
    onPress
}: Props) => {
    return (
        <>
            <Container
                activeOpacity={1}
                onPress={() => {
                    if (onPress && typeof onPress === 'function') {
                        onPress(1);
                    }
                }}>
                <CatalogImage
                    // source={{ uri: image }}
                    source={require('~/Assets/Images/add.png')}
                    style={{ width: Dimensions.get('window').width, height: 300 }} // 사이즈 적용 필수
                    />
                <InfoContainer>
                    <LabelYear>개봉</LabelYear>
                    <SubInfoContainer>
                        <Background />
                        <LabelTitle>제목</LabelTitle>
                        <LabelGenres>장르</LabelGenres>
                    </SubInfoContainer>
                </InfoContainer>
            </Container>
            {/* <Container
                activeOpacity={1}
                onPress={() => {
                    if (onPress && typeof onPress === 'function') {
                        onPress(1); // 앞 앞에서 받은 함수를 실행시킨다
                        // 왜냐 함수를 전달한게 아닌 매개변수로 받은 함수를 버튼이 반응하면 실행하니까
                    }
                }}>
                <CatalogImage
                    // source={{ uri: image }}
                    source={require('~/Assets/Images/add.png')}
                    style={{ width: Dimensions.get('window').width, height: 300 }} // 사이즈 적용 필수
                    />
                <InfoContainer>
                    <LabelYear>개봉</LabelYear>
                    <SubInfoContainer>
                        <Background />
                        <LabelTitle>제목</LabelTitle>
                        <LabelGenres>장르</LabelGenres>
                    </SubInfoContainer>
                </InfoContainer>
            </Container> */}
        </>
    );
};

export default Info;
