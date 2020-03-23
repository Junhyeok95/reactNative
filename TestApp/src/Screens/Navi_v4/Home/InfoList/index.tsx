import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import Styled from 'styled-components/native';

import Info from '~/Components/Info';

const Container = Styled.View`
    height: 300px;
    margin-bottom: 8px;
`;

interface Props {
    url: string;
    onPress: (id: number) => void;
}

const InfoList = ({ url, onPress }: Props) => {
    const [data, setData] = useState<Array<string>>(["1","2","3"]);

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
            <FlatList
                horizontal={true} // 가로로 스크롤 되도록
                pagingEnabled={true} // 한 회면에 보이도록 ... 테스트 해보자
                data={data}
                keyExtractor={(item, index) => {
                    return `Info-${index}`;
                }}
                renderItem={({ item, index }) => (
                    <Info
                        id={0}
                        // image={(item as IMovie).large_cover_image}
                        // year={(item as IMovie).year}
                        // title={(item as IMovie).title}
                        // genres={(item as IMovie).genres}
                        onPress={onPress} // 함수를 전달한다
                    />
                )}
            />
        </Container>
    );
};

export default InfoList;
