import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Props { // cache 유저 있을 경우에 기록 뭉치를 부름
  cache?: boolean;
  children: JSX.Element | Array<JSX.Element>;
}

interface IDrivingData {
  test1: boolean,
}

const DrivingDataContext = createContext<IDrivingData>({ // 초기값
  test1: true,
});

const DrivingDataProvider = ({cache, children}: Props) => {
  const test1 = false;

  const [drivingSaveData, setDrivingSaveData] = useState<Array<IDrivingSaveData>>([]); // 따로두면 시간,라인,마커 관계힘듬
  // 휴대폰 기본 확인 정보
  // [ 속도, 위도, 경도, 링크상태, 운전상태, 날짜 ] -> 6개
  const [defaultInfo, setDefaultInfo] = useState<Array<number>>([0,0,0,0,0,0]); 
  // 라즈베리 + 아두이노 정보 -> 10개
  // [ 신고상태, 롤, 피치, 요, 시선방향, 좌눈, 우눈, 화면size , 좌표x, 좌표y ] // 화면, 좌표는 1/3 된 값
  const [linkInfo, setLinkInfo] = useState<Array<number>>([]);
  // 토탈 체크 정보 -> 10개
  // [ 신고상태, 신고카운트, 가속상태, 가속횟수, 감속상태, 감속횟수, 졸음상태, 졸음횟수, 운전시작, 운전종료 ]
  const [checkInfo, setCheckInfo] = useState<Array<number>>([]);

  const getCacheData = async (key: string) => { // 활용해서 운전기록뭉치 (날짜 : {기록 : {위도, 경도} , 포인트 : {내용}  })
    const cacheData = await AsyncStorage.getItem(key);
    if (cache === false || cacheData === null) {
      return undefined;
    }
    const cacheList = JSON.parse(cacheData); // 캐시 리스트에서 날짜 조회해서 지우기, 보관날짜 생각 년월일 숫자로 ...

    return cacheList;
  };

  const setCachedData = (key: string, data: Array<any>) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
  };

  const setDrivingList = async () => { // 운전기록뭉치
    const cachedData = await getCacheData('DrivingList');
    if (cachedData) { // 기록이 있으면 가저옴
      setDrivingSaveData(cachedData);
      return;
    } else {
        console.log("x cachedData -> setDrivingList()");
      return;
    }
  };

  useEffect(() => {
    setDrivingList();
  }, []);

  return (
    <DrivingDataContext.Provider
      value={{
        test1
      }}>
      {children}
    </DrivingDataContext.Provider>
  );
};

export {DrivingDataProvider, DrivingDataContext};
