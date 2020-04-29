import React, {useEffect} from 'react';
import Styled from 'styled-components/native';
import Header from '~/Screens/Device/Header';
import List from '~/Screens/Device/List';

const Container = Styled.View`
  flex: 1;
  align-items: center;
`;

const Device = () => {

  useEffect(() => {
    console.log("-- Device Mount");
  }, []);

  return (
    <Container>
      <Header />
      <List />
    </Container>
  );
};

export default Device;
