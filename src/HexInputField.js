import { useState } from 'react';

function HexInputField() {
    const [hexValue, setHexValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        if (value === '' || /^0x[0-9a-fA-F]+$/.test(value)) {
            setHexValue(value);
        }
    };

    return (
        <input
            id="hex-input-field"
            type="text"
            value={hexValue}
            onBlur={verifyInput}
            maxLength="42"
            placeholder="0x0123456789012345678901234567890123456789"
        />
    );
}

export default HexInputField;