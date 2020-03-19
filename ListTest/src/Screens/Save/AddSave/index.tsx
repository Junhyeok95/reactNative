import React, { useState } from 'react';

import AddButton from './AddButton';
import SaveInput from './SaveInput';

interface Props {}

const AddSave = ({  }: Props) => {
    // 기본 값으로 false, 버튼을 누를 경우 보여지도록
    const [showInput, setShowInput] = useState<boolean>(false);
    return (
        <>
            <AddButton onPress={() => setShowInput(true)} />
            {showInput && <SaveInput hideSaveInput={() => setShowInput(false)} />}
        </>
    );
    // {showInput && <SaveInput hideSaveInput={() => setShowInput(false)} />} 설명
    // showInput State를 이용하여 입력하는 컴포넌트를 보여주고 완료하면 숨길 수 있도록 설정
};

export default AddSave;
