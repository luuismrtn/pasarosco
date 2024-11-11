import React, { useState } from "react";
import { Word } from "../types/types";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

interface QuestionProps {
  word: Word;
  onAnswer: (answer: string) => void;
  ready: boolean;
  paused: boolean;
}

const Question: React.FC<QuestionProps> = ({
  word,
  onAnswer,
  ready,
  paused,
}) => {
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
      <div className="text-2xl font-semibold text-white border-2 border-gray-300 mb-6 rounded-xl shadow-lg p-4">
        {paused ? (
          // Mensaje cuando el juego está en pausa
          <h2 className="text-3xl font-semibold text-white">
            <span className="text-4xl">¡PASAPALABRA!</span>
            <br />
            <span className="text-xl">
              Ahora el mismo el tiempo no esta corriendo y tiempo para pensar,
              pulsa ENTER para seguir jugando
            </span>
          </h2>
        ) : ready ? (
          word.letterType === "start" ? (
            <h2 className="text-3xl font-semibold text-white">
              <span className="font-bold">Empieza por:</span>{" "}
              <span className="text-4xl">{word.letter}</span>
              <br />
              <span className="text-xl">{word.definition}</span>
            </h2>
          ) : (
            <h2 className="text-3xl font-semibold text-white">
              <span className="font-bold">Contiene la:</span>{" "}
              <span className="text-4xl">{word.letter}</span>
              <br />
              <span className="text-xl">{word.definition}</span>
            </h2>
          )
        ) : (
          <h2 className="text-3xl font-semibold text-white">
            <span className="italic">
              ¿Estás listo para responder a todas las preguntas?
            </span>
            <br />
            <span className="text-xl">¡Vamos a comprobarlo!</span>
          </h2>
        )}
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
          disabled={!ready || paused}
          className="p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2 text-xl"
          placeholder="Escribe tu respuesta"
        />

        <button
          type="submit"
          disabled={!ready || paused}
          className="flex items-center justify-center px-4 py-4 bg-purple-500 text-white rounded-full shadow-xl hover:bg-purple-700 focus:outline-none text-xl transition-all duration-300 ease-in-out"
        >
          <ArrowUpIcon className="w-8 h-8" />
        </button>
      </form>
    </div>
  );
};

export default Question;
