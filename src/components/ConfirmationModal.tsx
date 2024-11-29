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
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/6">
          <h2 className="text-2xl font-bold mb-4">
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
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
