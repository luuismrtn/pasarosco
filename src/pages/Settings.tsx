import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import BgGame from "../assets/sounds/bg_game.wav";
import EffectSound from "../assets/sounds/correct_sound.wav";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [bgVolume, setBgVolume] = useState<number>(0.5);
  const [effectVolume, setEffectVolume] = useState<number>(0.5);
  const [isBgMuted, setIsBgMuted] = useState<boolean>(false);
  const [isEffectsMuted, setIsEffectsMuted] = useState<boolean>(false);

  const bgMusicRef = useRef<Howl | null>(null);
  const effectSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    const savedBgVolume = localStorage.getItem("bgVolume");
    const savedEffectVolume = localStorage.getItem("effectVolume");
    const savedBgMuted = localStorage.getItem("isBgMuted");
    const savedEffectsMuted = localStorage.getItem("isEffectsMuted");

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
  }, []);

  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Howl({
        src: [BgGame],
        loop: true,
        volume: isBgMuted ? 0 : bgVolume,
      });
    }
    if (!isBgMuted) {
      bgMusicRef.current.play();
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.stop();
        bgMusicRef.current = null;
      }
    };
  }, [bgVolume, isBgMuted]);

  useEffect(() => {
    if (!effectSoundRef.current) {
      effectSoundRef.current = new Howl({
        src: [EffectSound],
        volume: isEffectsMuted ? 0 : effectVolume,
      });
    }

    return () => {
      if (effectSoundRef.current) {
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

  const handlePlayEffectSound = () => {
    if (effectSoundRef.current) {
      effectSoundRef.current.play();
    }
  };

  const goToMenu = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col justify-center items-center font-rubik text-white">
      <button
        onClick={goToMenu}
        className="absolute top-8 left-8 p-2 bg-white bg-opacity-10 text-white rounded-full hover:bg-opacity-20 transition duration-200"
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>

      <h1 className="text-6xl font-extrabold mt-15 mb-20 text-white drop-shadow-lg">
        Configuración
      </h1>

      {/* Contenedor para el volumen de música de fondo */}
      <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-2xl w-1/3 text-center transform transition-all hover:scale-105 hover:shadow-xl">
        <label htmlFor="bgVolume" className="text-2xl font-semibold mb-4 block">
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
              <SpeakerXMarkIcon className="w-6 h-6 text-gray-500 hover:text-white transition duration-200" />
            ) : (
              <SpeakerWaveIcon className="w-6 h-6 text-white hover:text-gray-500 transition duration-200" />
            )}
          </div>
        </div>
        <p className="mt-4 text-xl font-semibold">
          {Math.round(bgVolume * 100)}%
        </p>
      </div>

      {/* Contenedor para efectos de sonido */}
      <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-2xl w-1/3 mt-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
        <label
          htmlFor="effectVolume"
          className="text-2xl font-semibold mb-4 block"
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
              <SpeakerXMarkIcon className="w-6 h-6 text-gray-500 hover:text-white transition duration-200" />
            ) : (
              <SpeakerWaveIcon className="w-6 h-6 text-white hover:text-gray-500 transition duration-200" />
            )}
          </div>
        </div>
        <p className="mt-4 text-xl font-semibold">
          {Math.round(effectVolume * 100)}%
        </p>
        {/* Botón para probar el sonido */}
        <button
          onClick={handlePlayEffectSound}
          className="mt-6 py-2 px-6 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Probar Efecto
        </button>
      </div>
    </div>
  );
};

export default Settings;