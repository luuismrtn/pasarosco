import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { Word } from "../types/types";

const Results: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { correctAnswers, wrongAnswers, time, words, id } = location.state || {};
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [wordsState] = useState<Word[]>(words || []);

  useEffect(() => {
    if (time !== undefined) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      setFormattedTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    }
  }, [time]);

  const restartGame = () => {
    navigate("/game/" + id);
  };

  const goToMenu = () => {
    navigate("/home");
  };

  // Función para determinar el color de cada palabra según el estado
  const getStatusColor = (status: "correct" | "incorrect" | "pending") => {
    switch (status) {
      case "correct":
        return "text-green-400 drop-shadow";
      case "incorrect":
        return "text-rose-600 drop-shadow";
      case "pending":
        return "text-white drop-shadow";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-indigo-800 flex flex-col items-center justify-center p-4 font-rubik">
      {/* Botón para regresar al menú */}
      <button
        onClick={goToMenu}
        className="absolute top-8 left-8 p-2 bg-white bg-opacity-10 text-white rounded-full hover:bg-opacity-20 transition duration-200"
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>

      {/* Título de resultados */}
      <h1 className="text-6xl font-bold text-white font-rubik mb-10 drop-shadow-lg">
        Resultados
      </h1>

      {/* Contenedor con las dos columnas */}
      <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-2xl w-2/3 grid grid-cols-2 gap-8">
        {/* Columna de estadísticas */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">
            <span className="font-bold">¡Juego terminado!</span>
          </h2>

          <div className="text-xl text-white">
            <p>
              <span className="font-semibold">Respuestas Correctas:</span> {correctAnswers}
            </p>
            <p>
              <span className="font-semibold">Respuestas Incorrectas:</span> {wrongAnswers}
            </p>
            <p>
              <span className="font-semibold">Respuestas sin contestar:</span> {wordsState.length - wrongAnswers - correctAnswers}
            </p>
            <p>
              <span className="font-semibold">Tiempo Total:</span> {formattedTime}
            </p>
          </div>

          {/* Mensaje motivacional */}
          <div className="mt-6">
            {correctAnswers / (correctAnswers + wrongAnswers) > 0.8 ? (
              <p className="text-2xl text-green-400">¡Excelente trabajo! 🎉</p>
            ) : correctAnswers / (correctAnswers + wrongAnswers) > 0.5 ? (
              <p className="text-2xl text-yellow-400">¡Buen trabajo! Sigue practicando.</p>
            ) : (
              <p className="text-2xl text-rose-600">¡No te rindas! Puedes mejorar.</p>
            )}
          </div>
        </div>

        {/* Columna de preguntas */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Preguntas</h2>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
            {/* Mapeando correctamente las palabras */}
            {wordsState.map((word, index) => (
              <p
                key={index}
                className={`text-xl font-medium ${getStatusColor(word.status)}`}
              >
                {word.word[0]}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Botones para reiniciar o regresar */}
      <div className="space-x-4 mt-8">
        <button
          onClick={restartGame}
          className="px-6 py-4 text-white font-bold text-xl rounded-full bg-purple-500 hover:bg-purple-700 transition duration-200"
        >
          <ArrowPathIcon className="w-6 h-6 inline mr-2" />
          Reiniciar Juego
        </button>
        <button
          onClick={goToMenu}
          className="px-6 py-4 text-white font-bold text-xl rounded-full bg-blue-500 hover:bg-blue-700 transition duration-200"
        >
          Regresar al Menú
        </button>
      </div>
    </div>
  );
};

export default Results;
