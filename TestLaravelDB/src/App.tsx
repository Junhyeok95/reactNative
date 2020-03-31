import React from 'react';
import Styled from 'styled-components/native';
import Main from '~/Screens/Main';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`;

interface Props {}

const App = ({}: Props) => {
  return (
    <Container>
      <Main />
    </Container>
  );
};

export default App;