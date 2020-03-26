import React from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

import ModalButton from '~/Component/ModalButton';

const Container = Styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: #8CD3C5;
  padding-top: 24px;
  padding-bottom: 24px;
`;
const BackContainer = Styled.View`
  width: 80%;
  background-color: #FCFCFC;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
  border-width: 1px;
  border-color: #DDD;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
`;
const LabelContainer = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Label = Styled.Text`
  color: #000000;
  font-size: 24px;
`;
type NavigationProp = StackNavigationProp<TabFirstStackNaviParamList, 'Modal'>;

interface Props {
  navigation: NavigationProp;
}

const TabThird = ({navigation}: Props) => {
  return (
    <Container>
      <BackContainer>
        <LabelContainer>
          <Label>기기 정보</Label>
          <ModalButton label="기기 연결" onPress={() => navigation.navigate('Modal')} />
        </LabelContainer>
      </BackContainer>
      <BackContainer>
        <LabelContainer>
          <Label>이용약관</Label>
          <ModalButton label="상세 보기" onPress={() => navigation.navigate('Modal')} />
        </LabelContainer>
      </BackContainer>
      <BackContainer>
        <LabelContainer>
          <Label>버전 정보</Label>
          <ModalButton label="업데이트" onPress={() => navigation.navigate('Modal')} />
        </LabelContainer>
      </BackContainer>
      {/* <Button label="Open Full Modal" onPress={() => navigation.navigate('FullModal')} /> */}
    </Container>
  );
};

export default TabThird;
