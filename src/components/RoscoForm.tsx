import React, { useState } from "react";
import { Word, themes, difficulties } from "../types/types";
import { useNavigate } from "react-router";
import BackButton from "./BackButton";
import ConfirmationModal from "./ConfirmationModal";

type RoscoFormProps = {
  initialWords: { [key: string]: string };
  initialDefinitions?: { [key: string]: string };
  initialWordTypes?: { [key: string]: string };
  text: string;
  timeP?: number;
  roscoNameP?: string;
  themeP?: string;
  difficultyP?: string;
  onSubmit: (
    words: Word[],
    theme: string,
    time: number,
    roscoName: string,
    difficulty: string
  ) => Promise<void>;
};

const RoscoForm: React.FC<RoscoFormProps> = ({
  initialWords,
  initialDefinitions = {},
  initialWordTypes = {},
  text,
  timeP = 120,
  roscoNameP = "",
  themeP = "",
  difficultyP = "",
  onSubmit,
}) => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<string>(difficultyP);
  const [time, setTime] = useState<number>(timeP);
  const [roscoName, setRoscoName] = useState<string>(roscoNameP);
  const [theme, setTheme] = useState<string>(themeP);
  const [words, setWords] = useState<{ [key: string]: string }>(initialWords);
  const [wordType, setWordType] = useState<{ [key: string]: string }>(
    initialWordTypes
  );
  const [definitions, setDefinitions] = useState<{ [key: string]: string }>(
    initialDefinitions
  );
  const [errors, setErrors] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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
    const wordsArray: Word[] = alphabet.map((letter) => {
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

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (time <= 5) {
      newErrors.time = "El tiempo debe ser mayor a 5 segundos";
    }

    if (difficulty === "") {
      newErrors.difficulty = "Elige una dificultad válida";
    }

    if (roscoName.length > 25) {
      newErrors.roscoName =
        "El nombre del rosco no puede tener más de 25 caracteres";
    }

    if (!roscoName || roscoName.trim() === "") {
      newErrors.roscoName = "El nombre del rosco no puede estar vacío.";
    }

    if (theme === "") {
      newErrors.theme = "Elige una temática válida";
    }

    alphabet.forEach((letter) => {
      const word = words[letter];
      const definition = definitions[letter];

      if (!word || word.trim() === "") {
        newErrors[
          `word_${letter}`
        ] = `La palabra para ${letter} no puede estar vacía`;
      }

      if (!definition || definition.trim() === "") {
        newErrors[
          `definition_${letter}`
        ] = `La definición para ${letter} no puede estar vacía`;
      }

      if (definition && definition.length > 200) {
        newErrors[
          `definition_${letter}`
        ] = `La definición para ${letter} no puede tener más de 200 caracteres`;
      }

      if (word) {
        const wordArray = word.split(",");
        const validWord = wordArray.every((w) => {
          const lowerLetter = letter.toLowerCase();
          const lowerWord = removeAccents(w.toLowerCase());

          if (
            wordType[letter] === "start" &&
            !lowerWord.startsWith(lowerLetter)
          ) {
            return false;
          }
          if (
            wordType[letter] === "contains" &&
            (!lowerWord.includes(lowerLetter) ||
              lowerWord.startsWith(lowerLetter))
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

  const confirm = async () => {
    const parsedWords = parseToJSON();
    await onSubmit(parsedWords, theme, time, roscoName, difficulty);
    setIsModalOpen(false);
  };

  const goToBack = () => {
    navigate("/roscos");
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-br from-primary to-indigo-800 font-rubik">
      <h1 className="mb-8 text-4xl font-bold text-white">{text}</h1>

      <BackButton onClick={goToBack} hoverText="hover:text-primary" />

      <div className="grid w-2/3 grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col space-y-6">
          <div>
            <label className="mb-2 font-bold text-white">
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
            <label className="mb-2 font-bold text-white">Dificultad</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={`p-3 text-black rounded-lg shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.difficulty ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccione una dificultad</option>
              {difficulties.map((difficultyOption) => (
                <option key={difficultyOption} value={difficultyOption}>
                  {difficultyOption}
                </option>
              ))}
            </select>
            {errors.difficulty && (
              <p className="text-red-500">{errors.difficulty}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <label className="mb-2 font-bold text-white">
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
            <label className="mb-2 font-bold text-white">Temática</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={`p-3 text-black rounded-lg shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.theme ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccione una temática</option>
              {themes.map((themeOption) => (
                <option key={themeOption} value={themeOption}>
                  {themeOption}
                </option>
              ))}
            </select>
            {errors.theme && <p className="text-red-500">{errors.theme}</p>}
          </div>
        </div>
      </div>

      <div className="w-2/3">
        {alphabet.map((letter) => (
          <div key={letter} className="flex flex-col items-start mb-4">
            <div className="w-full mb-2">
              <input
                type="text"
                value={definitions[letter] || ""}
                onChange={(e) => handleDefinitionChange(letter, e.target.value)}
                className={`p-3 text-black rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[`definition_${letter}`] ? "border-red-500" : ""
                }`}
                placeholder={`Definición para ${letter}`}
              />
              {errors[`definition_${letter}`] && (
                <p className="text-red-500">{errors[`definition_${letter}`]}</p>
              )}
            </div>

            <div className="flex items-center w-full">
              <div className="mr-4">
                <select
                  onChange={(e) => handleWordTypeChange(letter, e.target.value)}
                  value={wordType[letter] || "start"}
                  className="w-32 p-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={words[letter] || ""}
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
                  <p className="text-red-500">{errors[`answer_${letter}`]}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleCreate}
        className="px-6 py-3 mt-6 text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-500"
      >
        Guardar Cambios
      </button>

      <ConfirmationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        text={text === "Editar Rosco" ? "¿Actualizar rosco?" : "¿Crear rosco?"}
        description={
          text === "Editar Rosco"
            ? "¿Estás seguro de que quieres actualizar el rosco?"
            : "¿Estás seguro de que quieres crear el rosco?"
        }
        confirm={confirm}
      />
    </div>
  );
};

export default RoscoForm;
