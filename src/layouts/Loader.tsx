import React from "react";

const Loader: React.FC = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const radius = 150;

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-primary">
      {/* Fondo oscuro semitransparente */}
      <div className="absolute inset-0"></div>

      {/* Rosco giratorio */}
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="relative flex items-center justify-center w-48 h-48 rounded-full">
          {/* Letras alrededor del círculo */}
          <div className="absolute flex items-center justify-center w-full h-full">
            {/* Aplicar la animación de rotación al contenedor del rosco */}
            <div className="relative flex items-center justify-center w-48 h-48 rounded-full animate-spin-slow">
              {letters.map((letter, index) => {
                const angle = (360 / letters.length) * index - 90;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={index}
                    className="absolute origin-center transform top-1/2 left-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div
                      className="flex items-center justify-center text-sm font-bold text-white border-4 border-white rounded-full w-7 h-7"
                    >
                      {letter}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
