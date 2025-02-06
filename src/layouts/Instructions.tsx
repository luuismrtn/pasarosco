import React from "react";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

interface InstructionsProps {
  onAccept: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onAccept }) => {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-br from-purple-700 via-indigo-500 to-blue-800 font-rubik">
      <h1 className="mb-16 text-5xl font-bold text-white mt-28">Instrucciones para Crear un Rosco</h1>
      
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-6 space-x-4">
          <InformationCircleIcon className="w-12 h-12 text-indigo-600" />
          <p className="text-2xl text-gray-700">
            Aquí están los pasos para crear tu rosco y empezar a jugar.
          </p>
        </div>

        <ul className="pl-6 space-y-5 text-xl list-decimal">
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="text-green-500 w-7 h-7" />
            <span className="text-lg">Todos los espacios para rellenar son obligatorios.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="text-green-500 w-7 h-7" />
            <span className="text-lg">Define un tiempo límite para el juego (en segundos).</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="text-green-500 w-7 h-7" />
            <span className="text-lg">Especifica una temática para el rosco.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="text-green-500 w-7 h-7" />
            <span className="text-lg">Para cada letra del abecedario, proporciona una palabra que empiece o contenga dicha letra.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="text-green-500 w-7 h-7" />
            <span className="text-lg">Si seleccionas que una palabra CONTIENE una letra, esa palabra no puede empezar por esa letra.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="text-green-500 w-7 h-7" />
            <span className="text-lg">Para añadir más de una respuesta, separa las respuestas por una coma, por ejemplo: pato,pata,patos,patas</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="text-green-500 w-7 h-7" />
            <span className="text-lg">Añade una breve definición para cada palabra.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="text-green-500 w-7 h-7" />
            <span className="text-lg">Revisa y valida que no haya errores en el formulario.</span>
          </li>
          <li className="flex items-start space-x-3">
            <CheckCircleIcon className="text-green-500 w-7 h-7" />
            <span className="text-lg">Guarda y comienza a jugar.</span>
          </li>
        </ul>

        <div className="mt-8 text-center">
          <button
            onClick={onAccept}
            className="px-10 py-4 text-2xl text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-xl hover:bg-blue-500"
          >
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
