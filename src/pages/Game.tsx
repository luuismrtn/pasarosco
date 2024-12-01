import { Howl } from "howler";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
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
import { RoscoService } from "../data/RoscoService";

import Loader from "../layouts/Loader";

const Game: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [rosco, setRosco] = useState<Word[]>([]);
  const navigate = useNavigate();
  const [time, setTime] = useState<number>(120);
  const [words, setWords] = useState<Word[]>(rosco);
  const [isloading, setLoading] = useState(true);
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

  const [isId, setIsId] = useState<boolean>(true);

  const roscosService = new RoscoService();

  const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    const fetchRosco = async () => {
      try {
        const roscoData = await roscosService.getRoscoById(id);
        if (!roscoData) {
          console.error("Rosco no encontrado.");
          return;
        }

        const data = roscoData.words.map((word: Word) => ({
          ...word,
          status: "pending" as "pending",
        }));
        setRemainingTime(roscoData.time);
        setTime(roscoData.time);
        setRosco(data);
        setWords(data);
        setCorrectAnswers(0);
        setWrongAnswers(0);

        correctSoundRef.current.load();
        incorrectSoundRef.current.load();
        bgMusicRef.current.load();
        pipSoundRef.current.load();
        startSoundRef.current.load();

        await wait(500);

        setLoading(false);
        if (!isEffectsMuted) {
          pipSoundRef.current.play();
        }
      } catch (error) {
        console.error("Error al obtener el rosco:", error);
        setLoading(false);
      }
    };

    fetchRosco();

    const savedBgVolume = localStorage.getItem("bgVolume");
    const savedIsBgMuted = localStorage.getItem("isBgMuted");
    const savedEffectVolume = localStorage.getItem("effectVolume");
    const savedEffectsMuted = localStorage.getItem("isEffectsMuted");
    const savedShowRoscoId = localStorage.getItem("showRoscoId");

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
    if (savedShowRoscoId) {
      setIsId(savedShowRoscoId === "true");
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

  // Inicialización de sonidos
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
    if (isloading) return;

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
  }, [countdown, isloading]);

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
    navigate("/home");
  };

  const restartGame = () => {
    bgMusicRef.current.stop();
    const resetWords: Word[] = rosco.map((word) => ({
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

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col font-rubik">
      {/* Fondo animado */}
      <Background />

      {/* Botón para volver al menú */}
      <button
        onClick={goToMenu}
        className="absolute top-8 left-8 p-2 bg-transparent text-white rounded-full hover:bg-white hover:text-primary transition duration-200"
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>

      {/* ID */}
      {isId && (
        <p className="absolute bottom-4 left-4 text-white text-base opacity-50">
          {id}
        </p>
      )}

      {/* Botón para reiniciar el juego */}
      <button
        onClick={restartGame}
        className="absolute top-8 right-8 p-2 bg-transparent text-white rounded-full hover:bg-white hover:text-primary transition duration-200"
      >
        <ArrowPathIcon className="w-8 h-8" />
      </button>

      <div className="flex-grow p-8 flex flex-col justify-center items-center">
        {/* Contador de inicio de 3 segundos */}
        {!gameStarted && (
          <div className="absolute text-white text-9xl lg:text-8xl xl:text-9xl font-bold">
            {countdown > 0 ? countdown : "¡YA!"}
          </div>
        )}

        {/* Rosco */}
        <div className="relative flex justify-center items-center w-full">
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
      <div className="w-full mb-10 z-10 bg-primary">
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
