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
  const [sizeLetter, setSizeLetter] = useState<string>("");


  useEffect(() => {
    const updateRadius = () => {
      if (window.innerHeight > 1050) {
        setRadius(280);
        setHeightCircle(14);
        setSizeLetter("xl");
      } else if (window.innerHeight <= 1050 && window.innerHeight > 860) {
        setRadius(250);
        setHeightCircle(12);
        setSizeLetter("lg");
      } else if (window.innerHeight <= 860 && window.innerHeight > 650) {
        setRadius(180);
        setHeightCircle(8);
        setSizeLetter("base");
      } else if (window.innerHeight <= 650 && window.innerHeight > 400) {
        setRadius(140);
        setHeightCircle(7);
        setSizeLetter("xs");
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
    <div className={`relative flex justify-center items-center w-full h-64 lg:h-32`}>
      {/* Letra activa en el centro */}
      {ready && (
        <div className="absolute z-10 flex items-center justify-center w-32 h-32 font-bold text-white rounded-full text-9xl lg:text-8xl xl:text-9xl">
          {letters[currentLetterIndex]}
        </div>
      )}

      {/* Letras alrededor del círculo */}
      <div className="absolute flex items-center justify-center w-full h-full">
        <div className="relative flex items-center justify-center w-48 h-48 rounded-full">
          {letters.map((letter, index) => {
            const angle = (360 / letters.length) * index - 90;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            const currentWord = words[index];

            return (
              <div
                key={index}
                className="absolute origin-center transform top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
              >
                <div
                  className={`flex text-${sizeLetter} justify-center items-center w-${heightCircle} h-${heightCircle} border-4 border-white rounded-full text-white text-lg font-bold ${
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
