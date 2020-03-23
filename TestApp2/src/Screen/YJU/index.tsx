import React from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Button from '~/Component/Button';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Label = Styled.Text``;

const Image = Styled.Image`
`;

type NavigationProp = StackNavigationProp<TabFirstStackNaviParamList, 'Modal'>;

interface Props {
  navigation: NavigationProp;
}

const YJU = ({navigation}: Props) => {
  return (
    <Container>
      {/* <Label>This is First Tab</Label>
      <Button label="Open Modal" onPress={() => navigation.navigate('Modal')} />
      <Button
        label="Open Full Modal"
        onPress={() => navigation.navigate('FullModal')}
      /> */}
      <Image
          source={require('~/Assets/Images/yju_icon.png')}
          style={{ width: 300, height: 300 }}
      />
    </Container>
  );
};

export default YJU;
