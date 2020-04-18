import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const defaultContext: IContext = {
  info: undefined,
  login: (email: string) => {},
  getInfo: () => {},
  logout: () => {},
};

const Context = createContext(defaultContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const ContextProvider = ({children}: Props) => {
  const [info, setInfo] = useState<IInfo | undefined>(undefined);

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
      }}>
      {children}
    </Context.Provider>
  );
};
export {ContextProvider, Context};