import React from 'react';
import Styled from 'styled-components/native';

// 위치를 고정시킴
const Container = Styled.TouchableWithoutFeedback`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

// 투명도를 설정
const BlackBackground = Styled.View`
    background-color: #000;
    opacity: 0.3;
    width: 100%;
    height: 100%;
`;

interface Props {
    onPress: () => void;
}

const Background = ({ onPress }: Props) => {
    return (
        <Container onPress={onPress}>
            <BlackBackground />
        </Container>
    );
};

export default Background;
