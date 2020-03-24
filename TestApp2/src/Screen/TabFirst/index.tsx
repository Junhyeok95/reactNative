import React from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Button from '~/Component/Button';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #8CD3C5;
`;

type NavigationProp = StackNavigationProp<TabFirstStackNaviParamList, 'Modal'>;

interface Props {
  navigation: NavigationProp;
}

const TabFirst = ({navigation}: Props) => {
  return (
    <Container>
      <Button label="상세 보기" onPress={() => navigation.navigate('Modal')} />
      <Button label="정보 수정" onPress={() => navigation.navigate('Modal')} />
      <Button label="상세 보기" onPress={() => navigation.navigate('Modal')} />
      <Button label="정보 수정" onPress={() => navigation.navigate('Modal')} />
      {/* <Button label="Open Full Modal" onPress={() => navigation.navigate('FullModal')} /> */}
    </Container>
  );
};

export default TabFirst;
