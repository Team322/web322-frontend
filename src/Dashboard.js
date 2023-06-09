import React, { useState, useEffect } from 'react';
import { SAVE_ENDPOINT, USER_DATA_ENDPOINT, DELETE_ENDPOINT, DOWNLOAD_ENDPOINT } from './globals';
import URLInput from './URLInput';
import DashboardRow from './DashboardRow';
import DownloadButton from './DownloadButton';

const Dashboard = () => {
    const [userName, setUserName] = useState('dummy');
    const [apiCalls, setApiCalls] = useState([]);
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
                console.log(json);
                setApiCalls(json['apiCalls']);
                setEndpoints(
                    json["apiEndpoints"].map(
                        endpoint => ({...endpoint, isEncrypted: endpoint["encryptionKey"] !== null})
                ));
                setUserName(json['username']);
                setIsLoading(false);
            })
            .catch(_ => {
                setApiCalls([]);
                setEndpoints([]);
                setUserName("dummy");
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAddEndpoint = () => {
        setEndpoints([...endpoints, { url: newEndpoint, isEncrypted: false, chainOption: "Ethereum", contractAddress: '', jsonParameters: ''}]);
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
        console.log(endpoints);
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
        console.log(endpoints);
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
        console.log(endpoints);
    };

    const onDelete = (index) => {
        setEndpoints(prevEndpoints => [
            ...prevEndpoints.slice(0, index),
            ...prevEndpoints.slice(index + 1)
        ]);
        fetch(DELETE_ENDPOINT, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({index: index})
        });
        console.log(endpoints);
    }

    const onSave = (index) => {
        fetch(SAVE_ENDPOINT, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    index: index,
                    ...endpoints[index],
                }
            )
        })
        console.log(endpoints);
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
        console.log(endpoints);

    }

    const updateContractAddress = (index, address) => {
        setEndpoints(prevEndpoints => [
            ...prevEndpoints.slice(0, index),
            {
                ...prevEndpoints[index],
                contractAddress: address
            },
            ...prevEndpoints.slice(index + 1)
        ])
        console.log(endpoints);

    }


    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-3xl font-bold mb-5 w-full text-center">Hello, {userName}!</h1>

            <h2 className="text-xl font-bold mb-3">Recent API Calls</h2>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-4 py-2">URL</th>
                            <th className="px-4 py-2">Timestamp</th>
                            <th className="px-4 py-2">TCP traffic download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiCalls.map((call, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{call.url}</td>
                                <td className="border px-4 py-2">{call.timestamp}</td>
                                <td className="border px-4 py-2"><DownloadButton url={DOWNLOAD_ENDPOINT} download={call.uid + '.zip'} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="h-10" />

            <h2 className="text-xl font-bold mb-3">API Endpoints</h2>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="border px-4 py-2">Index</th>
                            <th className="border px-4 py-2">Endpoint</th>
                            <th className="border px-4 py-2">Chain</th>
                            <th className="border px-4 py-2">Chain Address</th>
                            <th className="border px-4 py-2">Encryption?</th>
                            <th className="border px-4 py-2">Encryption key</th>
                            <th className="border px-4 py-2"></th>
                            <th className="border px-4 py-2"></th>
                            <th className="border px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {endpoints.map((endpoint, index) => (
                            <DashboardRow
                                key={index}
                                index={index}
                                url={endpoint.url}
                                isEncrypted={endpoint.isEncrypted}
                                encryptionKey={endpoint.encryptionKey}
                                jsonParameters={endpoint.jsonParameters}
                                contractAddress={endpoint.contractAddress}
                                setEncrypted={newValue => setEncrypted(index, newValue)}
                                updateEncryptionKey={key => updateEncryptionKey(index, key)}
                                updateJsonParameters={jsonParameters => updateJsonParameters(index, jsonParameters)}
                                onDelete={() => onDelete(index)}
                                chainOption={endpoint.chainOption}
                                updateChainOption={newOption => updateChainOption(index, newOption)}
                                onSave={() => onSave(index)}
                                updateContractAddress={address => updateContractAddress(index, address)}
                            />
                        ))}
                    </tbody>

                </table>
            </div>

            <div className='h-10' />

            <div className="flex items-center mb-5 bg-gray-200 rounded-xl">
                <URLInput onUpdate={setNewEndpoint} placeholder="Add new API endpoint" />
                <button onClick={handleAddEndpoint} disabled={newEndpoint.length === 0 || !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(newEndpoint)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md">Add</button>
            </div>
        </div>
    );
}


export default Dashboard;