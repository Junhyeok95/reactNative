import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    children: JSX.Element | Array<JSX.Element>;
}

const SaveListContext = createContext<ISaveListContext>({
    saveList: [],
    addSaveList: (save: string): void => {},
    removeSaveList: (index: number): void => {},
});

const SaveListContextProvider = ({ children }: Props) => {
    const [saveList, setSaveList] = useState<Array<string>>([]);

    const addSaveList = (save: string): void => {
        // 받은 save 를 리스트에 추가
        const list = [...saveList, save];
        // 값 변경
        setSaveList(list);
        // 데이터 저장
        AsyncStorage.setItem('saveList', JSON.stringify(list));
    };

    const removeSaveList = (index: number): void => {
        // 받은 값을 list로 사용
        let list = [...saveList];
        // 선언후 초기화를 위해서 let
        list.splice(index, 1);
        // 값이 저장됨
        setSaveList(list);
        AsyncStorage.setItem('saveList', JSON.stringify(list));
    };

    // 초기화 과정
    const initData = async () => {
        try {
            // await 으로 가저옴
            const list = await AsyncStorage.getItem('saveList');
            if (list !== null) {
                // 값이 있다면 초기화를 시켜줌
                setSaveList(JSON.parse(list));
            }
        } catch (e) {
            console.log(e);
        }
    };

    // 클래스 컴포넌트의 라이프 사이클 함수와 비슷한 역할
    useEffect(() => {
        initData();
        // 첫 번째 매개변수로 함수를 설정
    }, []); // 두 번째 매개변수로 배열을 전달
    // 1. 함수, 배열 사용 시 componentDidMount와 같은 역할
    // 즉 한 번만 호출
    // 2. 함수만 사용 시 componentDidMount와 componentDidUpdate의 역할을 동시에 수행
    // 즉 Props나 State의 변경에 의해 리렌더링된 후에도 실행
    // 3. 함수는 return을 사용 할 수 있는데 componentWillUnmount와 같은 역할을 한다
    // 즉 라이브러리와의 연동을 해제하거나, 타이머를 해제하는데 사용된다.
    // 4. 배열에 특정 변수를 설정하면 전달된 변수가 변경될 때만, 이 함수가 호출된다
    // 5. 또한 라이프 사이클 함수와 다르게 여러 번 정의하여 사용할 수 있다.

    return (
        <SaveListContext.Provider
            value={{
                saveList,
                addSaveList,
                removeSaveList,
            }}>
            {children}
        </SaveListContext.Provider>
    );
};

export { SaveListContextProvider, SaveListContext };
