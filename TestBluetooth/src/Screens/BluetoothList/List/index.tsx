import React, {useState} from 'react';
import {FlatList} from 'react-native';
import Styled from 'styled-components/native';
import Toggle from '~/Screens/BluetoothList/List/Toggle';
import Subtitle from '~/Screens/BluetoothList/List/Subtitle';

const FlatListContainer = Styled.View`
  flex: 1;
  width: 80%;
  background-color: #CFC;
`;
const Container= Styled(FlatList)``;
const EmptyItem = Styled.View``;
const Text = Styled.Text`
  padding: 8px;
  margin: 8px;

  background-color: #EEE;

  border: 5px;
  border-radius: 10px;
  border-color: #00F;

  font-size: 24px;
  text-align: center;
`;

interface Props {}

const List = ({  }: Props) => {
  // const [testList, setTestList] = useState<Array<string>>([]);
  const [testList, setTestList] = useState<Array<string>>(["a","b","c"]);

  // const arr = [];
  // for (let i=0; i<10; i++){
  //   arr.push(i);
  // }
  // console.log(arr);
  // console.log(typeof(arr));

  return (
    <FlatListContainer  // children?: JSX.Element | Array<JSX.Element>; 
                        // 활용해서 {props.children} 레이아웃을 따로 뺄 수도 있다
                        // Test 컴포넌트 참고
    ><Toggle />
    <Subtitle title = 'Device List'/>
      <Container
        keyExtractor={(item, index) => {
          return `test-${index}`;
        }}
        data={testList}
        ListEmptyComponent={<EmptyItem><Text> No List</Text></EmptyItem>} // data 배열이 없을 경우 표시되는 컴포넌트
        renderItem={({item, index}) => {
          return <Text>{item} to {index}</Text>; // <Itme> 해야함
        }}
      />
    </FlatListContainer>

      // data={testList} // 리스트 뷰에 포시할 데이터의 배열
      // keyExtractor={(item, index) => { // 컴포넌트에 키 값을 설정해야 한다, 리액트가 알아보기 위함
      //     return `list-${index}`;
      // }}
      // renderItem={({ item, index }) => ( // 반복적으로 표시될 컴포넌트
      //   <Text> {item} </Text>
      // )}

      // // 표시할 데이터가 없는 경우 !!
      // // ListEmptyComponent 로 설정한 <EmptyItem /> 가 전체화면으로 표시되기 위해서 설정
      // contentContainerStyle={testList.length === 0 && { flex: 1 }} />

  );
};
export default List;
