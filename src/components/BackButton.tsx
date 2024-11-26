import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface BackButtonProps {
  onClick: () => void;
  hoverText?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  hoverText = "text-primary",
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-8 left-8 p-2 bg-transparent text-white rounded-full transition duration-200 hover:bg-white ${hoverText}`}
    >
      <ArrowLeftIcon className="w-8 h-8" />
    </button>
  );
};

export default BackButton;
