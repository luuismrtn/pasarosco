import React from "react";
import RandomPNG from "../assets/theme/random.png";
import SportPNG from "../assets/theme/sport.png";
import HistoryPNG from "../assets/theme/history.png";
import NaturePNG from "../assets/theme/nature.png";
import MusicPNG from "../assets/theme/music.png";
import { Rosco } from "../types/types";

import { TrashIcon, PencilIcon, ShareIcon } from "@heroicons/react/24/solid";

interface RoscoCardProps {
  rosco: Rosco;
  onClick: (id: string) => void;
  editable?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
}

const RoscoCard: React.FC<RoscoCardProps> = ({
  rosco,
  onClick,
  editable = false,
  onEdit,
  onDelete,
  onShare,
}) => {
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
      className="overflow-hidden text-gray-900 transition-all transform bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl"
      onClick={() => onClick(rosco.id)}
    >
      {/* Imagen del rosco */}
      <img
        src={getImageByTheme(rosco.theme)}
        alt={`Imagen de ${rosco.name}`}
        className="object-cover w-full h-48"
      />
      {/* Contenido del rosco */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-4">
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
          <div className="absolute flex items-center justify-center text-lg font-semibold text-white bg-blue-500 rounded-full w-14 h-14">
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

        {/* Botones de Editar, Eliminar, y Compartir */}
        {editable && (
          <div className="flex h-5 mt-4 space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(rosco.id);
              }}
              className="flex items-center justify-center flex-1 p-4 text-white transition-all duration-300 ease-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-2xl hover:scale-105 hover:rotate-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <PencilIcon className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(rosco.id);
              }}
              className="flex items-center justify-center flex-1 p-4 text-white transition-all duration-300 ease-out transform rounded-lg shadow-xl bg-gradient-to-r from-red-500 to-red-700 hover:shadow-2xl hover:scale-105 hover:rotate-2 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare && onShare(rosco.id);
              }}
              className="flex items-center justify-center flex-1 p-4 text-white transition-all duration-300 ease-out transform rounded-lg shadow-xl bg-gradient-to-r from-green-500 to-green-700 hover:shadow-2xl hover:scale-105 hover:rotate-2 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              <ShareIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoscoCard;
