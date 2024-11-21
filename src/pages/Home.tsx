import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Howl } from "howler";
import BgMusic from "../assets/sounds/background_home.wav";
import Loader from "../components/Loader";
import { useUser } from "../contexts/UserContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [bgVolume, setBgVolume] = useState<number>(0.5);
  const [isBgMuted, setIsBgMuted] = useState<boolean>(false);
  const bgMusicRef = useRef<Howl | null>(null);
  const { user, loadingUser, roscosService } = useUser();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  // Cargar ajustes de volumen y mute desde localStorage
  useEffect(() => {
    const savedBgVolume = localStorage.getItem("bgVolume");
    const savedIsBgMuted = localStorage.getItem("isBgMuted");

    if (savedBgVolume) {
      setBgVolume(parseFloat(savedBgVolume));
    }
    if (savedIsBgMuted === "true") {
      setIsBgMuted(true);
    }
  }, []);

  // Reproductor de música de fondo
  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Howl({
        src: [BgMusic],
        loop: true,
        volume: bgVolume,
      });
    }

    const bgMusic = bgMusicRef.current;

    if (isBgMuted) {
      bgMusic.volume(0);
    } else {
      bgMusic.volume(bgVolume);
      bgMusic.play();
    }

    return () => {
      bgMusic.stop();
    };
  }, [bgVolume, isBgMuted]);

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
    setMenuVisible(false);
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
          <button
            onClick={handleGameStart}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
            aria-label="Comenzar el juego"
          >
            JUGAR
          </button>
          <button
            onClick={() => navigate("/roscos")}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
            aria-label="Ir a la lista de roscos"
          >
            LISTA DE ROSCOS
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
            aria-label="Abrir opciones"
          >
            OPCIONES
          </button>
          <button
            onClick={() => navigate("/credits")}
            className="w-full px-12 py-4 text-white font-bold text-3xl rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
            aria-label="Ver créditos"
          >
            CRÉDITOS
          </button>
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
                {user.user_metadata.user_name ? user.user_metadata.user_name : user.email}
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
          <button
            onClick={() => navigate("/login")}
            className="w-full px-9 py-3 text-white font-bold text-lg rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
            aria-label="Iniciar sesión"
          >
            INICIAR SESIÓN
          </button>
        )}

        {/* Menú desplegable */}
        {menuVisible && (
          <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-md w-48">
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
        <button
          onClick={() => navigate("/blog")}
          className="w-full px-6 py-2 text-white font-bold text-lg rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none"
          aria-label="Ir al blog"
        >
          BLOG
        </button>
      </div>

      {/* Versión de la app en la parte inferior izquierda */}
      <div className="absolute bottom-4 left-4 text-white text-sm font-medium font-rubik">
        Versión 1.2.2
      </div>
    </div>
  );
};

export default Home;
