import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    width: 100%;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 4px;
    background-color: #333333;
`;
const InputField = Styled.TextInput`
    flex: 1;
    color: #FFFFFF;
`;

interface Props {
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    secureTextEntry?: boolean;
    style?: Object;
    clearMode?: boolean;
    onChangeText?: (text: string) => void;
}

const Input = ({
    placeholder,
    keyboardType,
    secureTextEntry,
    style,
    clearMode,
    onChangeText,
}: Props) => {
    return (                     
        <Container style={style}>
            <InputField
                selectionColor="#FF0000" // 내용을 복사하거나 붙여 넣기 위해 사용하는 색상
                secureTextEntry={secureTextEntry} // 입력 내용을 숨길지 여부를 설정
                keyboardType={keyboardType ? keyboardType : 'default'} // 입력 타입을 설정
                autoCapitalize="none" // 대문자 자동 변경
                autoCorrect={false} // 스펠링 교정
                allowFontScaling={false} // 단말기 설정을 통해 수정한 폰트 크기를 적용할지
                placeholderTextColor="#FFFFFF" // 입력 내용이 없는 동안 보여줄 색상
                placeholder={placeholder} // 입력 내용이 없는 동안 보여줄 내용
                clearButtonMode={clearMode ? 'while-editing' : 'never'} // 입력 내용이 있을 때, 우측에 전체 삭제 버튼 여부
                onChangeText={onChangeText} // 입력창의 내용이 변경될 때 호출되는 콜백
            />
        </Container>
    );
};

export default Input;
