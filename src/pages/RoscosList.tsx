import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  ClipboardIcon,
  CheckCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Rosco } from "../types/types";

import RandomPNG from "../assets/theme/random.png";
import SportPNG from "../assets/theme/sport.png";
import HistoryPNG from "../assets/theme/history.png";
import NaturePNG from "../assets/theme/nature.png";
import MusicPNG from "../assets/theme/music.png";
import Loader from "../layouts/Loader";
import ButtonSection from "../components/ButtonSection";

const RoscosListPage = () => {
  const { user, loadingUser, roscosService } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { create, code } = location.state || {};
  const [roscos, setRoscoss] = useState<Rosco[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalJoinOpen, setIsModalJoinOpen] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [filters, setFilters] = useState({
    theme: "",
    difficulty: "",
    sort: "recent",
  });

  useEffect(() => {
    const fetchRoscos = async () => {
      try {
        const roscosData = await roscosService.getAllRoscos();
        setRoscoss(roscosData || []);
      } catch (error) {
        console.error("Error al obtener los roscos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoscos();

    if (create && code) {
      setIsModalCreateOpen(true);
    }
  }, [create, code, navigate, location.pathname]);

  const filteredRoscos = roscos
    .filter((rosco) => {
      if (filters.theme && rosco.theme !== filters.theme) {
        return false;
      }
      if (filters.difficulty && rosco.difficulty !== filters.difficulty) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "recent") {
        return (
          new Date(b.date_modification).getTime() -
          new Date(a.date_modification).getTime()
        );
      }
      if (filters.sort === "oldest") {
        return (
          new Date(a.date_modification).getTime() -
          new Date(b.date_modification).getTime()
        );
      }
      return 0;
    });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const goToMenu = () => {
    navigate("/home");
  };

  const goToGame = (id: string) => {
    navigate(`/game/${id}`);
  };

  const goToCreateRosco = () => {
    navigate("/create-rosco");
  };

  const goToJoinRosco = () => {
    setIsModalJoinOpen(true);
  };

  const confirmCode = () => {
    setIsModalCreateOpen(false);
    navigate(location.pathname, { replace: true, state: {} });
  };

  const handleJoinRosco = async (code: string) => {
    if (!code.trim()) {
      alert("Por favor, introduce un código válido.");
      return;
    }

    if (await roscosService.existsRosco(code)) {
      navigate(`/game/${code}`);
    } else {
      setJoinError("El código introducido no es válido.");
    }
  };

  if (loading || loadingUser) {
    return <Loader />;
  }

  return (
    <div className="font-rubik">
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-8">
        <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-lg">
          Lista de Roscos
        </h1>

        {/* Botón de retroceso */}
        <button
          onClick={goToMenu}
          className="absolute top-8 left-8 p-2 bg-transparent text-white rounded-full hover:bg-white hover:text-primary transition duration-200"
        >
          <ArrowLeftIcon className="w-8 h-8" />
        </button>

        {/* Botones de crear y unirse a un rosco */}
        <div className="absolute top-8 right-8 flex flex-col items-end justify-end gap-4">
          {/* Botón de crear nuevo rosco */}
          {user ? (
            <ButtonSection
              text="Crear Rosco nuevo"
              onClick={goToCreateRosco}
              size="icon"
              icon={<PlusIcon className="w-6 h-6" />}
            />
          ) : null}

          {/* Botón de unirse a un rosco */}
          <ButtonSection
            text="Unirse a un rosco"
            onClick={goToJoinRosco}
            size="icon"
            icon={<ArrowRightCircleIcon className="w-6 h-6" />}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mb-8 gap-4 text-black">
          {/* Filtro por temática */}
          <select
            value={filters.theme}
            onChange={(e) => setFilters({ ...filters, theme: e.target.value })}
            className="p-2 rounded-lg border-2 border-gray-300 focus:outline-none"
          >
            <option value="">Todas las temáticas</option>
            <option value="Random">Random</option>
            <option value="Deportes">Deportes</option>
            <option value="Historia">Historia</option>
            <option value="Naturaleza">Naturaleza</option>
            <option value="Música">Música</option>
          </select>

          {/* Filtro por dificultad */}
          <select
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
            className="p-2 rounded-lg border-2 border-gray-300 focus:outline-none"
          >
            <option value="">Todas las dificultades</option>
            <option value="Super Easy">Muy Fácil</option>
            <option value="Easy">Fácil</option>
            <option value="Medium">Media</option>
            <option value="Hard">Difícil</option>
            <option value="Hardcore">Muy Difícil</option>
          </select>

          {/* Ordenar por */}
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="p-2 rounded-lg border-2 border-gray-300 focus:outline-none"
          >
            <option value="recent">Más recientes</option>
            <option value="oldest">Más antiguos</option>
          </select>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoscos.length > 0 ? (
            filteredRoscos.map((rosco) => (
              <div
                key={rosco.id}
                className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => goToGame(rosco.id)}
              >
                {/* Contenido del rosco */}
                <img
                  src={
                    rosco.theme === "Random"
                      ? RandomPNG
                      : rosco.theme === "Deportes"
                      ? SportPNG
                      : rosco.theme === "Historia"
                      ? HistoryPNG
                      : rosco.theme === "Naturaleza"
                      ? NaturePNG
                      : rosco.theme === "Música"
                      ? MusicPNG
                      : "https://via.placeholder.com/400x200"
                  }
                  alt={`Imagen de ${rosco.name}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    {rosco.name || "Sin nombre"}
                  </h3>
                  <p className="text-sm text-gray-600">Tema: {rosco.theme}</p>
                  <p className="text-sm text-gray-600">
                    Autor: {rosco.user_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Última modificación:{" "}
                    {new Date(rosco.date_modification).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tiempo: {rosco.time} segundos
                  </p>
                  <p className="text-sm text-gray-600">
                    Dificultad: {rosco.difficulty || "No especificada"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-gray-500">
              No hay roscos disponibles.
            </div>
          )}
        </div>
        {isModalCreateOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center">
              {/* Ícono de éxito */}
              <div className="mb-4">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                ¡Rosco creado con éxito!
              </h2>
              <p className="text-gray-600 mb-6 text-lg text-balance">
                Para jugar este rosco, comparte el siguiente código con tus
                amigos o el URL.
              </p>

              {/* Mostrar Código */}
              <div className="bg-gray-100 p-4 rounded-md text-gray-800 font-mono text-lg">
                <span className="font-semibold">Código: </span>
                {code}
                <button
                  onClick={() => copyToClipboard(code)}
                  className="ml-4 p-2 text-gray-500 hover:text-gray-700"
                  title="Copiar al portapapeles"
                >
                  <ClipboardIcon className="h-5 w-5 inline-block" />
                </button>
              </div>

              {/* Mostrar URL */}
              <div className="bg-gray-100 p-4 rounded-md text-gray-800 font-mono text-lg mb-6">
                <span className="font-semibold">URL: </span>
                <span className="text-blue-600">{`https://pasapalabra-pro.vercel.app/game/${code}`}</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `https://pasapalabra-pro.vercel.app/game/${code}`
                    )
                  }
                  className="ml-4 p-2 text-gray-500 hover:text-gray-700"
                  title="Copiar URL"
                >
                  <ClipboardIcon className="h-5 w-5 inline-block" />
                </button>
              </div>

              <button
                onClick={confirmCode}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg transition-all duration-300"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
        {isModalJoinOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center">
              {/* Título del modal */}
              <h2 className="text-3xl font-semibold text-gray-900 mb-4 drop-shadow-lg">
                Unirse a un Rosco
              </h2>

              {/* Mensaje */}
              <p className="text-gray-700 mb-6 text-lg font-medium">
                Ingresa el código único del rosco para unirte y comenzar a
                jugar.
              </p>

              {/* Input para el código */}
              <input
                type="text"
                placeholder="Introduce el código del rosco"
                className={`w-full p-4 border-2 border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 transition-all duration-300 ease-in-out ${
                  joinError ? "border-red-500 mb-0" : ""
                }`}
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
              />
              {joinError && <p className="text-red-500 mb-6">{joinError}</p>}

              {/* Botón para unirse */}
              <button
                onClick={() => handleJoinRosco(joinCode)}
                className="w-full px-6 py-3 mb-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Unirse
              </button>

              {/* Botón para cerrar el modal */}
              <button
                onClick={() => setIsModalJoinOpen(false)}
                className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoscosListPage;
