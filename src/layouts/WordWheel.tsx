import React, { useEffect, useState } from "react";
import { Word } from "../types/types";

interface WordWheelProps {
  words: Word[];
  currentLetterIndex: number;
  ready: boolean;
}

const WordWheel: React.FC<WordWheelProps> = ({
  words,
  currentLetterIndex,
  ready,
}) => {
  const [radius, setRadius] = useState<number>(275);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 1280) {
        setRadius(200);
      } else {
        setRadius(275);
      }
    };

    window.addEventListener("resize", updateRadius);

    updateRadius();

    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);
  const letters = words.map((word) => word.letter);

  return (
    <div className="relative flex justify-center items-center w-full h-64 md:h-32">
      {/* Letra activa en el centro */}
      {ready && (
        <div className="absolute flex items-center justify-center w-32 h-32 text-white text-9xl md:text-8xl font-bold rounded-full z-10">
          {letters[currentLetterIndex]}
        </div>
      )}

      {/* Letras alrededor del círculo */}
      <div className="absolute flex items-center justify-center w-full h-full">
        <div className="relative w-48 h-48 rounded-full flex justify-center items-center">
          {letters.map((letter, index) => {
            const angle = (360 / letters.length) * index - 90;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            const currentWord = words[index];

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 transform origin-center"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
              >
                <div
                  className={`flex justify-center items-center w-12 h-12 md:w-10 md:h-10 border-4 border-white rounded-full text-white text-lg font-bold ${
                    index === currentLetterIndex && ready ? "blinking" : ""
                  } ${
                    currentWord.status === "pending"
                      ? ""
                      : currentWord.status === "correct"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {letter}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WordWheel;
