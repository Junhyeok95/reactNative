import React, {useContext, useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #8CD3C5;
`;

type NavigationProp = StackNavigationProp<TabFirstStackNaviParamList, 'Modal'>;

interface Props {
  cache?: boolean;
  navigation: NavigationProp;
}

/*
@types
interface IData {
  data: string;
  data2: number:
}
interface IUserData {
  getData: (number?: number) => Array<IData>;
}
*/

// const EmptyItem = Styled.View``;
// const Item = Styled.View``;

// import {FlatList, Dimensions} from 'react-native';
// const FlatListContainer = Styled(FlatList)`
// `;

const TabSecond = ({navigation}: Props) => {
  // const {myList, setMyList} = useState<Array<string>>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const width = Dimensions.get('window').width; // 창의 사이즈

  return (
    <Container>
      {/* <FlatListContainer
        onRefresh={() => {}} // 끌어서 로딩
        refreshing={loading}
        horizontal={true} // 가로 설정
        // showsVerticalScrollIndicator ?
        // showsHorizontalScrollIndicator ?
        scrollEnabled={true} // 스크롤 여부
        contentContainerStyle={myList.length === 0 && { flex: 1 }} // 상단 컴포넌트
        style={{ }}
        data={myList} // 리스트 뷰에 포시할 데이터의 배열
        keyExtractor={(item, index) => { // 컴포넌트에 키 값을 설정해야 한다, 리액트가 알아보기 위함
            return `name-${index}`;
        }}
        renderItem={({ item, index }) => ( // 반복적으로 표시될 컴포넌트
          <Item />
        )}
        ListEmptyComponent={<EmptyItem />} // 배열이 없을 경우 표시되는 컴포넌트

          // 무한 스크롤 구현
          onEndReached={() => {
            setList([...list, ...getFunc()]);
          }}
          onEndReachedThreshold={0.5}
          
      /> */}

      {/* <Button label="Open Full Modal" onPress={() => navigation.navigate('FullModal')} /> */}
    </Container>
  );
};

export default TabSecond;
