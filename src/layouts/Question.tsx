import React, { useEffect, useState } from "react";
import { Word } from "../types/types";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

interface QuestionProps {
  word: Word;
  onAnswer: (answer: string) => void;
  ready: boolean;
  paused: boolean;
  failed: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const Question: React.FC<QuestionProps> = ({
  word,
  onAnswer,
  ready,
  paused,
  failed,
  inputRef,
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

  useEffect(() => {
    if (failed || paused) {
      setInputValue("");
    }
  }, [failed, paused]);

  return (
    <div className="mx-20 text-center">
      {/* Pregunta */}
      <div className="p-4 mb-6 text-2xl font-semibold text-white border-2 border-gray-300 shadow-lg lg:text-xl xl:text-2xl rounded-xl">
        {failed ? (
          // Mensaje cuando el jugador ha fallado
          <h2 className="text-3xl font-bold text-red-600 lg:text-2xl xl:text-3xl">
            <span className="text-4xl">¡FALLASTE!</span>
            <br />
            <span className="text-xl text-white lg:text-lg xl:text-xl">
              La respuesta correcta es:{" "}
              <span className="font-bold text-red-600">{word.word[0]}</span>. Pulsa ENTER para seguir jugando
            </span>
          </h2>
        ) : paused ? (
          // Mensaje cuando el juego está en pausa
          <h2 className="text-3xl font-semibold text-white lg:text-2xl xl:text-3xl">
            <span className="text-4xl lg:text-3xl xl:text-4xl">¡PASAPALABRA!</span>
            <br />
            <span className="text-xl lg:text-lg xl:text-xl">
              Ahora el mismo el tiempo no esta corriendo y tiempo para pensar,
              pulsa ENTER para seguir jugando
            </span>
          </h2>
        ) : ready ? (
          word.letterType === "start" ? (
            <h2 className="text-3xl font-semibold text-white lg:text-2xl xl:text-3xl">
              <span className="font-bold">Empieza por:</span>{" "}
              <span className="text-4xl lg:text-3xl xl:text-4xl">{word.letter}</span>
              <br />
              <span className="text-xl lg:text-lg xl:text-xl">{word.definition}</span>
            </h2>
          ) : (
            <h2 className="text-3xl font-semibold text-white">
              <span className="font-bold">Contiene la:</span>{" "}
              <span className="text-4xl lg:text-3xl xl:text-4xl">{word.letter}</span>
              <br />
              <span className="text-xl lg:text-lg xl:text-xl">{word.definition}</span>
            </h2>
          )
        ) : (
          <h2 className="text-3xl font-semibold text-white lg:text-2xl xl:text-3xl">
            <span className="italic">
              ¿Estás listo para responder a todas las preguntas?
            </span>
            <br />
            <span className="text-xl lg:text-lg xl:text-xl">¡Vamos a comprobarlo!</span>
          </h2>
        )}
      </div>

      {/* Formulario de respuesta */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center space-x-6"
      >
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          disabled={!ready || paused || failed}
          className="w-1/2 p-4 text-xl text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-lg lg:h-12 xl:text-xl xl:h-14"
          placeholder="Escribe tu respuesta"
        />

        <button
          type="submit"
          disabled={!ready || paused || failed}
          className="flex items-center justify-center px-4 py-4 text-xl text-white transition-all duration-300 ease-in-out bg-purple-500 rounded-full shadow-xl hover:bg-purple-700 focus:outline-none lg:text-lg xl:text-xl"
        >
          <ArrowUpIcon className="w-8 h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
        </button>
      </form>
    </div>
  );
};

export default Question;
