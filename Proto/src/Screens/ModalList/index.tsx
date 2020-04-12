import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import Input from '~/Components/Input';
import {FlatList, Platform} from 'react-native';

const TouchableWithoutFeedback = Styled.TouchableWithoutFeedback``;
const Container = Styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  background-color: #8CD3C5;
  padding-top: 24px;
  padding-bottom: 24px;
`;
const BackContainer = Styled.View`
  flex: 1;
  width: 80%;
  background-color: #FCFCFC;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 12px;
  border-width: 1px;
  border-color: #DDD;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
`;
const LabelContainer = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Label = Styled.Text`
  color: #000;
  font-size: 24px;
`;
const InputContainer = Styled.View`
  flex: 1;
  height:32px;
  margin-bottom: 8px;
`;

const FlatListContainer= Styled(FlatList)``;
const EmptyItem = Styled.View``;
const Text = Styled.Text``;

type NavigationProp = BottomTabNavigationProp<
  {
    MainFirstStackNavi: undefined;
    MainSecondStackNavi: undefined;
    MainThirdStackNavi: undefined;
  }
>;
interface Props {
  navigation ?: NavigationProp
  route ?: any
}

const ModalList = ({navigation, route}: Props) => {
  // console.log("ModalList route");
  // console.log(route);
  // const {list} = route.params;
  // console.log(typeof(list));
  // console.log(Array.isArray(list));
  // console.log(list);
  // console.log(JSON.stringify(list));
  // const [testList, setTestList] = useState<Array<string>>(["a","b","c"]);

  const {list} = route.params;
  const [labelList, setLabelList] = useState<Array<string>>(list);

  const renderEmpty = () => <EmptyItem><Text>NO List</Text></EmptyItem>
  const renderItem = ({ item, index }) => {
    return (
      <>
        <LabelContainer>
          <Label>{item}</Label>
        </LabelContainer>
        <InputContainer>
          <Input
            style={{ margin: 0, padding: 0 }}
            placeholder={''}
          />
        </InputContainer>
      </>
    );
  };

  return (
    <TouchableWithoutFeedback>
      <Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <BackContainer>
          <FlatListContainer
            keyExtractor={(item, index) => {
              return `key-${index}`;
            }}
            data={labelList}
            ListEmptyComponent={renderEmpty} // data 배열이 없을 경우 표시되는 컴포넌트
            renderItem={renderItem}
            />
        </BackContainer>
      </Container>
      </TouchableWithoutFeedback>
      );
};

export default ModalList;


