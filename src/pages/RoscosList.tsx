import { useEffect, useState } from "react";
import { RoscoService } from "../data/RoscoService";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Rosco } from "../types/types";

import RandomPNG from "../assets/theme/random.png";

const RoscossListPage = () => {
  const roscosService = new RoscoService();
  const [roscos, setRoscoss] = useState<Rosco[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoscoss = async () => {
      try {
        const roscosData = await roscosService.getAllRoscoss();
        setRoscoss(roscosData || []);
      } catch (error) {
        console.error("Error al obtener los roscos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoscoss();
  }, []);

  const goToMenu = () => {
    navigate("/home");
  };

  const goToGame = (id: number) => {
    navigate(`/game/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-600">
        Cargando roscos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-lg">
        Lista de Roscoss
      </h1>
      <button
        onClick={goToMenu}
        className="absolute top-8 left-8 p-2 bg-transparent text-white rounded-full hover:bg-white hover:text-primary transition duration-200"
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {roscos.length > 0 ? (
          roscos.map((rosco) => (
            <div
              key={rosco.id}
              className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => goToGame(rosco.id)}
            >
              <img
                src={rosco.theme === "Random" ? RandomPNG : "https://via.placeholder.com/400x200"}
                alt={`Imagen de ${rosco.name}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{rosco.name || "Sin nombre"}</h3>
                <p className="text-sm text-gray-600">Tema: {rosco.theme}</p>
                <p className="text-sm text-gray-600">Autor: {rosco.user_name}</p>
                <p className="text-sm text-gray-600">
                  Última modificación:{" "}
                  {new Date(rosco.date_modification).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Tiempo: {rosco.time} segundos</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg text-gray-500">
            No hay roscos disponibles.
          </div>
        )}
      </div>
    </div>
  );
};

export default RoscossListPage;
