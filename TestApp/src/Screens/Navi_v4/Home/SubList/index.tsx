import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import Styled from 'styled-components/native';

const Container = Styled.View`
    margin: 8px 0px;
`;
const InfoContainer = Styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 16px;
`;
const Title = Styled.Text`
    font-size: 16px;
    color: #FFFFFF;
    font-weight: bold;
`;
const SubContainer = Styled.View`
    height: 201px;
`;
const SubLiImageContainer = Styled.TouchableOpacity`
    padding: 0px 4px;
`;
const SubImage = Styled.Image`
`;

interface Props {
    title: string;
    url: string;
    onPress: (id: number) => void;
}

const SubList = ({ title, url, onPress }: Props) => {
    // const [data, setData] = useState<Array<IMovie>>([]);
    const [data, setData] = useState<Array<string>>(["하나","둘","삼"]);


    // useEffect(() => {
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(json => {
    //             console.log(json);
    //             setData(json.data.movies);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <Container>
            <InfoContainer>
                <Title>{title}</Title>
            </InfoContainer>
            <SubContainer>
                <FlatList
                    horizontal={true}
                    data={data}
                    keyExtractor={(item, index) => {
                        // return `catalogList-${(item as IMovie).id}-${index}`;
                        return `subList-${index}`;
                    }}
                    renderItem={({ item, index }) => (
                        <SubLiImageContainer
                            activeOpacity={1}
                            onPress={() => {
                                // onPress((item as IMovie).id);
                                onPress(1);
                                // 받은 함수를 이 함수를 통해서 콜백으로 실행시킨다
                            }}>
                            <SubImage
                                // source={{ uri: (item as IMovie).large_cover_image }}
                                source={require('~/Assets/Images/remove.png')}
                                style={{ width: 136, height: 201 }}
                            />
                        </SubLiImageContainer>
                    )}
                />
            </SubContainer>
        </Container>
    );
};

export default SubList;
