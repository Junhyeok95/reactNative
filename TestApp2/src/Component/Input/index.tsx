import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
  flex: 1;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #FFF;
  border-radius: 8px;
  border-width: 1px;
  border-color: #DDD;
`;
const InputField = Styled.TextInput`
  flex: 1;
  color: #292929;
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
      selectionColor="#292929"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType ? keyboardType : 'default'}
      autoCapitalize="none"
      autoCorrect={false}
      allowFontScaling={false}
      placeholderTextColor="#999"
      placeholder={placeholder}
      clearButtonMode={clearMode ? 'while-editing' : 'never'}
      onChangeText={onChangeText}
    />
  </Container>
  );
};

export default Input;
