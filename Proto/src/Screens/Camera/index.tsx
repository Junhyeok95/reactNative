import React, {useEffect} from 'react';
import Styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Label = Styled.Text`
  font-size: 32px;
`;
const Absolute = Styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
`;
const TouchableOpacity = Styled.TouchableOpacity``;
const CameraControlContainer= Styled.View`
  position: absolute;
  bottom: 48px;
  flex-direction: row;
`;
const ControlButton = Styled.TouchableOpacity`
  flex: 1;
  border-width: 1px;
  align-items: center;
  margin: 0 16px;
`;

const Camera = () => {

  useEffect(() => {
    console.log("-- Camera Mount");
  }, []);

  return (
    <Container>
      <Icon name="face" color={'#333'} size={400} />
      <Absolute>
        <TouchableOpacity>
        <Icon name="sync" color={'#00F'} size={50} />
        </TouchableOpacity>
      </Absolute>
      <CameraControlContainer>
        <ControlButton onPress={()=>{
          console.log("H");
        }}>
          <Label>H</Label>
        </ControlButton>
        <ControlButton onPress={()=>{
          console.log("J");
        }}>
          <Label>J</Label>
        </ControlButton>
        <ControlButton onPress={()=>{
          console.log("K");
        }}>
          <Label>K</Label>
        </ControlButton>
        <ControlButton onPress={()=>{
          console.log("L");
        }}>
          <Label>L</Label>
        </ControlButton>
      </CameraControlContainer>
    </Container>
  );
};

export default Camera;
