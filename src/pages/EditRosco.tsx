import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Rosco, User, Word } from "../types/types";
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
    if (!loadingUser && !user) {
      navigate("/login");
    }
  }, [user]);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (user) {
      timeoutId = setTimeout(() => {
        if (user === ("bbdd" as unknown as User)) {
          console.log("Usuario no autenticado", user);
          navigate("/home/no-bbdd");
        }
      }, 1000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, navigate]);

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
    if (rosco && user) {
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
  }, [rosco, user]);

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
      if (!user) {
        throw new Error("Usuario no encontrado.");
      }
      const id = await roscosService.updateRosco(
        rosco.id,
        words,
        theme,
        time,
        roscoName,
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

  if (rosco?.user_email !== user?.email && user?.role !== "admin") {
    navigate("/roscos");
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
