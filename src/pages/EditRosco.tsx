import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rosco, Word } from "../types/types";
import RoscoForm from "../components/RoscoForm";
import { useUser } from "../contexts/UserContext";
import Loader from "../layouts/Loader";

const EditRosco: React.FC = () => {
  const { user, loadingUser, roscosService } = useUser();
  const [rosco, setRosco] = useState<Rosco | undefined>();
  const [difficulty, setDifficulty] = useState<string>("");
  const [time, setTime] = useState<number>(60);
  const [roscoName, setRoscoName] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [words, setWords] = useState<{ [key: string]: string }>({});
  const [wordType, setWordType] = useState<{ [key: string]: string }>({});
  const [definitions, setDefinitions] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const fetchRosco = async () => {
      try {
        const roscosData = await roscosService.getRoscoById(id);
        if (!roscosData) {
          throw new Error("No se encontró el rosco.");
        }
        setRosco(roscosData);
      } catch (error) {
        console.error("Error al obtener los datos del rosco:", error);
      }
    };

    fetchRosco();
  }, [id]);

  useEffect(() => {
    if (rosco) {
      setDifficulty(rosco.difficulty || "easy");
      setTime(rosco.time || 120);
      setRoscoName(rosco.name || "");
      setTheme(rosco.theme || "");
      const initialWords: { [key: string]: string } = {};
      const initialDefinitions: { [key: string]: string } = {};
      rosco.words.forEach((wordObj) => {
        initialWords[wordObj.letter] = wordObj.word.join(",");
        initialDefinitions[wordObj.letter] = wordObj.definition || "";
      });
      setWords(initialWords);
      setDefinitions(initialDefinitions);
      const initialWordTypes: { [key: string]: string } = {};
      rosco.words.forEach((wordObj) => {
        initialWordTypes[wordObj.letter] = wordObj.letterType || "start";
      });
      setWordType(initialWordTypes);

      setLoading(false);
    }
  }, [rosco]);

  const confirmUpdate = async (
    words: Word[],
    theme: string,
    time: number,
    roscoName: string,
    difficulty: string
  ) => {
    try {
      if (!rosco) {
        throw new Error("Rosco no encontrado.");
      }
      const id = await roscosService.updateRosco(
        rosco.id,
        words,
        theme,
        time,
        roscoName,
        user.user_metadata.user_name,
        user.email,
        difficulty
      );

      navigate("/roscos", {
        state: { update: true, code: id },
      });
    } catch (error) {
      console.error("Error al actualizar el rosco:", error);
    }
  };

  if (loadingUser || loading) {
    return <Loader />;
  }

  return (
    <div>
      <RoscoForm
        initialWords={words}
        initialDefinitions={definitions}
        initialWordTypes={wordType}
        timeP={time}
        difficultyP={difficulty}
        themeP={theme}
        roscoNameP={roscoName}
        text="Editar Rosco"
        onSubmit={confirmUpdate}
      />
    </div>
  );
};

export default EditRosco;
