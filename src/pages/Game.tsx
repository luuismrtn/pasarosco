// src/pages/Game.tsx
import React, { useState, useEffect } from "react";
import WordWheel from "../components/WordWheel";
import Question from "../components/Question";
import Score from "../components/Score";
import { wordsData } from "../data/questions";
import { Word } from "../types/types";

const Game: React.FC = () => {
  const [words, setWords] = useState<Word[]>(wordsData);
  const [index, setIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [remainingTime, setRemainingTime] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="min-h-screen bg-primary">
      <div className="p-8">
        <Score correctAnswers={correctAnswers} remainingTime={remainingTime} />
        
        {/* Rosco */}
        <div className="mt-40">
          <WordWheel words={words} />
        </div>
        
        {/* Pregunta */}
        <div className="mt-64">
          <Question word={words[index]} onAnswer={handleAnswer} />
        </div>
      </div>
    </div>
  );
};

export default Game;
