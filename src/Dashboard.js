import React, { useState, useEffect } from 'react';
import { USER_DATA_ENDPOINT } from './globals';
import URLInput from './URLInput';
import DashboardRow from './DashboardRow';

const Dashboard = ({ sessionID }) => {
    const [userData, setUserData] = useState(null);
    const [newEndpoint, setNewEndpoint] = useState('');
    const [endpoints, setEndpoints] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(USER_DATA_ENDPOINT, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                setUserData(json);
                setIsLoading(false);
            })
            .catch(_ => {
                setUserData({
                    apiCalls: [],
                    apiEndpoints: [],
                    username: "dummy",
                }); setIsLoading(false);
            });
    }, [sessionID]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAddEndpoint = () => {
        if (!newEndpoint.startsWith('https://'));
        setEndpoints([...endpoints, { url: newEndpoint, encrypted: false }]);
        setNewEndpoint('');
    };

    const setEncrypted = (index, newValue) => {
        setEndpoints(prevEndpoints => [
            ...prevEndpoints.slice(0, index),
            {
                ...prevEndpoints[index],
                isEncrypted: newValue
            },
            ...prevEndpoints.slice(index + 1)
        ])
    };

    const updateEncryptionKey = (index, key) => {
        setEndpoints(prevEndpoints => [
            ...prevEndpoints.slice(0, index),
            {
                ...prevEndpoints[index],
                encryptionKey: key
            },
            ...prevEndpoints.slice(index + 1)
        ])
    }

    const updateJsonParameters = (index, jsonParameters) => {
        setEndpoints(prevEndpoints => [
            ...prevEndpoints.slice(0, index),
            {
                ...prevEndpoints[index],
                jsonParameters: jsonParameters
            },
            ...prevEndpoints.slice(index + 1)
        ])
    };

    const onDelete = (index) => {
        setEndpoints(prevEndpoints => [
            ...prevEndpoints.slice(0, index),
            ...prevEndpoints.slice(index + 1)
        ])
    }

    const updateChainOption = (index, newOption) => {
        setEndpoints(prevEndpoints => [
            ...prevEndpoints.slice(0, index),
            {
                ...prevEndpoints[index],
                chainOption: newOption
            },
            ...prevEndpoints.slice(index + 1)
        ])
    }


    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-3xl font-bold mb-5 w-full text-center">Hello, {userData.username}!</h1>

            <h2 className="text-xl font-bold mb-3">Recent API Calls</h2>
            <table className="table-fixed mb-5 w-full bg-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2">URL</th>
                        <th className="px-4 py-2">Response Code</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.apiCalls.map((call, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{call.url}</td>
                            <td className="border px-4 py-2">{call.responseCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-xl font-bold mb-3">API Endpoints</h2>
            <table className="table-auto w-full text-center bg-gray-200">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Endpoint</th>
                        <th>Chain</th>
                        <th>Chain Address</th>
                        <th>Encryption?</th>
                        <th>Encryption key</th>
                        <th>JSON Parameters</th>
                        <th>Delete entry</th>
                    </tr>
                </thead>
                <tbody>
                    {endpoints.map((endpoint, index) => (
                        <DashboardRow
                            key={index}
                            index={index}
                            url={endpoint.url}
                            isEncrypted={endpoint.isEncrypted}
                            encryptionKey={endpoint.encryptionKey}
                            jsonParameters={endpoint.jsonParameters}
                            setEncrypted={newValue => setEncrypted(index, newValue)}
                            updateEncryptionKey={key => updateEncryptionKey(index, key)}
                            updateJsonParameters={jsonParameters => updateJsonParameters(index, jsonParameters)}
                            onDelete={() => onDelete(index)}
                            chainOption={endpoint.chainOption}
                            updateChainOption={newOption => updateChainOption(index, newOption)}
                        />
                    ))}
                </tbody>

            </table>

            <div className='h-5' />

            <div className="flex items-center mb-5 bg-gray-200 rounded-xl">
                <URLInput onUpdate={setNewEndpoint} placeholder="Add new API endpoint" />
                <button onClick={handleAddEndpoint} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md">Add</button>
            </div>
        </div>
    );
}


export default Dashboard;