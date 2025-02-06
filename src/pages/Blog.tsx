import React from "react";
import { useNavigate } from "react-router";
import BackButton from "../components/BackButton";

const Blog: React.FC = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-white bg-gradient-to-r from-indigo-600 to-purple-600 font-rubik">
      {/* Botón para regresar al menú */}
      <BackButton onClick={goToMenu} hoverText="hover:text-indigo-600" />

      {/* Título */}
      <h1 className="mt-10 mb-8 text-6xl font-extrabold drop-shadow-lg">
        <span className="text-white bg-clip-text">Blog</span>
      </h1>

      {/* Contenedor principal */}
      <div className="w-full max-w-4xl p-8 space-y-12 bg-white shadow-2xl bg-opacity-20 rounded-xl">
        {/* Historial de versiones */}
        <section>
          <h2 className="mb-6 text-3xl font-bold text-center">
            Historial de Versiones
          </h2>
          <div>
            {/* Versión 1.3.5 */}
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.3.5:
              </h3>
              <ul className="pl-4 list-disc list-inside">
                <li>Ahora se puede jugar a PASAROSCO aunque no haya base de datos.</li>
                <li>Nueva pantalla de inicio si no hay una base de datos operativa.</li>
                <li>Corrección de errores en la página de inicio.</li>
              </ul>
            </div>
            
            {/* Versión 1.3.4 */}
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.3.4:
              </h3>
              <ul className="pl-4 list-disc list-inside">
                <li>Cambio de nombre de la aplicación: PASAROSCO</li>
                <li>Agregado nuevo botón para ir al código de la aplicación.</li>
                <li>Error arreglado: Antes si editabas un rosco y la palabra CONTENIA la letra, no se mostraba bien el menú.</li>
              </ul>
            </div>

            {/* Versión 1.3.1 */}
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.3.1:
              </h3>
              <ul className="pl-4 list-disc list-inside">
                <li>
                  Arreglados las dimensiones en las patallas pequeñas de
                  escritorio.
                </li>
                <li>Ahora no se queda colgado al teminar un rosco.</li>
                <li>
                  Ahora para crear o editar una respuesta en el editor se pueden
                  empezar las palabras respuesta con letras con tilde.
                </li>
              </ul>
            </div>

            {/* Versión 1.3.0 */}
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.3.0:
              </h3>
              <ul className="pl-4 list-disc list-inside">
                <li>
                  ¡Ahora la pantalla se ajusta a la anchura y altura de tu
                  pantalla!
                </li>
                <li>
                  La id de cada rosco se ve difuminada en la pantalla de juego.
                </li>
                <li>
                  Corregidos en algunas pantallas el botón de ir hacia atrás.
                </li>
                <li>Nuevo diseño de las tarjetas de cada rosco.</li>
              </ul>
            </div>

            {/* Versión 1.2.X */}
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.2.11:
              </h3>
              <ul className="pl-4 list-disc list-inside">
                <li>Nuevo diseño de las tarjetas de cada rosco.</li>
                <li>
                  Ahora se puede editar, eliminar y compartir desde la página de
                  perfil.
                </li>
                <li>
                  Ahora se puede crear o entrar a un rosco desde la página
                  principal.
                </li>
                <li>Arreglado bug del sonido en la página principal.</li>
                <li>
                  Ya no se quita la sesión en la página de perfil cuando
                  recargas la página.
                </li>
                <li>
                  Nuevo sonido al poner el raton por encima en los botones.
                </li>
                <li>Ya no hay música de fondo en la página principal.</li>
              </ul>
            </div>

            {/* Versión 1.2.5 */}
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.2.5:
              </h3>
              <ul className="pl-4 list-disc list-inside">
                <li>
                  Nueva página de perfil para poder ver los roscos creados y la
                  información del usuario.
                </li>
                <li>
                  Ahora solo se pueden crear roscos si has iniciado sesión
                  previamente.
                </li>
                <li>Atributo de dificultad añadido a cada rosco.</li>
                <li>
                  Se ha reemplazado el logo antiguo por uno nuevo más moderno.
                </li>
                <li>
                  Se ha añadido la función de filtrar en la lista de roscos para
                  jugar.
                </li>
                <li>Botón de volver hacia atrás unificado.</li>
              </ul>
            </div>

            {/* Versión 1.2.0 */}
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.2.0:
              </h3>
              <ul className="pl-4 list-disc list-inside">
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
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.1.2:
              </h3>
              <ul className="pl-4 list-disc list-inside">
                <li>Añadido el sistema para editar los roscos desde la web.</li>
                <li>Corrección de errores de musica.</li>
                <li>Corrección de errores de la página de cargado.</li>
              </ul>
            </div>

            {/* Versión 1.1.0 */}
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.1.0:
              </h3>
              <ul className="pl-4 list-disc list-inside">
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
            <div className="p-6 my-4 space-y-2 bg-white rounded-lg bg-opacity-10">
              <h3 className="text-xl font-semibold text-yellow-300">
                Versión 1.0.0:
              </h3>
              <ul className="pl-4 list-disc list-inside">
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
