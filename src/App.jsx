import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://socket.maskser.me/');

const App = () => {
  const [userCount, setUserCount] = useState(0);
  const [isCountAnimating, setIsCountAnimating] = useState(false);
  useEffect(() => {
    socket.on('userCount', (count) => {
      setIsCountAnimating(true);
    
      setTimeout(() => {
        setUserCount(count-1);
        setIsCountAnimating(false);
      }, 500);
    });

    return () => {
      socket.off('userCount');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
        <h1 className="text-4xl font-bold text-indigo-400 mb-4">Izumi-v3</h1>
        <div className="flex items-center justify-center">
          <div
            className={`text-6xl font-bold text-indigo-400 transition-all duration-500 ${
              isCountAnimating ? 'scale-150' : ''
            }`}
          >
            {userCount}
          </div>
          <span className="text-2xl font-semibold text-gray-400 ml-4">Users Online</span>
        </div>
      </div>
    </div>
  );
};

export default App;
