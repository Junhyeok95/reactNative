import React, { useState } from 'react';
import Styled from 'styled-components/native';
import Button from '~/Components/Button/index';

const Container = Styled.SafeAreaView`
    flex: 1;
`;

const TitleContainer = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TitleLabel = Styled.Text`
    font-size: 24px;
`;

const CountContainer = Styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
`;

const CountLabel = Styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const ButtonContainer = Styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`;

interface Props {
    title?: string; // 필수 항목은 아니다
    initValue: number; // : 필수항목
}

// useState 를 사용하는 방법 ...
// 직접 변경하면서 발생할 수 있는 오류를 줄이고 리액트의 가상 돔을 활용하여 변경된 부분만 화면을 갱신하기 위해서이다
// !!! const [변수명, 변수를 변경할 set 함수] = useState<State의 타입>(초기값);

const Counter = ({ title, initValue }: Props) => {
    const [count, setCount] = useState<number>(0);

    return (
        <Container>
            {title && (
                <TitleContainer>
                    <TitleLabel>{title}</TitleLabel>
                </TitleContainer>
            )}
            <CountContainer>
                <CountLabel>{initValue + count}</CountLabel>
            </CountContainer>
            <ButtonContainer>
                <Button iconName="plus" onPress={() => setCount(count + 1)}/>
                <Button iconName="minus" onPress={() => setCount(count - 1)}/>
            </ButtonContainer>
        </Container>
    )
}

export default Counter;