import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import Loader from "../layouts/Loader";
import { useUser } from "../contexts/UserContext";
import ButtonSection from "../components/ButtonSection";

import { PlusIcon } from "@heroicons/react/24/solid";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, loadingUser, roscosService } = useUser();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [isModalJoinOpen, setIsModalJoinOpen] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  const handleGameStart = () => {
    const randNum = Math.floor(Math.random() * 5);
    navigate("/game/" + randNum);
  };

  const handleAvatarClick = () => {
    setMenuVisible(!menuVisible);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setMenuVisible(false);
  };

  const handleLogout = async () => {
    await roscosService.getSupabase().auth.signOut();
    navigate("/login");
    setMenuVisible(false);
  };

  const goToCreateRosco = () => {
    navigate("/create-rosco");
  };

  const goToJoinRosco = () => {
    setIsModalJoinOpen(true);
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

  if (loadingUser) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-indigo-800 flex flex-col items-center justify-center p-4 pb-26">
      {/* Título principal */}
      <h1 className="text-9xl font-bold text-white font-rubik mb-4 drop-shadow-lg">
        Pasapalabra
      </h1>

      {/* Subtítulo */}
      <h2 className="text-3xl font-semibold text-white font-rubik mb-12 drop-shadow-lg">
        ¡El juego de palabras que pondrá a prueba tus conocimientos sobre el
        castellano!
      </h2>

      {/* Caja de opciones */}
      <div className="text-center p-8 w-full max-w-md">
        <div className="space-y-6">
          <ButtonSection
            text="JUGAR"
            to="/game"
            size="large"
            onClick={handleGameStart}
          />
          <ButtonSection text="LISTA DE ROSCOS" to="/roscos" size="large" />
          <ButtonSection text="OPCIONES" to="/settings" size="large" />
          <ButtonSection text="CRÉDITOS" to="/credits" size="large" />
        </div>
      </div>

      {/* Botón o Avatar dependiendo del estado del usuario */}
      <div className="absolute top-6 right-6 font-rubik">
        {user ? (
          <button
            onClick={() => handleAvatarClick()}
            aria-label="Abrir perfil del usuario"
          >
            <div className="flex flex-row items-center justify-end">
              <div className="text-white text-xl mr-4">
                {user.username ? user.username : user.email}
              </div>
              <div className="w-14 h-14 bg-transparent rounded-full border-2 border-white flex items-center justify-center hover:ring-4 ring-indigo-300 transition-all">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 fill-current text-white"
                >
                  <path d="M22.82,20.55l-.63-.18c-1.06-.29-1.79-.51-1.91-1.75,2.83-3,2.79-5.67,2.73-8.47,0-.38,0-.76,0-1.15a7.1,7.1,0,0,0-7-7A7.1,7.1,0,0,0,9,9c0,.39,0,.77,0,1.15-.06,2.8-.1,5.45,2.73,8.47-.12,1.24-.85,1.46-1.91,1.75l-.63.18C5.61,21.74,2,25,2,29a1,1,0,0,0,2,0c0-3,3-5.61,5.82-6.55.16-.06.34-.1.52-.15A4.11,4.11,0,0,0,13.45,20a5.4,5.4,0,0,0,5.1,0,4.11,4.11,0,0,0,3.11,2.35c.18.05.36.09.52.15C25,23.39,28,26,28,29a1,1,0,0,0,2,0C30,25,26.39,21.74,22.82,20.55Zm-9.36-3C10.9,15,10.94,12.86,11,10.18,11,9.8,11,9.4,11,9A5,5,0,0,1,21,9c0,.4,0,.8,0,1.18,0,2.68.09,4.8-2.47,7.36A3.58,3.58,0,0,1,13.46,17.54Z"></path>
                </svg>
              </div>
            </div>
          </button>
        ) : (
          <ButtonSection text="INICIAR SESIÓN" to="/login" size="medium" />
        )}

        {/* Menú desplegable */}
        {menuVisible && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-md w-48"
          >
            <button
              onClick={handleProfileClick}
              className="w-full px-4 py-2 text-left hover:bg-indigo-100"
            >
              Perfil
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left hover:bg-indigo-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Botón para ir al blog */}
      <div className="absolute bottom-4 right-4">
        <ButtonSection text="BLOG" to="/blog" size="small" />
      </div>

      {/* Botones de crear y unirse a un rosco */}
      {user && (
        <div className="absolute top-8 left-8 flex flex-col items-start justify-end gap-4">
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
      )}

      {isModalJoinOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md font-rubik">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center">
            {/* Título del modal */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-4 drop-shadow-lg">
              Unirse a un Rosco
            </h2>

            {/* Mensaje */}
            <p className="text-gray-700 mb-6 text-lg font-medium">
              Ingresa el código único del rosco para unirte y comenzar a jugar.
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

      {/* Versión de la app en la parte inferior izquierda */}
      <div className="absolute bottom-4 left-4 text-white text-sm font-medium font-rubik">
        Versión 1.2.9
      </div>
    </div>
  );
};

export default Home;
