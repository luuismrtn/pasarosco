import React from 'react';

interface ScoreProps {
  correctAnswers: number;
  remainingTime: number;
}

const Score: React.FC<ScoreProps> = ({ correctAnswers, remainingTime }) => {
  return (
    <div className="flex justify-between p-4">
      <p>Score: {correctAnswers}</p>
      <p>Time: {remainingTime}s</p>
    </div>
  );
};

export default Score;
