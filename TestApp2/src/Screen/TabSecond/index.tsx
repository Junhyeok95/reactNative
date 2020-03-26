import React from 'react';
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
  navigation: NavigationProp;
}

const TabSecond = ({navigation}: Props) => {
  return (
    <Container>
      {/* <Button label="Open Full Modal" onPress={() => navigation.navigate('FullModal')} /> */}
    </Container>
  );
};

export default TabSecond;
