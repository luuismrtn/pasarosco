// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-black">Welcome to the Game!</h1>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/game")}
            className="w-full py-3 px-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            JUGAR
          </button>
          <button
            onClick={() => navigate("/options")}
            className="w-full py-3 px-6 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            OPCIONES
          </button>
          <button
            onClick={() => navigate("/credits")}
            className="w-full py-3 px-6 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
          >
            CREDITOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
