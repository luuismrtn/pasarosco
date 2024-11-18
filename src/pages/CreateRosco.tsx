import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Word } from "../types/types";
import { RoscoService } from "../data/RoscoService";
import Instructions from "../components/Instructions";

const CreateRosco: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [time, setTime] = useState<number>(120);
  const [roscoName, setRoscoName] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [words, setWords] = useState<{ [key: string]: string }>({});
  const [wordType, setWordType] = useState<{ [key: string]: string }>({});
  const [definitions, setDefinitions] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [isAccept, setAccept] = useState<boolean>(false);
  const navigate = useNavigate();
  const roscosService = new RoscoService();

  useEffect(() => {
    const empty = "";
    const initialWords = {
      A: "",
      B: "",
      C: "",
      D: "",
      E: "",
      F: "",
      G: "",
      H: "",
      I: "",
      J: "",
      K: "",
      L: "",
      M: "",
      N: "",
      O: "",
      P: "",
      Q: "",
      R: "",
      S: "",
      T: "",
      U: "",
      V: "",
      W: "",
      X: "",
      Y: "",
      Z: "",
    };

    setWords(initialWords);
    setTheme(empty);
    setUserName(empty);
    setRoscoName(empty);

  }, []);

  const handleWordChange = (letter: string, word: string) => {
    setWords((prevWords) => ({ ...prevWords, [letter]: word }));
  };

  const handleWordTypeChange = (letter: string, type: string) => {
    setWordType((prevType) => ({ ...prevType, [letter]: type }));
  };

  const handleDefinitionChange = (letter: string, definition: string) => {
    setDefinitions((prevDefinitions) => ({
      ...prevDefinitions,
      [letter]: definition,
    }));
  };

  const parseToJSON = () => {
    const wordsArray: Word[] = Object.keys(words).map((letter) => {
      const letterType = wordType[letter] || "start";
      const validLetterType: "contains" | "start" =
        letterType === "contains" || letterType === "start"
          ? letterType
          : "start";

      return {
        status: "pending",
        letter: letter,
        word: words[letter] ? words[letter].split(",") : [],
        definition: definitions[letter] || "",
        letterType: validLetterType,
      };
    });

    return wordsArray;
  };

  // Funciones de validación
  const validateForm = () => {
    const newErrors: any = {};

    if (time <= 5) {
      newErrors.time = "El tiempo debe ser mayor a 5 segundos";
    }

    if (userName.length > 25) {
      newErrors.userName =
        "El nombre de usuario no puede tener más de 25 caracteres";
    }

    if (!userName || userName.trim() === "") {
      newErrors.userName =
        "El nombre de usuario no puede estar vacío.";
    }

    if (roscoName.length > 25) {
      newErrors.roscoName =
        "El nombre del rosco no puede tener más de 25 caracteres";
    }

    if (!roscoName || roscoName.trim() === "") {
      newErrors.roscoName =
        "El nombre del rosco no puede estar vacío.";
    }

    if (theme.length > 25) {
      newErrors.theme = "La temática no puede tener más de 25 caracteres";
    }

    if (!theme || roscoName.trim() === "") {
      newErrors.theme = "La temática no puede estar vacía.";
    }

    Object.keys(words).forEach((letter) => {
      const word = words[letter];
      const definition = definitions[letter];

      console.log("Word", word);

      if (!word || word.trim() === "") {
        newErrors[
          `word_${letter}`
        ] = `La palabra para ${letter} no puede estar vacía`;
      }

      if (!definition || word.trim() === "") {
        newErrors[
          `definition_${letter}`
        ] = `La definición para ${letter} no puede estar vacía`;
      }

      if (definition && definition.length > 200) {
        newErrors[
          `definition_${letter}`
        ] = `La definición para ${letter} no puede tener más de 200 caracteres`;
      }

      // Validar respuesta según tipo (start o contains)
      if (word) {
        const wordArray = word.split(",");
        const validWord = wordArray.every((w) => {
          const lowerLetter = letter.toLowerCase();
          const lowerWord = w.toLowerCase();

          if (
            wordType[letter] === "start" &&
            !lowerWord.startsWith(lowerLetter)
          ) {
            return false;
          }
          if (
            wordType[letter] === "contains" &&
            (!lowerWord.includes(lowerLetter) || lowerWord.startsWith(lowerLetter))
          ) {
            return false;
          }
          return true;
        });

        if (!validWord) {
          newErrors[
            `answer_${letter}`
          ] = `La palabra para ${letter} no cumple con el tipo de respuesta (${wordType[letter]})`;
        }
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateForm()) {
      setIsModalOpen(true);
    }
  };

  const confirmCreate = async () => {
    const words = parseToJSON();
  
    try {
      const id = await roscosService.saveRosco(words, theme, time, roscoName, userName);
  
      if (!id) {
        throw new Error("No se pudo crear el rosco.");
      }
  
      setIsModalOpen(false);
  
      navigate("/roscos", {
        state: { create: true, code: id },
      });
    } catch (error) {
      console.error("Error al crear el rosco:", error);
    }
  };
  

  const goToBack = () => {
    navigate("/roscos");
  };

  const handleAccept = () => {
    setAccept(true);
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div>
      {!isAccept ? (
        <Instructions onAccept={handleAccept} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-primary to-indigo-800 p-8 flex flex-col items-center font-rubik">
          <h1 className="text-4xl font-bold text-white mb-8">Crear Rosco</h1>

          <button
            onClick={goToBack}
            className="absolute top-8 left-8 p-2 bg-transparent text-white rounded-full hover:bg-white hover:text-primary transition duration-200"
          >
            <ArrowLeftIcon className="w-8 h-8" />
          </button>

          <div className="grid grid-cols-2 gap-6 w-2/3 mb-8">
            <div className="flex flex-col space-y-6">
              <div>
                <label className="text-white font-bold mb-2">
                  Nombre del Rosco
                </label>
                <input
                  type="text"
                  value={roscoName}
                  onChange={(e) => setRoscoName(e.target.value)}
                  className={`p-3 text-black rounded-lg shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.roscoName ? "border-red-500" : ""
                  }`}
                  placeholder="Ingrese el nombre del rosco"
                />
                {errors.roscoName && (
                  <p className="text-red-500">{errors.roscoName}</p>
                )}
              </div>

              <div>
                <label className="text-white font-bold mb-2">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={`p-3 text-black rounded-lg shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.userName ? "border-red-500" : ""
                  }`}
                  placeholder="Ingrese su nombre"
                />
                {errors.userName && <p className="text-red-500">{errors.userName}</p>}
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <label className="text-white font-bold mb-2">
                  Tiempo (segundos)
                </label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className={`p-3 text-black rounded-lg shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.time ? "border-red-500" : ""
                  }`}
                  placeholder="Ingrese el tiempo en segundos"
                />
                {errors.time && <p className="text-red-500">{errors.time}</p>}
              </div>
              <div>
                <label className="text-white font-bold mb-2">Temática</label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className={`p-3 text-black rounded-lg shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.theme ? "border-red-500" : ""
                  }`}
                  placeholder="Ingrese la temática del rosco"
                />
                {errors.theme && <p className="text-red-500">{errors.theme}</p>}
              </div>
            </div>
          </div>

          <div className="w-2/3">
            {alphabet.map((letter) => (
              <div key={letter} className="flex flex-col items-start mb-4">
                <div className="mb-2 w-full">
                  <input
                    type="text"
                    onChange={(e) =>
                      handleDefinitionChange(letter, e.target.value)
                    }
                    className={`p-3 text-black rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[`definition_${letter}`] ? "border-red-500" : ""
                    }`}
                    placeholder={`Definición para ${letter}`}
                  />
                  {errors[`definition_${letter}`] && (
                    <p className="text-red-500">
                      {errors[`definition_${letter}`]}
                    </p>
                  )}
                </div>

                <div className="flex items-center w-full">
                  <div className="mr-4">
                    <select
                      onChange={(e) =>
                        handleWordTypeChange(letter, e.target.value)
                      }
                      className="p-3 text-black rounded-lg shadow-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="start">Empieza</option>
                      <option value="contains">Contiene</option>
                    </select>
                  </div>

                  <div className="mr-4 text-4xl font-bold text-white w-7">
                    {letter}
                  </div>

                  <div className="flex-grow">
                    <input
                      type="text"
                      onChange={(e) => handleWordChange(letter, e.target.value)}
                      className={`p-3 text-black rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`word_${letter}`] || errors[`answer_${letter}`]
                          ? "border-red-500"
                          : ""
                      }`}
                      placeholder={`Palabra para ${letter}`}
                    />
                    {errors[`word_${letter}`] && (
                      <p className="text-red-500">{errors[`word_${letter}`]}</p>
                    )}
                    {errors[`answer_${letter}`] && (
                      <p className="text-red-500">
                        {errors[`answer_${letter}`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCreate}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
          >
            Guardar Cambios
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">¿Crear rosco?</h2>
                <p className="mb-4">
                  ¿Estás seguro de que quieres crear el rosco?
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 mr-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmCreate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateRosco;
