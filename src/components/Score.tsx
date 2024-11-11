import React from "react";

interface ScoreProps {
  correctAnswers: number;
  remainingTime: number;
}

const Score: React.FC<ScoreProps> = ({ correctAnswers, remainingTime }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full p-4">
      {/* Score al inicio */}
      <p className="text-white text-5xl font-bold border-4 border-white rounded-full w-36 h-36 flex items-center justify-center">
        {correctAnswers}
      </p>

      {/* Time al final */}
      <p className="text-white text-5xl font-bold border-4 border-white rounded-full w-36 h-36 flex items-center justify-center">
        {remainingTime}
      </p>
    </div>
  );
};

export default Score;
