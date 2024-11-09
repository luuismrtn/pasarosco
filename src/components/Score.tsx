import React from "react";

interface ScoreProps {
  correctAnswers: number;
  remainingTime: number;
}

const Score: React.FC<ScoreProps> = ({ correctAnswers, remainingTime }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-white text-4xl font-bold mb-2">Time: {remainingTime}s</p>
      <p className="text-white text-5xl font-bold mt-2">Score: {correctAnswers}</p>
    </div>
  );
};

export default Score;
