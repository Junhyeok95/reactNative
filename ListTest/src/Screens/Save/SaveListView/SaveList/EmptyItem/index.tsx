import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const Label = Styled.Text``;

interface Props {}

const EmptyItem = ({  }: Props) => {
    return (
        <Container>
            <Label>컴포넌트가 비어있다 List의 빈 컴포넌트이다</Label>
        </Container>
    );
};

export default EmptyItem;
