import React, {useState} from 'react';
import {FlatList} from 'react-native';
import Styled from 'styled-components/native';

const Container= Styled(FlatList)``;
const EmptyItem = Styled.View``;
const View = Styled.View`
  margin: 10px;
  padding: 10px;

  background-color: #FF0;

  align-items: center;
`;
const Text = Styled.Text`
  width: 80%;
  padding: 5px;
  margin: 5px;

  background-color: #EEE;

  border: 3px;
  border-radius: 10px;
  border-color: #00F;

  font-size: 32px;
  text-align: center;
`;

interface Props {}

const List = ({  }: Props) => {
  const [testList, setTestList] = useState<Array<string>>(["a","b","c"]);

  // const arr = [];
  // for (let i=0; i<10; i++){
  //   arr.push(i);
  // }
  // console.log(arr);
  // console.log(typeof(arr));

  return (
    <Container
    // <FlatList
      keyExtractor={(item, index) => {
        return `test-${index}`;
      }}
      data={testList}
      renderItem={({item, index}) => {
        return <View><Text>{item} to {index}</Text></View>; // <Itme> 해야함
      }}
    />

      // data={testList} // 리스트 뷰에 포시할 데이터의 배열
      // keyExtractor={(item, index) => { // 컴포넌트에 키 값을 설정해야 한다, 리액트가 알아보기 위함
      //     return `list-${index}`;
      // }}
      // renderItem={({ item, index }) => ( // 반복적으로 표시될 컴포넌트
      //   <Text> {item} </Text>
      // )}

      // // 표시할 데이터가 없는 경우 !!
      // ListEmptyComponent={<EmptyItem />} // data 배열이 없을 경우 표시되는 컴포넌트
      // // ListEmptyComponent 로 설정한 <EmptyItem /> 가 전체화면으로 표시되기 위해서 설정
      // contentContainerStyle={testList.length === 0 && { flex: 1 }} />

  );
};
export default List;
