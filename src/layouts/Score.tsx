import React from "react";

interface ScoreProps {
  correctAnswers: number;
  remainingTime: number;
}

const Score: React.FC<ScoreProps> = ({ correctAnswers, remainingTime }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full p-4">
      {/* Score al inicio */}
      <p className="flex items-center justify-center text-5xl font-bold text-white border-4 border-white rounded-full lg:text-4xl lg:w-32 lg:h-32 xl:w-36 xl:h-36 w-36 h-36">
        {correctAnswers}
      </p>

      {/* Time al final */}
      <p className="flex items-center justify-center text-5xl font-bold text-white border-4 border-white rounded-full lg:text-4xl lg:w-32 lg:h-32 xl:w-36 xl:h-36 w-36 h-36">
        {remainingTime}
      </p>
    </div>
  );
};

export default Score;
