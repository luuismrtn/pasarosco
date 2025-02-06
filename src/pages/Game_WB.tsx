import { Howl } from "howler";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import WordWheel from "../layouts/WordWheel";
import Question from "../layouts/Question";
import Score from "../layouts/Score";
import { Word } from "../types/types";
import Background from "../layouts/Background";

import CorrectSound from "../assets/sounds/correct_sound.wav";
import IncorrectSound from "../assets/sounds/incorrect_sound.wav";
import BgGame from "../assets/sounds/bg_game.wav";
import PipSound from "../assets/sounds/pip-number.wav";
import StartSound from "../assets/sounds/start_sound.wav";

const Game: React.FC = () => {
  const [id] = useState<string>("no-bbdd");
  const navigate = useNavigate();
  const [time] = useState<number>(120);
  const [words, setWords] = useState<Word[]>([]);
  const [index, setIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [remainingTime, setRemainingTime] = useState(120);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [bgVolume, setBgVolume] = useState<number>(0.3);
  const [isBgMuted, setIsBgMuted] = useState<boolean>(false);
  const [effectVolume, setEffectVolume] = useState<number>(0.3);
  const [isEffectsMuted, setIsEffectsMuted] = useState<boolean>(false);

  useEffect(() => {
      
    const words = [
      {
        word: ["amigo"],
        letter: "A",
        status: "pending",
        definition:
          "Persona con la que se tiene una relación de afecto y confianza.",
        letterType: "start",
      },
      {
        word: ["bicicleta", "bici"],
        letter: "B",
        status: "pending",
        definition: "Vehículo de dos ruedas impulsado por pedales.",
        letterType: "start",
      },
      {
        word: ["casa"],
        letter: "C",
        status: "pending",
        definition: "Lugar donde vive una persona o una familia.",
        letterType: "start",
      },
      {
        word: ["delfín"],
        letter: "D",
        status: "pending",
        definition:
          "Mamífero marino conocido por su inteligencia y su forma alargada.",
        letterType: "start",
      },
      {
        word: ["elefante"],
        letter: "E",
        status: "pending",
        definition:
          "El mamífero terrestre más grande, con trompa y grandes orejas.",
        letterType: "start",
      },
      {
        word: ["fresa"],
        letter: "F",
        status: "pending",
        definition: "Fruta roja pequeña y dulce con semillas en su superficie.",
        letterType: "start",
      },
      {
        word: ["gato"],
        letter: "G",
        status: "pending",
        definition: "Animal doméstico conocido por su agilidad y ronroneo.",
        letterType: "start",
      },
      {
        word: ["huevo"],
        letter: "H",
        status: "pending",
        definition: "Producto ovalado puesto por aves, muy usado en la cocina.",
        letterType: "start",
      },
      {
        word: ["iglesia"],
        letter: "I",
        status: "pending",
        definition: "Edificio destinado al culto religioso cristiano.",
        letterType: "start",
      },
      {
        word: ["jardín"],
        letter: "J",
        status: "pending",
        definition: "Espacio al aire libre con plantas, flores y césped.",
        letterType: "start",
      },
      {
        word: ["koala"],
        letter: "K",
        status: "pending",
        definition: "Animal marsupial que vive en los árboles de Australia.",
        letterType: "start",
      },
      {
        word: ["lámpara"],
        letter: "L",
        status: "pending",
        definition: "Objeto que da luz artificial.",
        letterType: "start",
      },
      {
        word: ["manzana"],
        letter: "M",
        status: "pending",
        definition:
          "Fruta redonda y jugosa, que puede ser roja, verde o amarilla.",
        letterType: "start",
      },
      {
        word: ["nube"],
        letter: "N",
        status: "pending",
        definition: "Conjunto visible de gotas de agua suspendidas en el aire.",
        letterType: "start",
      },
      {
        word: ["oso"],
        letter: "O",
        status: "pending",
        definition: "Animal grande y peludo que vive en bosques y montañas.",
        letterType: "start",
      },
      {
        word: ["plátano"],
        letter: "P",
        status: "pending",
        definition: "Fruta alargada y amarilla que crece en racimos.",
        letterType: "start",
      },
      {
        word: ["queso"],
        letter: "Q",
        status: "pending",
        definition:
          "Alimento sólido derivado de la leche, con variedad de sabores y texturas.",
        letterType: "start",
      },
      {
        word: ["ratón"],
        letter: "R",
        status: "pending",
        definition:
          "Pequeño roedor conocido por habitar en las casas y ser muy ágil.",
        letterType: "start",
      },
      {
        word: ["sol"],
        letter: "S",
        status: "pending",
        definition: "Estrella que da luz y calor a la Tierra.",
        letterType: "start",
      },
      {
        word: ["tigre"],
        letter: "T",
        status: "pending",
        definition: "Felino salvaje de rayas negras y naranjas.",
        letterType: "start",
      },
      {
        word: ["uva"],
        letter: "U",
        status: "pending",
        definition:
          "Fruta pequeña y redonda que crece en racimos, usada para hacer vino.",
        letterType: "start",
      },
      {
        word: ["vaca"],
        letter: "V",
        status: "pending",
        definition: "Animal que produce leche y carne, común en las granjas.",
        letterType: "start",
      },
      {
        word: ["wifi"],
        letter: "W",
        status: "pending",
        definition:
          "Tecnología que permite la conexión inalámbrica a internet.",
        letterType: "start",
      },
      {
        word: ["xilófono"],
        letter: "X",
        status: "pending",
        definition:
          "Instrumento musical de percusión formado por láminas de madera.",
        letterType: "start",
      },
      {
        word: ["yate"],
        letter: "Y",
        status: "pending",
        definition: "Embarcación de lujo usada para recreación.",
        letterType: "start",
      },
      {
        word: ["zorro"],
        letter: "Z",
        status: "pending",
        definition: "Mamífero carnívoro conocido por su astucia.",
        letterType: "start",
      },
    ] as Word[];

    setWords(words);

    const savedBgVolume = localStorage.getItem("bgVolume");
    const savedIsBgMuted = localStorage.getItem("isBgMuted");
    const savedEffectVolume = localStorage.getItem("effectVolume");
    const savedEffectsMuted = localStorage.getItem("isEffectsMuted");

    if (savedBgVolume) {
      setBgVolume(parseFloat(savedBgVolume));
    }
    if (savedIsBgMuted) {
      setIsBgMuted(savedIsBgMuted === "true");
    }
    if (savedEffectVolume) {
      setEffectVolume(parseFloat(savedEffectVolume));
    }
    if (savedEffectsMuted) {
      setIsEffectsMuted(savedEffectsMuted === "true");
    }

    return () => {
      if (!isBgMuted) {
        bgMusicRef.current.stop();
      }
      if (!isEffectsMuted) {
        pipSoundRef.current.stop();
      }
    };
  }, []);

  const correctSoundRef = useRef(
    new Howl({ src: [CorrectSound], volume: isEffectsMuted ? 0 : effectVolume })
  );
  const incorrectSoundRef = useRef(
    new Howl({
      src: [IncorrectSound],
      volume: isEffectsMuted ? 0 : effectVolume,
    })
  );
  const bgMusicRef = useRef(
    new Howl({ src: [BgGame], loop: true, volume: isBgMuted ? 0 : bgVolume })
  );

  const pipSoundRef = useRef(
    new Howl({
      src: [PipSound],
      volume: isEffectsMuted ? 0 : effectVolume,
    })
  );

  const startSoundRef = useRef(
    new Howl({
      src: [StartSound],
      volume: isEffectsMuted ? 0 : effectVolume,
    })
  );

  useEffect(() => {
    if (countdown === -1) {
      setGameStarted(true);
      bgMusicRef.current.play();
      return;
    }

    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);

    if (countdown === 2 || countdown === 1) {
      pipSoundRef.current.play();
    }

    if (countdown === 0) {
      startSoundRef.current.play();
      bgMusicRef.current.play();
      setGameStarted(true);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (gameStarted && remainingTime === 0) {
      bgMusicRef.current.stop();
      navigate("/results", {
        state: { correctAnswers, wrongAnswers, time, words, id },
      });
    }
  }, [remainingTime, gameStarted]);

  useEffect(() => {
    if (correctAnswers + wrongAnswers === 26) {
      bgMusicRef.current.stop();
      navigate("/results", {
        state: { correctAnswers, wrongAnswers, time, words, id },
      });
    }
  }, [correctAnswers, wrongAnswers]);

  useEffect(() => {
    if (gameStarted && !isPaused && !isFailed) {
      inputRef.current?.focus();
      const timer = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, isPaused, isFailed]);

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleAnswer = (answer: string) => {
    const currentWord = words[index];

    if (currentWord.status === "pending") {
      const normalizedAnswer = removeAccents(answer.toLowerCase());

      const isCorrect = currentWord.word.some(
        (word) => normalizedAnswer === removeAccents(word.toLowerCase())
      );

      if (isCorrect) {
        currentWord.status = "correct";
        setCorrectAnswers((prev) => prev + 1);
        correctSoundRef.current.play();

        setIndex(findNextIndex(index + 1));
      } else {
        currentWord.status = "incorrect";
        setWrongAnswers((prev) => prev + 1);
        incorrectSoundRef.current.play();
        bgMusicRef.current.pause();
        setIsFailed(true);
      }

      setWords((prevWords) => {
        const updatedWords = [...prevWords];
        updatedWords[index] = currentWord;
        return updatedWords;
      });
    }
  };

  const findNextIndex = (startIndex: number): number => {
    let nextIndex = startIndex;

    while (words[nextIndex % words.length].status !== "pending") {
      nextIndex++;
    }

    return nextIndex % words.length;
  };

  const goToMenu = () => {
    if (!isBgMuted) {
      bgMusicRef.current.stop();
    }
    navigate("/home/no-bbdd");
  };

  const restartGame = () => {
    bgMusicRef.current.stop();
    const resetWords: Word[] = words.map((word) => ({
      ...word,
      status: "pending" as "pending",
    }));

    setWords(resetWords);
    setIndex(0);
    setCorrectAnswers(0);
    setRemainingTime(time);
    setCountdown(3);
    setGameStarted(false);
    setIsPaused(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && !isPaused && !isFailed) {
      setIsPaused(true);
      bgMusicRef.current.pause();
    } else if (e.key === "Enter" && (isPaused || isFailed)) {
      bgMusicRef.current.play();
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      setIsPaused(false);
      setIsFailed(false);
      setIndex(findNextIndex(index + 1));
    }

    inputRef.current?.focus();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPaused, isFailed]);

  useEffect(() => {
    localStorage.setItem("bgVolume", bgVolume.toString());
    bgMusicRef.current.volume(isBgMuted ? 0 : bgVolume);
  }, [bgVolume, isBgMuted]);

  useEffect(() => {
    localStorage.setItem("effectVolume", effectVolume.toString());
    correctSoundRef.current.volume(isEffectsMuted ? 0 : effectVolume);
    incorrectSoundRef.current.volume(isEffectsMuted ? 0 : effectVolume);
    pipSoundRef.current.volume(isEffectsMuted ? 0 : effectVolume);
    startSoundRef.current.volume(isEffectsMuted ? 0 : effectVolume);
  }, [effectVolume, isEffectsMuted]);

  return (
    <div className="flex flex-col min-h-screen bg-primary font-rubik">
      {/* Fondo animado */}
      <Background />

      {/* Botón para volver al menú */}
      <button
        onClick={goToMenu}
        className="absolute p-2 text-white transition duration-200 bg-transparent rounded-full top-8 left-8 hover:bg-white hover:text-primary"
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>

      {/* Botón para reiniciar el juego */}
      <button
        onClick={restartGame}
        className="absolute p-2 text-white transition duration-200 bg-transparent rounded-full top-8 right-8 hover:bg-white hover:text-primary"
      >
        <ArrowPathIcon className="w-8 h-8" />
      </button>

      <div className="flex flex-col items-center justify-center flex-grow p-8">
        {/* Contador de inicio de 3 segundos */}
        {!gameStarted && (
          <div className="absolute font-bold text-white text-9xl lg:text-8xl xl:text-9xl">
            {countdown > 0 ? countdown : "¡YA!"}
          </div>
        )}

        {/* Rosco */}
        <div className="relative flex items-center justify-center w-full">
          {/* Tiempo a los lados rosco */}
          {gameStarted && (
            <div className="absolute z-0 w-10/12 lg:w-11/12 xl:w-9/12">
              <Score
                correctAnswers={correctAnswers}
                remainingTime={remainingTime}
              />
            </div>
          )}

          <WordWheel
            words={words}
            currentLetterIndex={index}
            ready={gameStarted}
          />
        </div>
      </div>

      {/* Pregunta y respuesta abajo */}
      <div className="z-10 w-full mb-10 bg-primary">
        <Question
          inputRef={inputRef}
          word={words[index]}
          onAnswer={handleAnswer}
          ready={gameStarted}
          paused={isPaused}
          failed={isFailed}
        />
      </div>
    </div>
  );
};

export default Game;
