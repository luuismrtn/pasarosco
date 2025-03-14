import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { User, Word } from "../types/types";
import Loader from "../layouts/Loader";
import Instructions from "../layouts/Instructions";
import { useUser } from "../contexts/UserContext";
import RoscoForm from "../components/RoscoForm";

const CreateRosco: React.FC = () => {
  const { user, loadingUser, roscosService } = useUser();
  const [words, setWords] = useState<{ [key: string]: string }>({});
  const [wordType] = useState<{ [key: string]: string }>({});
  const [definitions] = useState<{ [key: string]: string }>({});
  const [isAccept, setAccept] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

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

  const confirmCreate = async (
    words: Word[],
    theme: string,
    time: number,
    roscoName: string,
    difficulty: string
  ) => {
    try {
      const id = await roscosService.saveRosco(
        words,
        theme,
        time,
        roscoName,
        user?.username || "",
        user?.email || "",
        difficulty
      );

      if (!id) {
        throw new Error("No se pudo crear el rosco.");
      }

      navigate("/roscos", {
        state: { create: true, code: id },
      });
    } catch (error) {
      console.error("Error al crear el rosco:", error);
    }
  };

  const handleAccept = () => {
    setAccept(true);
  };

  if (loadingUser) {
    return <Loader />;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      {!isAccept ? (
        <Instructions onAccept={handleAccept} />
      ) : (
        <RoscoForm
          initialWords={words}
          initialDefinitions={definitions}
          initialWordTypes={wordType}
          text="Crear Rosco"
          onSubmit={confirmCreate}
        />
      )}
    </div>
  );
};

export default CreateRosco;
