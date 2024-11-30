import { useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import HoverSound from "../assets/sounds/hover_button_sound.wav";

type ButtonSectionProps = {
  text?: string;
  to?: string;
  size?: "small" | "medium" | "large" | "icon";
  onClick?: () => void;
  icon?: React.ReactNode;
};

const ButtonSection = ({
  text,
  to = "/",
  size = "medium",
  onClick,
  icon,
}: ButtonSectionProps) => {
  const navigate = useNavigate();
  const [effectVolume, setEffectVolume] = useState<number>(0.5);
  const [isEffectsMuted, setIsEffectsMuted] = useState<boolean>(false);

  const effectSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    const savedEffectVolume = localStorage.getItem("effectVolume");
    const savedEffectsMuted = localStorage.getItem("isEffectsMuted");

    if (savedEffectVolume) {
      setEffectVolume(parseFloat(savedEffectVolume));
    }
    if (savedEffectsMuted) {
      setIsEffectsMuted(savedEffectsMuted === "true");
    }

    if (!effectSoundRef.current) {
      effectSoundRef.current = new Howl({
        src: [HoverSound],
        volume: isEffectsMuted ? 0 : effectVolume,
      });
    } else {
      effectSoundRef.current.volume(isEffectsMuted ? 0 : effectVolume);
    }
  }, [effectVolume, isEffectsMuted]);

  const sizeClasses = {
    small: "px-6 py-2 text-lg",
    icon: "px-4 py-2 text-xl",
    medium: "px-9 py-3 text-lg",
    large: "px-8 py-4 text-3xl",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  const handleMouseEnter = () => {
    if (effectSoundRef.current && !isEffectsMuted) {
      effectSoundRef.current.play();
    }
  };

  if (!icon) {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={`w-full ${sizeClasses[size]} text-white font-bold rounded-full shadow-md transition-transform transform bg-transparent border-2 border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none`}
        aria-label={`Ir a ${text}`}
      >
        {text}
      </button>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={`flex items-center gap-2 w-fit ${sizeClasses[size]} text-white font-semibold rounded-full shadow-md transition-transform transform bg-transparent border border-white hover:scale-105 hover:border-blue-300 hover:shadow-blue-400/50 hover:shadow-lg focus:outline-none`}
        aria-label={text ? `Ir a ${text}` : "Botón"}
      >
        {icon && <span>{icon}</span>}
        {text && <span>{text}</span>}
      </button>
    );
  }
};

export default ButtonSection;
