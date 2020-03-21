import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex-direction: row;
    background-color: #FFF;
    margin:4px 16px;
    padding: 8px 16px;
    border-radius: 8px;
    align-items: center;
`;
// 들어갈 내용
const Label = Styled.Text`
    flex: 1;
`;

// 삭제를 위한 버튼
const DeleteButton = Styled.TouchableOpacity``;
const Icon = Styled.Image`
    width: 24px;
    height: 24px;
`;

interface Props {
    text: string;
    onDelete: () => void;
}

const SaveItem = ({ text, onDelete }: Props) => {
    return (
        <Container>
            <Label>{text}</Label>
            <DeleteButton onPress={onDelete}>
                <Icon source={require('~/Assets/Images/remove.png')} />
            </DeleteButton>
        </Container>
    );
};

export default SaveItem;
