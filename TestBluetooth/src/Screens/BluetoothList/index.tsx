import React, {createContext, useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import List from '~/Screens/BluetoothList/List';
import Header from '~/Screens/BluetoothList/Header';
import Test from '~/Screens/BluetoothList/Test';

// -----------------------------------------------------------------------------------------

// // 폴더 !! src/Contexts/____Context/@types/index.d.ts
// // 타입 스크립트 사용 Context용
// interface IDataListContext {
//   dataList: Array<string>;
//   addDataList: (save: string) => void;
//   removeDataList: (index: number) => void;
// }

// // 폴더 !! src/Contexts/____Context/index.tsx
// // 프로바이더와 같이 생성 import {createContext} from 'react';
// const DataListContext = createContext<IDataListContext>({
//   dataList: [], // testList:
//   addDataList: (save: string): void => {},
//   removeDataList: (index: number): void => {},
// });
// interface Props { // 이것도 타입스크립트 ..
//   children: JSX.Element | Array<JSX.Element>;
// }
// const DataListContextProvider =  ({ children }: Props) => {
//   const [dataList, setDataList] = useState<Array<string>>([]); // 초기화
//   const addDataList = (save: string): void => { /* 함수 추가 */ };
//   const removeDataList = (index: number): void => { /* 함수 추가 */ };
//   const initData = async () => { /* 선언 후 -> 초기화 함수 추가 ( 셋팅 ) */ };
//   useEffect(() => { initData(); /* Hooks 식 마운트 */ }, []);
//   return (
//     <DataListContext.Provider value={{ dataList, addDataList, removeDataList, }}>
//       {children}
//     </DataListContext.Provider>
//   );
// };
// export { DataListContextProvider, DataListContext };
// // 폴더 !! src/Screens/____/index.tsx
// // 함수 내부에서 불러와서 사용 import {useContext} from 'react';
// const { dataList, addDataList, removeDataList } = useContext<IDataListContext>(
//   DataListContext
// );

// // -----------------------------------------------------------------------------------------

// // 타입 스크립트 사용
// interface IData {
//   data?: number; // 온도
//   data2?: string; // 날씨, 문자열
//   data3: boolean; // 로딩 상태
// }
// // 함수 내부에서 그냥 사용
// const [userData, setUserData] = useState<IData>({
//   data: undefined,
//   data2: undefined,
//   data3: false,
// });

// -----------------------------------------------------------------------------------------

const SafeAreaView = Styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #FFF;
`;

interface Props {}

const BluetoothList = ({  }: Props) => {
  
  return (
    <SafeAreaView>
      <Header />
      <List />
      {/* <Test /> */}
    </SafeAreaView>
  );
};

export default BluetoothList;
