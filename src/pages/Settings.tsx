import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { useNavigate } from "react-router";
import BgGame from "../assets/sounds/bg_game.wav";
import EffectSound from "../assets/sounds/correct_sound.wav";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import BackButton from "../components/BackButton";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [bgVolume, setBgVolume] = useState<number>(0.5);
  const [effectVolume, setEffectVolume] = useState<number>(0.5);
  const [isBgMuted, setIsBgMuted] = useState<boolean>(false);
  const [isEffectsMuted, setIsEffectsMuted] = useState<boolean>(false);

  const bgMusicRef = useRef<Howl | null>(null);
  const effectSoundRef = useRef<Howl | null>(null);

  const [showRoscoId, setShowRoscoId] = useState<boolean>(true);

  useEffect(() => {
    const savedBgVolume = localStorage.getItem("bgVolume");
    const savedEffectVolume = localStorage.getItem("effectVolume");
    const savedBgMuted = localStorage.getItem("isBgMuted");
    const savedEffectsMuted = localStorage.getItem("isEffectsMuted");
    const savedShowRoscoId = localStorage.getItem("showRoscoId");

    if (savedBgVolume) {
      setBgVolume(parseFloat(savedBgVolume));
    }
    if (savedEffectVolume) {
      setEffectVolume(parseFloat(savedEffectVolume));
    }
    if (savedBgMuted) {
      setIsBgMuted(savedBgMuted === "true");
    }
    if (savedEffectsMuted) {
      setIsEffectsMuted(savedEffectsMuted === "true");
    }
    if (savedShowRoscoId) {
      setShowRoscoId(savedShowRoscoId === "true");
    }
  }, []);

  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Howl({
        src: [BgGame],
        loop: true,
        volume: isBgMuted ? 0 : bgVolume,
      });
    }

    return () => {
      if (bgMusicRef.current && !isBgMuted) {
        bgMusicRef.current.stop();
        bgMusicRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume(isBgMuted ? 0 : bgVolume);
    }
  }, [bgVolume, isBgMuted]);

  useEffect(() => {
    if (!effectSoundRef.current) {
      effectSoundRef.current = new Howl({
        src: [EffectSound],
        volume: isEffectsMuted ? 0 : effectVolume,
      });
    } else {
      effectSoundRef.current.volume(isEffectsMuted ? 0 : effectVolume);
    }

    return () => {
      if (effectSoundRef.current && !isEffectsMuted) {
        effectSoundRef.current.stop();
        effectSoundRef.current = null;
      }
    };
  }, [effectVolume, isEffectsMuted]);

  const handleBgVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setBgVolume(newVolume);
    if (bgMusicRef.current) {
      bgMusicRef.current.volume(newVolume);
    }
    localStorage.setItem("bgVolume", newVolume.toString());
  };

  const handleEffectVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseFloat(event.target.value);
    setEffectVolume(newVolume);
    if (effectSoundRef.current) {
      effectSoundRef.current.volume(newVolume);
    }
    localStorage.setItem("effectVolume", newVolume.toString());
  };

  const toggleBgMute = () => {
    setIsBgMuted((prev) => {
      const newState = !prev;
      localStorage.setItem("isBgMuted", newState.toString());
      return newState;
    });
  };

  const toggleEffectsMute = () => {
    setIsEffectsMuted((prev) => {
      const newState = !prev;
      localStorage.setItem("isEffectsMuted", newState.toString());
      return newState;
    });
  };

  const toggleShowRoscoId = () => {
    setShowRoscoId((prev) => {
      const newState = !prev;
      localStorage.setItem("showRoscoId", newState.toString());
      return newState;
    });
  };

  const handlePlayEffectSound = () => {
    if (effectSoundRef.current) {
      effectSoundRef.current.play();
    }
  };

  const handlePlayMusic = () => {

    if (bgMusicRef.current?.playing()) {
      bgMusicRef.current.pause();
      return;
    }

    if (bgMusicRef.current) {
      bgMusicRef.current.play();
      return;
    }
    
  };

  const goToMenu = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.stop();
    }
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gradient-to-r from-indigo-600 to-purple-600 font-rubik">
      <BackButton onClick={goToMenu} hoverText="hover:text-indigo-600" />

      {/* Título */}

      <h1 className="mt-16 mb-20 text-6xl font-extrabold text-white drop-shadow-lg md:text-6xl lg:mt-16 lg:mb-16">
        Configuración
      </h1>

      {/* Contenedor para el volumen de música de fondo */}
      <div className="w-1/3 p-8 text-center transition-all transform bg-white rounded-lg shadow-2xl bg-opacity-20 hover:scale-105 hover:shadow-xl lg:w-2/3">
        <label htmlFor="bgVolume" className="block mb-4 text-2xl font-semibold">
          Volumen Música de Fondo
        </label>
        <div className="flex items-center justify-center space-x-4">
          <input
            id="bgVolume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={bgVolume}
            onChange={handleBgVolumeChange}
            className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer accent-indigo-600"
          />
          {/* Icono de mute o de voz */}
          <div onClick={toggleBgMute} className="cursor-pointer">
            {isBgMuted ? (
              <SpeakerXMarkIcon className="w-6 h-6 text-white transition duration-200 animate-fill" />
            ) : (
              <SpeakerWaveIcon className="w-6 h-6 text-white transition duration-200 animate-fill" />
            )}
          </div>
        </div>
        {isBgMuted ? (
          <p className="mt-4 text-xl font-semibold">
            {Math.round(bgVolume * 100)}% (Silenciado)
          </p>
        ) : (
          <p className="mt-4 text-xl font-semibold">
            {Math.round(bgVolume * 100)}%
          </p>
        )}
        {/* Botón para probar el sonido */}
        <button
          onClick={handlePlayMusic}
          className="px-6 py-2 mt-6 text-white transition duration-300 ease-in-out transform bg-indigo-700 rounded-lg shadow-lg hover:bg-indigo-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Probar Música
        </button>
      </div>

      {/* Contenedor para efectos de sonido */}
      <div className="w-1/3 p-8 mt-6 text-center transition-all transform bg-white rounded-lg shadow-2xl bg-opacity-20 hover:scale-105 hover:shadow-xl lg:w-2/3">
        <label
          htmlFor="effectVolume"
          className="block mb-4 text-2xl font-semibold"
        >
          Volumen Efectos de Sonido
        </label>
        <div className="flex items-center justify-center space-x-4">
          <input
            id="effectVolume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={effectVolume}
            onChange={handleEffectVolumeChange}
            className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer accent-indigo-600"
          />
          {/* Icono de mute o de voz */}
          <div onClick={toggleEffectsMute} className="cursor-pointer">
            {isEffectsMuted ? (
              <SpeakerXMarkIcon className="w-6 h-6 text-white transition duration-200 animate-fill" />
            ) : (
              <SpeakerWaveIcon className="w-6 h-6 text-white transition duration-200 animate-fill" />
            )}
          </div>
        </div>
        {isEffectsMuted ? (
          <p className="mt-4 text-xl font-semibold">
            {Math.round(effectVolume * 100)}% (Silenciado)
          </p>
        ) : (
          <p className="mt-4 text-xl font-semibold">
            {Math.round(effectVolume * 100)}%
          </p>
        )}
        {/* Botón para probar el sonido */}
        <button
          onClick={handlePlayEffectSound}
          className="px-6 py-2 mt-6 text-white transition duration-300 ease-in-out transform bg-indigo-700 rounded-lg shadow-lg hover:bg-indigo-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Probar Efecto
        </button>
      </div>

      {/* Contenedor para mostrar el ID del rosco */}
      <div className="w-1/3 p-8 mt-6 mb-16 text-center transition-all transform bg-white rounded-lg shadow-2xl bg-opacity-20 hover:scale-105 hover:shadow-xl lg:w-2/3">
        <label
          htmlFor="showRoscoId"
          className="block mb-4 text-2xl font-semibold"
        >
          ¿Mostrar el ID del Rosco en la pantalla?
        </label>

        <div className="flex items-center justify-center space-x-4">
          {/* Switch Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="showRoscoId"
              checked={showRoscoId}
              onChange={toggleShowRoscoId}
              className="sr-only"
            />
            <div
              className={`w-14 h-8 rounded-full transition-all duration-300 ${
                showRoscoId ? "bg-blue-500" : "bg-red-500"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                showRoscoId ? "transform translate-x-6 bg-white" : "bg-white"
              }`}
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
