import React, {useState} from 'react';
import {FlatList} from 'react-native';
import Styled from 'styled-components/native';
import Layout from './TestLayout';

const MyFlatList= Styled(FlatList)``;
const Text = Styled.Text`
  font-size: 24px;
  color: #00F;
`;

const Test = () => {
  const lista = [
    {
      name: 'aaa',
      key: '1',
    },
    {
      name: 'bbb',
      key: '2',
    },
    {
      name: 'ccc',
      key: '3',
    },
    {
      name: 'ddd',
      key: '4',
    },
    {
      name: 'eee',
      key: '5',
    },
    {
      name: 'FFF',
      key: '6',
    }
  ]

  return (
    <Layout title={"Test List"}>
      <MyFlatList
        data={lista}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    </Layout>
  );
};
export default Test;
