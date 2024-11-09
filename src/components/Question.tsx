// src/components/Question.tsx
import React, { useState } from "react";
import { Word } from "../types/types";

interface QuestionProps {
  word: Word;
  onAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ word, onAnswer }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAnswer(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="text-center">
      <div className="text-xl font-bold text-white mb-4">
        <h2>{word.definition}</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex justify-center items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="p-2 rounded-md text-black"
          placeholder="Escribe tu respuesta"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Question;
