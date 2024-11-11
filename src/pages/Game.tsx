import { Howl } from "howler";
import React, { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import WordWheel from "../components/WordWheel";
import Question from "../components/Question";
import Score from "../components/Score";
import { wordsData } from "../data/questions";
import { Word } from "../types/types";
import Background from "../components/Background";

import CorrectSound from "../assets/sounds/correct_sound.wav";
import IncorrectSound from "../assets/sounds/incorrect_sound.wav";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const tempWords = wordsData.map((word) => ({
    ...word,
    status: "pending" as "pending",
  }));
  const [words, setWords] = useState<Word[]>(tempWords);
  const [index, setIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [remainingTime, setRemainingTime] = useState(120);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Sonidos con Howler.js
  const correctSound = new Howl({
    src: CorrectSound,
  });
  const incorrectSound = new Howl({
    src: IncorrectSound,
  });

  // Control del contador de cuenta atrás de inicio
  useEffect(() => {
    if (countdown === -1) {
      setGameStarted(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Temporizador del juego
  useEffect(() => {
    if (gameStarted && !isPaused) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, isPaused]);

  // Lógica para manejar respuestas
  const handleAnswer = (answer: string) => {
    const currentWord = words[index];

    if (currentWord.status === "pending") {
      if (answer.toLowerCase() === currentWord.word.toLowerCase()) {
        currentWord.status = "correct";
        setCorrectAnswers((prev) => prev + 1);
        correctSound.play();
      } else {
        currentWord.status = "incorrect";
        incorrectSound.play();
        setIsPaused(true);
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }

      setWords((prevWords) => {
        const updatedWords = [...prevWords];
        updatedWords[index] = currentWord;
        return updatedWords;
      });

      const nextIndex = findNextIndex(index + 1);
      setIndex(nextIndex);
    }
  };

  // Función para encontrar el siguiente índice no contestado
  const findNextIndex = (startIndex: number): number => {
    let nextIndex = startIndex;

    // Buscamos la siguiente palabra que esté pendiente
    while (words[nextIndex % words.length].status !== "pending") {
      nextIndex++;
    }

    return nextIndex % words.length;
  };

  // Ir al menú principal
  const goToMenu = () => {
    navigate("/home");
  };

  // Reiniciar el juego
  const restartGame = () => {
    const resetWords: Word[] = wordsData.map((word) => ({
      ...word,
      status: "pending" as "pending",
    }));

    setWords(resetWords);
    setIndex(0);
    setCorrectAnswers(0);
    setRemainingTime(120);
    setCountdown(5);
    setGameStarted(false);
    setIsPaused(false);
  };

  // Manejo de las teclas Escape y Enter
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && !isPaused) {
      setIsPaused(true);
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    } else if (e.key === "Enter" && isPaused) {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      setIsPaused(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center items-center relative font-rubik">
      {/* Fondo animado */}
      <Background />

      {/* Botón para volver al menú */}
      <button
        onClick={goToMenu}
        className="absolute top-8 left-8 p-2 bg-transparent text-white rounded-full hover:bg-white hover:text-primary transition duration-200"
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>

      {/* Botón para reiniciar el juego */}
      <button
        onClick={restartGame}
        className="absolute top-8 right-8 p-2 bg-transparent text-white rounded-full hover:bg-white hover:text-primary transition duration-200"
      >
        <ArrowPathIcon className="w-8 h-8" />
      </button>

      <div className="p-8 flex flex-col justify-center items-center w-full">
        {/* Contador de inicio de 5 segundos */}
        {!gameStarted && (
          <div className="absolute text-white text-9xl font-bold mb-64">
            {countdown > 0 ? countdown : "¡YA!"}
          </div>
        )}

        {/* Rosco */}
        <div className="relative mt-40 flex justify-center items-center w-full">
          {/* Tiempo a los lados rosco */}
          {gameStarted && (
            <div className="absolute z-0 w-3/4">
              <Score
                correctAnswers={correctAnswers}
                remainingTime={remainingTime}
              />
            </div>
          )}

          <WordWheel
            words={words}
            currentLetterIndex={index}
            ready={gameStarted}
          />
        </div>

        {/* Pregunta y respuesta abajo */}
        <div className="mt-56 w-full z-0">
          <Question
            word={words[index]}
            onAnswer={handleAnswer}
            ready={gameStarted}
            paused={isPaused}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
