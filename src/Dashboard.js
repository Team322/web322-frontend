import React, { useState, useEffect } from 'react';

const Dashboard = ({ sessionID }) => {
    const [userData, setUserData] = useState(null);
    const [newEndpoint, setNewEndpoint] = useState('');
    const [endpoints, setEndpoints] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://34.67.227.210/dashboard_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionID
            })
        })
            .then(response => response.json())
            .then(json => {
                setUserData(json);
                setIsLoading(false);
            })
            .catch(_ => {setUserData({
                apiCalls: [],
                apiEndpoints: [],
                username: "dummy",
            }); setIsLoading(false); })
    }, [sessionID]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAddEndpoint = () => {
        console.log(newEndpoint);
        setEndpoints([...endpoints, { url: newEndpoint, encrypted: false }]);
        setNewEndpoint('');
    };

    const handleToggleEncryption = (index) => {
        setEndpoints(prevEndpoints => {
            const updatedEndpoints = [...prevEndpoints];
            updatedEndpoints[index].encrypted = !updatedEndpoints[index].encrypted;
            return updatedEndpoints;
        });
        console.log(endpoints[index].encrypted);
    };

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-3xl font-bold mb-5">Hello, {userData.username}!</h1>

            <h2 className="text-xl font-bold mb-3">Recent API Calls</h2>
            <table className="table-auto mb-5">
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
            <ul className="mb-5">
                {endpoints.map((endpoint, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <a href={endpoint.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{endpoint.url}</a>
                        <div className="ml-2">
                            <label htmlFor={`encrypted-toggle-${index}`} className="text-sm font-medium">Encrypt</label>
                            <input type="checkbox" id={`encrypted-toggle-${index}`} checked={endpoint.encrypted} onClick={() => handleToggleEncryption(index)} className="ml-1" />
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex items-center mb-5">
                <input type="text" value={newEndpoint} onChange={(e) => setNewEndpoint(e.target.value)} className="border-gray-300 rounded-l-md py-2 px-4 block w-full sm:text-sm sm:leading-5" placeholder="Add new API endpoint" />
                <button onClick={handleAddEndpoint} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md">Add</button>
            </div>
        </div>
    );
}


export default Dashboard;