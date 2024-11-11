import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Howl } from "howler";
import BgMusic from "../assets/sounds/background_home.wav";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const bgMusic = new Howl({
    src: [BgMusic],
    loop: true,
    volume: 0.2,
  });

  useEffect(() => {
    bgMusic.play();

    return () => {
      bgMusic.stop();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-indigo-800 flex flex-col items-center justify-center p-4 pb-26">
      {/* Título principal */}
      <h1 className="text-9xl font-bold text-white font-rubik mb-16 drop-shadow-lg">
        Pasapalabra
      </h1>

      {/* Caja de opciones */}
      <div className="text-center p-8 w-full max-w-md">
        <div className="space-y-6">
          <button
            onClick={() => navigate("/game")}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          >
            JUGAR
          </button>
          <button
            onClick={() => navigate("/options")}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          >
            CRÉDITOS
          </button>
          <button
            onClick={() => navigate("/credits")}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          >
            OPCIONES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
