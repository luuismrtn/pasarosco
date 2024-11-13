import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Howl } from "howler";
import BgMusic from "../assets/sounds/background_home.wav";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [bgVolume, setBgVolume] = useState<number>(0.5);
  const [isBgMuted, setIsBgMuted] = useState<boolean>(false);

  useEffect(() => {
    const savedBgVolume = localStorage.getItem("bgVolume");
    const savedIsBgMuted = localStorage.getItem("isBgMuted");

    if (savedBgVolume) {
      setBgVolume(parseFloat(savedBgVolume));
    }
    if (savedIsBgMuted) {
      setIsBgMuted(savedIsBgMuted === "true");
    }
  }, []);

  useEffect(() => {
    const bgMusic = new Howl({
      src: [BgMusic],
      loop: true,
      volume: isBgMuted ? 0 : bgVolume,
    });

    bgMusic.play();

    return () => {
      if (!isBgMuted) {
        bgMusic.stop();
      }
    };
  }, [bgVolume, isBgMuted]);

  const handleGameStart = () => {
    const randNum = Math.floor(Math.random() * 5);
    navigate("/game/" + randNum);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-indigo-800 flex flex-col items-center justify-center p-4 pb-26">
      {/* Título principal */}
      <h1 className="text-9xl font-bold text-white font-rubik mb-4 drop-shadow-lg">
        Pasapalabra
      </h1>

      {/* Subtítulo */}
      <h2 className="text-3xl font-semibold text-white font-rubik mb-12 drop-shadow-lg">
        ¡El juego de palabras que pondrá a prueba tus conocimientos sobre el castellano!
      </h2>

      {/* Caja de opciones */}
      <div className="text-center p-8 w-full max-w-md">
        <div className="space-y-6">
          <button
            onClick={() => handleGameStart()}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          >
            JUGAR
          </button>
          <button
            onClick={() => navigate("/roscos")}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          >
            LISTA DE ROSCOS
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          >
            OPCIONES
          </button>
          <button
            onClick={() => navigate("/credits")}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          >
            CREDITOS
          </button>
        </div>
      </div>

      {/* Versión de la app en la parte inferior izquierda */}
      <div className="absolute bottom-4 left-4 text-white text-sm font-medium font-rubik">
        Versión 1.1.2
      </div>
    </div>
  );
};

export default Home;
