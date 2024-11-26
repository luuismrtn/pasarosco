import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const Blog: React.FC = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white font-rubik px-4 py-8">
      {/* Botón para regresar al menú */}
      <button
        onClick={goToMenu}
        className="absolute top-8 left-8 p-2 bg-white bg-opacity-10 text-white rounded-full hover:bg-opacity-20 transition duration-200"
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>

      {/* Título */}
      <h1 className="text-6xl font-extrabold mb-8 mt-10 drop-shadow-lg">
        <span className="text-white bg-clip-text">Blog</span>
      </h1>

      {/* Contenedor principal */}
      <div className="bg-white bg-opacity-20 p-8 rounded-xl shadow-2xl w-full max-w-4xl space-y-12">
        {/* Historial de versiones */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">
            Historial de Versiones
          </h2>
          <div>
            {/* Versión 1.2.X */}
            <div className="bg-white bg-opacity-10 p-6 my-4 rounded-lg space-y-2">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.2.X:
              </h3>
              <ul className="list-disc list-inside pl-4">
                <li>Ahora solo se pueden crear roscos si has iniciado sesión previamente.</li>
                <li>Atributo de dificultad añadido a cada rosco.</li>
                <li>Se ha reemplazado el logo antiguo por uno nuevo más moderno.</li>
              </ul>
            </div>

            {/* Versión 1.2.0 */}
            <div className="bg-white bg-opacity-10 p-6 my-4 rounded-lg space-y-2">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.2.0:
              </h3>
              <ul className="list-disc list-inside pl-4">
                <li>YA ESTAN DISPONIBLES LOS USUARIOS.</li>
                <li>Añadido el sistema para crear los roscos desde la web.</li>
                <li>Añadido el sistema para unirte a roscos desde la web.</li>
                <li>
                  Ahora se ve la ID del rosco que estan jugando en el GAME (Se
                  puede hacer invisible en los ajustes).
                </li>
                <li>Nueva sección de BLOG.</li>
                <li>
                  Ahora el historial de versiones se puede ver desde la web.
                </li>
                <li>
                  Al crear el rosco, los temas ya no son libres, sino que puedes
                  elegir de una lista.
                </li>
                <li>
                  Ahora en la lista de roscos se va a poder ver que temática es
                  gracias al banner.
                </li>
              </ul>
            </div>

            {/* Versión 1.1.2 */}
            <div className="bg-white bg-opacity-10 p-6 my-4 rounded-lg space-y-2">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.1.2:
              </h3>
              <ul className="list-disc list-inside pl-4">
                <li>Añadido el sistema para editar los roscos desde la web.</li>
                <li>Corrección de errores de musica.</li>
                <li>Corrección de errores de la página de cargado.</li>
              </ul>
            </div>

            {/* Versión 1.1.0 */}
            <div className="bg-white bg-opacity-10 p-6 my-4 rounded-lg space-y-2">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.1.0:
              </h3>
              <ul className="list-disc list-inside pl-4">
                <li>Añadida base de datos.</li>
                <li>Añadida lista de roscos.</li>
                <li>Fallo de sonido arreglado.</li>
                <li>
                  Ahora los fallos se muestran en los las mismas casillas de
                  formulario.
                </li>
                <li>Sistema de cargado añadido</li>
              </ul>
            </div>

            {/* Versión 1.0.0 */}
            <div className="bg-white bg-opacity-10 p-6 my-4 rounded-lg space-y-2">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.0.0:
              </h3>
              <ul className="list-disc list-inside pl-4">
                <li>Primera versión de la web</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-lg">
        <p className="text-white">
          &copy; 2024 - Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
};

export default Blog;
