import React from "react";

const Loader: React.FC = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const radius = 150;

  return (
    <div className="min-h-screen bg-primary flex justify-center items-center relative">
      {/* Fondo oscuro semitransparente */}
      <div className="absolute inset-0"></div>

      {/* Rosco giratorio */}
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="relative w-48 h-48 rounded-full flex justify-center items-center">
          {/* Letras alrededor del círculo */}
          <div className="absolute flex items-center justify-center w-full h-full">
            {/* Aplicar la animación de rotación al contenedor del rosco */}
            <div className="relative w-48 h-48 rounded-full flex justify-center items-center animate-spin-slow">
              {letters.map((letter, index) => {
                const angle = (360 / letters.length) * index - 90;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 transform origin-center"
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div
                      className="flex justify-center items-center w-7 h-7 border-4 border-white rounded-full text-white text-sm font-bold"
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
