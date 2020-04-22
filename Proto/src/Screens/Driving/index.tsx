import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dimensions} from 'react-native';

import ModalButton from '~/Components/ModalButton';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #8CD3C5;
`;
const Label = Styled.Text`
  font-size: 32px;
`;
const DrivingButtonContainer = Styled.View`
  background-color: #F00;
  position: absolute;
  right: 12px;
  bottom: 24px;
  padding: 8px 8px;
  border-radius: 24px;
`;
const ScoreImage = Styled.Image``;

const DeviceButtonContainer = Styled.View`
  position: absolute;
  left: 12px;
  bottom: 24px;
  padding: 8px 8px;
  border-radius: 24px;
`;

type NavigationProp = StackNavigationProp<MainFirstStackNavi, 'Driving'>;

interface Props {
  navigation: NavigationProp;
}

const Driving = ({navigation}: Props) => {

  const [device, setDevice] = useState<boolean>(false);

  useEffect(() => {
    console.log("---- Main start");
    console.log("---- 자동 페어링 구현해야함");
  },[]);

  return (
    <Container>
       <ScoreImage
        source={require('~/Assets/Images/score.png')}
        style={{
          width: Dimensions.get('window').width,
          // height: Dimensions.get('window').height,
          resizeMode: 'contain'
        }}
      />
      <DeviceButtonContainer style={{backgroundColor: device?'#00F':'#555'}}>
      <ModalButton
        style={{flex:1}}
        font={24}
        color='#FFF'
        label={device?'페어링':'신호없음'}
        onPress={() => {
          setDevice(!device);
          navigation.navigate('DeviceStackNavi');
        }}
      />
      </DeviceButtonContainer>
      <DrivingButtonContainer>
        <ModalButton
          style={{flex:1}}
          font={24}
          color='#FFF'
          label="운전 시작"
          onPress={() => navigation.navigate('MapStackNavi')} />
      </DrivingButtonContainer>
    </Container>
  );
};

export default Driving;
