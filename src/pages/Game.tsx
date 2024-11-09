import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import WordWheel from "../components/WordWheel";
import Question from "../components/Question";
import Score from "../components/Score";
import { wordsData } from "../data/questions";
import { Word } from "../types/types";
import Background from "../components/Background";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState<Word[]>(wordsData);
  const [index, setIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [remainingTime, setRemainingTime] = useState(120);
  const [countdown, setCountdown] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);

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

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  const handleAnswer = (answer: string) => {
    const currentWord = words[index];
    if (answer.toLowerCase() === currentWord.word.toLowerCase()) {
      currentWord.status = "correct";
      setCorrectAnswers(correctAnswers + 1);
    } else {
      currentWord.status = "incorrect";
    }

    setWords([...words]);
    setIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const goToMenu = () => {
    navigate("/home");
  };

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

      <div className="p-8 flex flex-col justify-center items-center w-full">
        {/* Contador de inicio de 5 segundos */}
        {!gameStarted && (
          <div className="absolute text-white text-9xl font-bold mb-64">
            {countdown > 0 ? countdown : "¡YA!"}
          </div>
        )}

        {/* Rosco */}
        <div className="relative mt-40 flex justify-center items-center w-80">
          {/* Tiempo en el centro del rosco */}
          {gameStarted && (
            <div className="absolute z-10">
              <Score
                correctAnswers={correctAnswers}
                remainingTime={remainingTime}
              />
            </div>
          )}

          <WordWheel words={words} />
        </div>

        {/* Pregunta y respuesta abajo */}
        <div className="mt-56 w-full z-0">
            <Question word={words[index]} onAnswer={handleAnswer} />
        </div>
      </div>
    </div>
  );
};

export default Game;
