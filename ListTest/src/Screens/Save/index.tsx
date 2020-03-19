import React from 'react';
import Styled from 'styled-components/native';

import SaveListView from './SaveListView';
import AddSave from './AddSave';

const Container = Styled.View`
    flex: 1;
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
