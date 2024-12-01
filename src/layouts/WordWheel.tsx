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
  const [heightCircle, setHeightCircle] = useState<number>(10);
  const [marginBottom, setMarginBottom] = useState<number>(10);


  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 1280) {
        setRadius(200);
        setHeightCircle(8);
        setMarginBottom(0);
      } else if (window.innerWidth < 1350) {
        setRadius(220);
        setHeightCircle(12);
        setMarginBottom(6);
      } else if (window.innerWidth >= 1350) {
        setRadius(250);
        setHeightCircle(12);
        setMarginBottom(12);
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
    <div className={`relative flex justify-center items-center w-full h-64 lg:h-32 mb-${marginBottom}`}>
      {/* Letra activa en el centro */}
      {ready && (
        <div className="absolute flex items-center justify-center w-32 h-32 text-white text-9xl font-bold rounded-full z-10 lg:text-8xl xl:text-9xl">
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
                  className={`flex lg:text-sm xl:text-base 2xl:text-lg justify-center items-center w-${heightCircle} h-${heightCircle} border-4 border-white rounded-full text-white text-lg font-bold ${
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
