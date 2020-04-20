import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const defaultContext: IContext = { // 초기화값
  info: undefined,
  login: (email: string) => {},
  setRaspDatas: (setData: string) => {},
  getInfo: () => {},
  logout: () => {},
  raspData: "rarara",
  jcnt: -50,
  setMyCnt: (setNumber: number) => {},
  // 여기랑 .. 프로바이더랑 .. 초기화를 해도 주는건 프로바이더라서 ..
  getMyCnts: ():number => { return -1; },
};

const Context = createContext(defaultContext);

// 따로 빼는방법

// const Cnt = createContext<ICnt>({
//   cnt: -50,
//   setMyCnt: (setNumber: number) => {},
// })

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const ContextProvider = ({children}: Props) => {
  const [info, setInfo] = useState<IInfo | undefined>(undefined);
  const [raspData, setRaspData] = useState<string>("");

  const getMyCnts = (): number => {
    return jcnt;
  }

  // new new
  const [jcnt, setJcnt] = useState<number>(-100);
  const setMyCnt = (setNumber: number): void => {
    if(setNumber){
      setJcnt(setNumber);
    }
  }
  // new new
  
  const setRaspDatas = (setData: string): void => {
    if(setData){
      setRaspData(setData);
    }
  };

  const login = (email: string): void => {
    AsyncStorage.setItem('token', 'let data = JSON.stringify()').then((data) => {
      // let json = JSON.parse(data)
      setInfo({
        name: 'WDJ',
      });
    });
  };

  const getInfo = (): void => {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value) {
          setInfo({
            name: 'WDJ',
          });
        }
      })
      .catch(() => {
        setInfo(undefined);
      });
  };

  const logout = (): void => {
    console.log('logout');
    AsyncStorage.removeItem('token');
    setInfo(undefined);
    console.log(info);
  };

  useEffect(() => {
    getInfo(); // 자동 로그인
  }, []);



  return (
    <Context.Provider
      value={{
        info,
        login,
        getInfo,
        logout,
        setRaspDatas,
        raspData,
        jcnt,
        setMyCnt,
        getMyCnts,
      }}>
      {children}
    </Context.Provider>
  );
};
export {ContextProvider, Context};