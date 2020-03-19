import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import Styled from 'styled-components/native';

import { SaveListContext } from '~/Context/SaveListContext';

import EmptyItem from './EmptyItem';
import SaveItem from './SaveItem';

const Container = Styled(FlatList)`
`;
interface Props {}

const SaveList = ({  }: Props) => {
    // 인터페이스를 가져와서 초기값으로 설정
    const { saveList, removeSaveList } = useContext<ISaveListContext>(
        SaveListContext
    );

    return (

        // 리액트 네이티브의 리스트 뷰 중 하나인 FlatList 컴포넌트를 사용

        <Container
            data={saveList} // 리스트 뷰에 포시할 데이터의 배열
            keyExtractor={(item, index) => { // 컴포넌트에 키 값을 설정해야 한다, 리액트가 알아보기 위함
                return `save-${index}`;
            }}
            ListEmptyComponent={<EmptyItem />} // 배열이 없을 경우 표시되는 컴포넌트
            renderItem={({ item, index }) => ( // 반복적으로 표시될 컴포넌트
                <SaveItem
                    text={item as string}
                    onDelete={() => removeSaveList(index)}
                />
            )}
            // 표시할 데이터가 없는 경우 !!
            // ListEmptyComponent 로 설정한 <EmptyItem /> 가 전체화면으로 표시되기 위해서 설정
            contentContainerStyle={saveList.length === 0 && { flex: 1 }}
        />
    );
};

export default SaveList;
