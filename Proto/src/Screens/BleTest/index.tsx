import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';

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
`;
const Text = Styled.Text`
  font-size: 32px;
  font-weight: 700;
`;

const BleTest = () => {
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    console.log("BleTest componentDidMount");

    const interval = setInterval(() => {
      setCount(count => count+1);
    }, 1000);    
    return () => {
      clearInterval(interval);
      console.log("BleTest componentWillUnmount");
    };
  },[]);
  

  return (
    <Container>
      <Absolute>
        <Text>{count}</Text>
      </Absolute>
      <Label>BleTest</Label>
    </Container>
  );
};

export default BleTest;
