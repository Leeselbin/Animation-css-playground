import React from 'react';
import NormalButton from '../../components/button/NormalButton';
import ToggleButton from '../../components/button/ToggleButton';

const ButtonPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <NormalButton />
            <ToggleButton />
        </div>
    );
};

export default ButtonPage;
