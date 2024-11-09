import React, { useState } from "react";
import { Word } from "../types/types";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

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
    <div className="text-center mx-20">
      {/* Pregunta */}
      <div className="text-2xl font-semibold text-white border-2 border-gray-300 mb-6 rounded-xl shadow-lg p-8">
        <h2>{word.definition}</h2>
      </div>

      {/* Formulario de respuesta */}
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center space-x-6"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2 text-xl"
          placeholder="Escribe tu respuesta"
        />

        <button
          type="submit"
          className="flex items-center justify-center px-4 py-4 bg-purple-500 text-white rounded-full shadow-xl hover:bg-purple-700 focus:outline-none text-xl transition-all duration-300 ease-in-out"
        >
          <ArrowUpIcon className="w-8 h-8" />
        </button>
      </form>
    </div>
  );
};

export default Question;
