import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import Styled from 'styled-components/native';
import Toggle from '~/Screens/BluetoothList/List/Toggle';
import Subtitle from '~/Screens/BluetoothList/List/Subtitle';
import Device from '~/Components/Device';
// 커맨드 + 클릭으로 메소드 살펴보기
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import {Platform} from 'react-native';

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

  const [contents, setContents] = useState<Array<any>>([]);
  const [blueToothEnable, setBlueToothEnable] = useState<boolean>(false);

  // const arr = [];
  // for (let i=0; i<10; i++){
  //   arr.push(i);
  // }
  // console.log(arr);
  // console.log(typeof(arr));

  const renderEmpty = () => <EmptyItem><Text>NO List</Text></EmptyItem>
  const renderItem = ({ item, index }) => {
    // data 변경 후 name , key 등등 .. 필요 
    return <Device item={item} index={index} iconLeft={require('~/Assets/Images/Icons/ic_devices.png')} iconRight={require('~/Assets/Images/Icons/ic_setting.png')} />
  }

  useEffect(()=>{
    console.log("----------------");
    console.log(Platform.Version);
    console.log(Platform.OS);
    console.log("----------------");
    try {
      async function init(){
        if (Platform.OS === "android"){
          // const enable = await BluetoothSerial.requestEnable(); // 안드로이드 블루투스 활성화 메시지 표시, ios는 에러 함수
          // BluetoothSerial.enable(); -> 안드로이드 블루투스 활성화, ios는 에러 함수
          // BluetoothSerial.disable(); -> 안드로이드 블루투스 비활성화, ios는 에러 함수
        }
        // const isEnabled = await BluetoothSerial.isEnabled();
        // console.log(isEnabled); // 블루투스 활성화 상태 표시
        // const request = await BluetoothSerial.list();
        // console.log(request);
      }

      init();

      return() => {
        async function remove(){
          // await BluetoothSerial.stopScanning();
          console.log('scanner');
        }

        remove();
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <FlatListContainer  // children?: JSX.Element | Array<JSX.Element>; 
                        // 활용해서 {props.children} 레이아웃을 따로 뺄 수도 있다
                        // Test 컴포넌트 참고
    ><Toggle />
    <Subtitle title = 'Device List'/>
      <Container
        keyExtractor={(item, index) => {
          return `key-${index}`;
        }}
        data={testList}
        ListEmptyComponent={renderEmpty} // data 배열이 없을 경우 표시되는 컴포넌트
        renderItem={renderItem}
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
