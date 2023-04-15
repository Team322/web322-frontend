import React from 'react';

const generateAESKey = () => {
    const keyBytes = new Uint8Array(64);
    window.crypto.getRandomValues(keyBytes);
    return Array.from(keyBytes, (byte) => ('0' + byte.toString(16)).slice(-2)).join('');
};

function DashboardRow({ index, url, isEncrypted, encryptionKey, chainOption, chainAddress, jsonParameters, setEncrypted, updateEncryptionKey, updateChainOption, updateJsonParameters, updateChainAddress, onDelete }) {
    const handleCheckboxChange = () => {
        setEncrypted(!isEncrypted);
        if (isEncrypted) {
            updateEncryptionKey('N/A');
        } else {
            updateEncryptionKey(generateAESKey());
        }
    };

    const handleEditClick = () => {
        // handle JSON editing here
    };

    return (
        <tr>
            <td className="border px-4 py-2">{index}</td>
            <td className="border px-4 py-2">
                <input
                    type="text"
                    value={url}
                    className="border rounded-lg px-2 py-1"
                    readOnly
                />
            </td>
            <td className="border px-4 py-2">
                <select
                    id="select-option"
                    className="border border-gray-300 rounded-md px-2 py-1"
                    value={chainOption}
                    onChange={() => updateChainOption()}
                >
                    <option value="">-- Select --</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Gnosis">Gnosis</option>
                    <option value="Polygon">Polygon</option>
                    <option value="Taiko">Taiko</option>
                    <option value="Scroll">Scroll</option>
                    <option value="Celo">Celo</option>
                    <option value="Mantle">Mantle</option>
                </select>
            </td>
            <td className="border px-4 py-2">
                0x01249304904
            </td>
            <td className="border px-4 py-2">
                <input type="checkbox" checked={isEncrypted} onChange={handleCheckboxChange} />
            </td>
            <td className="border px-4 py-2">
                <input
                    type="text"
                    value={encryptionKey}
                    disabled={!isEncrypted}
                    className="border rounded-lg px-2 py-1"
                    readOnly
                />
            </td>
            <td className="border px-4 py-2">
                <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit JSON
                </button>
            </td>
            <td className="border px-4 py-2">
                <button onClick={onDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default DashboardRow;
