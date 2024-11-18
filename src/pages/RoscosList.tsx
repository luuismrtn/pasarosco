import { useEffect, useState } from "react";
import { RoscoService } from "../data/RoscoService";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  ClipboardIcon,
  CheckCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Rosco } from "../types/types";

import RandomPNG from "../assets/theme/random.png";
import Loader from "../components/Loader";

const RoscosListPage = () => {
  const roscosService = new RoscoService();
  const location = useLocation();
  const navigate = useNavigate();
  const { create, code } = location.state || {};
  const [roscos, setRoscoss] = useState<Rosco[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState<boolean>(false);
  const [isModalJoinOpen, setIsModalJoinOpen] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");

  useEffect(() => {
    const fetchRoscoss = async () => {
      try {
        const roscosData = await roscosService.getAllRoscos();
        setRoscoss(roscosData || []);
      } catch (error) {
        console.error("Error al obtener los roscos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoscoss();

    if (create && code) {
      setIsModalCreateOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [create, code, navigate, location.pathname]);

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

  return (
    <div className="font-rubik">
      {loading ? (
        <Loader />
      ) : (
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

          {/* Botón de crear nuevo rosco */}
          <button
            onClick={goToCreateRosco}
            className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 text-white font-semibold text-xl rounded-full shadow-md transition-transform transform bg-transparent border border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          >
            <PlusIcon className="w-6 h-6" />
            <span>Crear Rosco nuevo</span>
          </button>

          {/* Botón de unirse a un rosco */}
          <button
            onClick={goToJoinRosco}
            className="absolute top-24 right-8 flex items-center gap-2 px-4 py-2 text-white font-semibold text-xl rounded-full shadow-md transition-transform transform bg-transparent border border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          >
            <ArrowRightCircleIcon className="w-6 h-6" />
            <span>Unirse a un rosco</span>
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
                    src={
                      rosco.theme === "Random"
                        ? RandomPNG
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
      )}
    </div>
  );
};

export default RoscosListPage;
