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
      <div className="p-6">
        <h3 className="text-xl font-semibold">{rosco.name || "Sin nombre"}</h3>
        <p className="text-sm text-gray-600">Tema: {rosco.theme}</p>
        <p className="text-sm text-gray-600">Autor: {rosco.user_name}</p>
        <p className="text-sm text-gray-600">
          Última modificación:{" "}
          {new Date(rosco.date_modification).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">Tiempo: {rosco.time} segundos</p>
        <p className="text-sm text-gray-600">
          Dificultad: {rosco.difficulty || "No especificada"}
        </p>
      </div>
    </div>
  );
};

export default RoscoCard;
