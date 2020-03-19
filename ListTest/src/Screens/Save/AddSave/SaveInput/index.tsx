import React from 'react';
import Styled from 'styled-components/native';

// 화면을 어둡게 하기 위함
import Background from './Background';
// 텍스트를 입력 받기 위함
import TextInput from './TextInput';

const Container = Styled.KeyboardAvoidingView`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: flex-end;
`;

// 백그라운드를 누르면 실행 되도록 !!
interface Props {
    hideSaveInput: () => void;
}

// 부모 컴포넌트에서 hideSaveInput가 실행되면 페이지를 숨기도록 했다
// 자식 컴포넌트에서 onPress가 일어나면 이 의미없는 hideSaveInput으로 부모 컴포넌트에게 전달해서
// 비로서 의미가 있다 3단 이벤트 !! ㅋㅋ... 
const SaveInput = ({ hideSaveInput }: Props) => {
    return (
        <Container behavior="padding">
            <Background onPress={hideSaveInput} />
            <TextInput hideSaveInput={hideSaveInput} />
        </Container>
    );
};

// 25줄 behavior 옵션
// https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4
// behavior={Platform.OS === "ios" ? "padding" : null}
export default SaveInput;
