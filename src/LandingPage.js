import React, { useState } from 'react';
import SignUpModal from './SignUp';
import LogInModal from './LogIn';

export default function LandingPage({onLoggedIn}) {

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSignupModalOpen = () => {
    setIsSignupModalOpen(true);
  };

  const handleSignupModalClose = () => {
    setIsSignupModalOpen(false);
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-8xl font-bold mb-8">Web3 👉 2</h1>
        <div className="flex space-x-6 m-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded mx-10 text-4xl" onClick={handleSignupModalOpen}>
            Sign up
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-8 rounded mx-10 text-4xl" onClick={handleLoginModalOpen}>
            Log in
          </button>
          <SignUpModal isOpen={isSignupModalOpen} onClose={handleSignupModalClose} />
          <LogInModal isOpen={isLoginModalOpen} onClose={handleLoginModalClose} onLoggedIn={onLoggedIn}/>
        </div>
      </div>
    )
}