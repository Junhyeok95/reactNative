import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity``;
const Icon = Styled.Image``;

interface Props {
    iconName: 'plus' | 'minus'; // : 필수항목
    onPress?: () => void; // 필수 항목은 아니다
}

const Button = ({ iconName, onPress }: Props) => {
    return (
        <Container onPress={onPress}>
            <Icon
                source={
                    iconName === 'plus'
                        ? require('~/Assets/Images/add.png')
                        : require('~/Assets/Images/remove.png')
                }
            />
        </Container>
    );
};

export default Button;