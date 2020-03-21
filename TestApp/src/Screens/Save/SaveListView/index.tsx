import React from 'react';
import Styled from 'styled-components/native';

import Header from './Header';
import SaveList from './SaveList';

const Container = Styled.SafeAreaView`
    flex: 1;
`;

interface Props {}

const SaveListView = ({  }: Props) => {
    return (
        <Container>
            <Header />
            <SaveList />
        </Container>
    );
};

export default SaveListView;
