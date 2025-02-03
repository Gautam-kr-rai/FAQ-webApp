import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to FAQ</h1>
        <p className="text-xl">Your go-to place for all frequently asked questions.</p>
      
      </div>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="text-blue-800"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className='text-blue-800'
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
