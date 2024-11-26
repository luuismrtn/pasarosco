import React from "react";
import RandomPNG from "../assets/theme/random.png";
import SportPNG from "../assets/theme/sport.png";
import HistoryPNG from "../assets/theme/history.png";
import NaturePNG from "../assets/theme/nature.png";
import MusicPNG from "../assets/theme/music.png";
import { Rosco } from "../types/types";

interface RoscoCardProps {
  rosco: Rosco;
  onClick: (id: string) => void;
}

const RoscoCard: React.FC<RoscoCardProps> = ({ rosco, onClick }) => {
  const getImageByTheme = (theme: string) => {
    switch (theme) {
      case "Random":
        return RandomPNG;
      case "Deportes":
        return SportPNG;
      case "Historia":
        return HistoryPNG;
      case "Naturaleza":
        return NaturePNG;
      case "Música":
        return MusicPNG;
      default:
        return "https://via.placeholder.com/400x200";
    }
  };

  return (
    <div
      className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => onClick(rosco.id)}
    >
      {/* Imagen del rosco */}
      <img
        src={getImageByTheme(rosco.theme)}
        alt={`Imagen de ${rosco.name}`}
        className="w-full h-48 object-cover"
      />
      {/* Contenido del rosco */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-4">
          <h3 className="text-2xl font-semibold text-indigo-700">
            {rosco.name || "Sin nombre"}
          </h3>

          {/* Dificultad con color condicional */}
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${
              rosco.difficulty === "Super Easy"
                ? "bg-green-500 text-white"
                : rosco.difficulty === "Easy"
                ? "bg-green-400 text-white"
                : rosco.difficulty === "Medium"
                ? "bg-yellow-400 text-black"
                : rosco.difficulty === "Hard"
                ? "bg-red-600 text-white"
                : rosco.difficulty === "Hardcore"
                ? "bg-red-800 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {rosco.difficulty || "No especificada"}
          </span>
        </div>

        {/* Círculo azul con el tiempo debajo de la dificultad */}
        <div className="flex justify-end">
          <div className="absolute w-14 h-14 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-semibold">
            {rosco.time} s
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Tema:</span>{" "}
            {rosco.theme || "No especificado"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Autor:</span>{" "}
            {rosco.user_name || "Desconocido"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">
              Última modificación:
            </span>{" "}
            {new Date(rosco.date_modification).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoscoCard;
