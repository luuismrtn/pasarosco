import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const Credits: React.FC = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white font-rubik px-4 py-8">
      {/* Botón para regresar al menú */}
      <BackButton onClick={goToMenu} hoverText="hover:text-indigo-600" />

      {/* Título */}
      <h1 className="text-6xl font-extrabold mb-10 mt-10 drop-shadow-lg">Créditos</h1>

      {/* Contenido de los créditos */}
      <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-2xl w-2/3 text-center space-y-8 transform transition-all hover:scale-105 hover:shadow-xl">
        {/* Hecho por */}
        <section className="text-xl mb-6">
          <h2 className="text-3xl font-bold mb-4">Proyecto realizado por: </h2>
          <p className="text-lg font-semibold">Luis Martín García</p>
        </section>

        <div className="border-t-2 border-gray-300 my-6"></div> {/* Separador de secciones */}

        {/* Recursos */}
        <section className="text-xl mb-6">
          <h2 className="text-3xl font-bold mb-4">Recursos:</h2>
          <ul className="space-y-4 text-left px-6">
            <li className="text-lg font-semibold">Efectos de sonido:</li>
            <li>
              Respuesta correcta:{" "}
              <span className="font-semibold text-blue-200">correct1.wav</span>{" "}
              by StavSounds —{" "}
              <a
                href="https://freesound.org/s/546083/"
                className="text-blue-400 hover:underline"
              >
                freesound.org
              </a>{" "}
              — License: Creative Commons 0
            </li>
            <li>
              Respuesta incorrecta:{" "}
              <span className="font-semibold text-blue-200">
                System Notification #4
              </span>{" "}
              by Universfield —{" "}
              <a
                href="https://freesound.org/s/734443/"
                className="text-blue-400 hover:underline"
              >
                freesound.org
              </a>{" "}
              — License: Attribution 4.0
            </li>
            <li>
              Cuenta atrás:{" "}
              <span className="font-semibold text-blue-200">
                3, 2, 1, Action.wav
              </span>{" "}
              by MATRIXXX_ —{" "}
              <a
                href="https://freesound.org/s/523772/"
                className="text-blue-400 hover:underline"
              >
                freesound.org
              </a>{" "}
              — License: Creative Commons 0
            </li>
            <li>
              ¡Ya!:{" "}
              <span className="font-semibold text-blue-200">Race Start</span> by
              JustInvoke —{" "}
              <a
                href="https://freesound.org/s/446142/"
                className="text-blue-400 hover:underline"
              >
                freesound.org
              </a>{" "}
              — License: Attribution 4.0
            </li>

            <li className="mt-4">
              <span className="font-semibold">Música:</span>
            </li>
            <li>
              Principal:{" "}
              <span className="font-semibold text-blue-200">
                Mushroom Background Music
              </span>{" "}
              by Sunsai —{" "}
              <a
                href="https://freesound.org/s/415804/"
                className="text-blue-400 hover:underline"
              >
                freesound.org
              </a>{" "}
              — License: Attribution 4.0
            </li>
            <li>
              Configuración y juego:{" "}
              <span className="font-semibold text-blue-200">
                There Will Be Stars
              </span>{" "}
              by kjartan_abel —{" "}
              <a
                href="https://freesound.org/s/532343/"
                className="text-blue-400 hover:underline"
              >
                freesound.org
              </a>{" "}
              — License: Attribution 4.0
            </li>
            <li className="text-lg font-semibold">Idea del juego:</li>
            <li>
              Basada en el programa de televisión{" "}
              <span className="font-semibold text-blue-200">Pasapalabra </span>
              de Antena 3.
            </li>
          </ul>
        </section>

        <div className="border-t-2 border-gray-300 my-6"></div> {/* Separador de secciones */}

        {/* Tecnologías Utilizadas */}
        <section className="text-xl">
          <h2 className="text-3xl font-bold mb-4">Tecnologías Utilizadas</h2>
          <p className="text-lg">React, TypeScript, Tailwind CSS</p>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-lg opacity-80">
        <p>&copy; 2024 - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Credits;
