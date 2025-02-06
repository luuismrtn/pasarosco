import React from "react";

interface ConfirmationModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  description: string;
  confirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  text,
  description,
  confirm,
}) => {
  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-2/6 p-6 text-black bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">
            {text}
          </h2>
          <p className="mb-8 text-lg">
            {description}
          </p>

          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 mr-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={confirm}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
