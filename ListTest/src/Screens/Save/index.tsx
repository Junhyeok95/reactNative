import React from 'react';
import Styled from 'styled-components/native';

import SaveListView from './SaveListView';
import AddSave from './AddSave';

const Container = Styled.SafeAreaView`
    flex: 1;
    background-color: rgba(45,45,150,0.3);

`;

interface Props {}

const Save = ({  }: Props) => {
    return (
        <Container>
            <SaveListView />
            <AddSave />
        </Container>
    );
};

export default Save;
