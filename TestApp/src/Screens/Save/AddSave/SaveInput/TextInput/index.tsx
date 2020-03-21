import React, { useContext } from 'react';
import Styled from 'styled-components/native';

import { SaveListContext } from '~/Context/SaveListContext';

// 리엑트 네이티브의 텍스트 인풋과 연결시켜줌
const Input = Styled.TextInput`
    width: 100%;
    height: 40px;
    background-color: #FFF;
    padding: 0px 8px;
`;

// 이것으로 인해 부모에게 hide를 줄 수 있고 그럼 숨김처리된다
interface Props {
    hideSaveInput: () => void;
}

// useContext를 사용하여 Context를 사용하도록 설정
const TextInput = ({ hideSaveInput }: Props) => {
    // 초기값으로 ISaveListContext 인터페이스를 사용
    const { addSaveList } = useContext<ISaveListContext>(SaveListContext);
    return (
        <Input
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="할 일을 입력한다"
            returnKeyType="done"
            onSubmitEditing={({ nativeEvent }) => {
                addSaveList(nativeEvent.text);
                hideSaveInput();
            }}
        />
    );
    // onSubmitEditing은 키보드의 환료를 눌렀을 경우 호출되는 함수
    // addSaveList 동작으로 입력한 데이터( nativeEvent.text )로 데이터를 저장하고
    // 컴포넌트를 숨기기위한 동작을 실행

    // Capitalize -> 대문자화
    // Correct -> 텍스트 자동 수정 금지
};

export default TextInput;
