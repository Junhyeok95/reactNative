import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';

// const {config, Group} = require('solapi');

const TouchableOpacity = Styled.TouchableOpacity`
  width: 100px;
  height: 50px;
`;
const Text = Styled.Text`
  font-size: 32px;

`;


interface Props {
}

const Sola = () => {
  useEffect(() => {
    console.log("--- ! Sola");
  },[]);
  return (
    <TouchableOpacity>
      <Text>
        sola
      </Text>
    </TouchableOpacity>
  );
};

export default Sola;
