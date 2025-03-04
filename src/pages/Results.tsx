import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Word } from "../types/types";
import BackButton from "../components/BackButton";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary to-indigo-800 font-rubik">
      {/* Botón para regresar al menú */}
      <BackButton onClick={goToMenu} hoverText="hover:text-indigo-600" />

      {/* Título de resultados */}
      <h1 className="mb-10 text-6xl font-bold text-white font-rubik drop-shadow-lg">
        Resultados
      </h1>

      {/* Contenedor con las dos columnas */}
      <div className="grid w-2/3 grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow-2xl bg-opacity-20">
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
      <div className="mt-8 space-x-4">
        <button
          onClick={restartGame}
          className="px-6 py-4 text-xl font-bold text-white transition duration-200 bg-purple-500 rounded-full hover:bg-purple-700"
        >
          <ArrowPathIcon className="inline w-6 h-6 mr-2" />
          Reiniciar Juego
        </button>
        <button
          onClick={goToMenu}
          className="px-6 py-4 text-xl font-bold text-white transition duration-200 bg-blue-500 rounded-full hover:bg-blue-700"
        >
          Regresar al Menú
        </button>
      </div>
    </div>
  );
};

export default Results;
