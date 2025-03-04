import ButtonSection from "../components/ButtonSection";

const Home: React.FC = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary to-indigo-800 pb-26">
      <div className="absolute font-semibold text-center text-yellow-400 top-6 text-md lg:text-lg 2xl:text-xl font-rubik drop-shadow-lg">
        <h3>
          Nuestra base de datos está en mantenimiento.
        </h3>
        <h3>
          Disfruta del juego sin base de datos.
        </h3>
      </div>

      {/* Título principal */}
      <h1 className="mb-4 font-bold text-white text-9xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-rubik drop-shadow-lg">
        Pasarosco
      </h1>

      {/* Subtítulo */}
      <h2 className="mb-12 text-2xl font-semibold text-white lg:text-xl 2xl:text-3xl font-rubik lg:mb-2 xl:mb-12 drop-shadow-lg">
        ¡El juego de palabras que pondrá a prueba tus conocimientos sobre el
        castellano!
      </h2>

      {/* Caja de opciones */}
      <div className="w-full max-w-md p-8 text-center">
        <div className="space-y-6">
          <ButtonSection
            text="JUGAR"
            to="/game/no-bbdd"
            size="large"
          />
          <ButtonSection text="OPCIONES" to="/settings" size="large" />
          <ButtonSection text="CRÉDITOS" to="/credits" size="large" />
        </div>
      </div>

      {/* Botón para ir al blog */}
      <div className="absolute flex flex-row gap-4 bottom-4 right-4">
        <ButtonSection
          text="GITHUB"
          to="https://github.com/luuismrtn/pasarosco"
          size="small"
          external
        />
        <ButtonSection text="BLOG" to="/blog" size="small" />
      </div>

      {/* Versión de la app en la parte inferior izquierda */}
      <div className="absolute text-sm font-medium text-white bottom-4 left-4 font-rubik">
        Versión 1.3.6 - Sin base de datos
      </div>
    </div>
  );
};

export default Home;
