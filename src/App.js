import React, { useState } from 'react';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';

export default function App() {

  const [isLoginDone, setLoginDone] = useState(false);
  const handleLoginDone = () => {
    setLoginDone(!isLoginDone);
  }

  function handleSessionIDChange() {
    setLoginDone(true);
  }

  return (
    <div>
      {/*<button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleLoginDone}>
        Toggle components
  </button>*/}
      {!isLoginDone ? <LandingPage onLoggedIn={handleSessionIDChange}/> : <Dashboard/>}
    </div>
  );
}