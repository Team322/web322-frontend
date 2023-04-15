import React, { useState } from 'react';

const attemptLogin = async (username, password, onLoggedIn) => {
    const response = await fetch('https://34.67.227.210/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      onLoggedIn(response.body['SessionID']);
}

export default function LogInModal({ isOpen, onClose, onLoggedIn}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h1 className="text-2xl font-bold mb-4" id="modal-headline">
                                    Log In
                                </h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                            Username
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="username"
                                            type="text"
                                            placeholder="Enter your username"
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() => attemptLogin(username, password, onLoggedIn)}
                                        >
                                            Log In
                                        </button>
                                        <button
                                            className="inline-block align-bottom text-red-500 hover:text-red-700 text-sm font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
