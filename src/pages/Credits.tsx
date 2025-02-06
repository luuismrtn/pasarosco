import React from "react";
import { useNavigate } from "react-router";
import BackButton from "../components/BackButton";

const Credits: React.FC = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-white bg-gradient-to-r from-indigo-600 to-purple-600 font-rubik">
      {/* Botón para regresar al menú */}
      <BackButton onClick={goToMenu} hoverText="hover:text-indigo-600" />

      {/* Título */}
      <h1 className="mt-10 mb-10 text-6xl font-extrabold drop-shadow-lg">Créditos</h1>

      {/* Contenido de los créditos */}
      <div className="w-2/3 p-8 space-y-8 text-center transition-all transform bg-white rounded-lg shadow-2xl bg-opacity-20 hover:scale-105 hover:shadow-xl">
        {/* Hecho por */}
        <section className="mb-6 text-xl">
          <h2 className="mb-4 text-3xl font-bold">Proyecto realizado por: </h2>
          <p className="text-lg font-semibold">Luis Martín García</p>
        </section>

        <div className="my-6 border-t-2 border-gray-300"></div>

        {/* Recursos */}
        <section className="mb-6 text-xl">
          <h2 className="mb-4 text-3xl font-bold">Recursos:</h2>
          <ul className="px-6 space-y-4 text-left">
            <li className="text-lg font-semibold">Efectos de sonido:</li>
            <li>
              Hover del botón:{" "}
              <span className="font-semibold text-blue-200">hover_button_sound.wav</span>{" "}
              by Fachii —{" "}
              <a
                href="https://freesound.org/s/338229/"
                className="text-blue-400 hover:underline"
              >
                freesound.org
              </a>{" "}
              — License: Creative Commons 0
            </li>
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

        <div className="my-6 border-t-2 border-gray-300"></div>

        {/* Tecnologías Utilizadas */}
        <section className="text-xl">
          <h2 className="mb-4 text-3xl font-bold">Tecnologías Utilizadas</h2>
          <p className="text-lg">React, TypeScript, Tailwind CSS, SupaBase</p>
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
