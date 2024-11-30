import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import Loader from "../layouts/Loader";
import { Rosco } from "../types/types";
import BackButton from "../components/BackButton";
import RoscoCard from "../components/RoscoCard";
import ConfirmationModal from "../components/ConfirmationModal";

const Profile = () => {
  const { user, loadingUser, roscosService } = useUser();
  const [userRoscos, setUserRoscos] = useState([] as Rosco[]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRoscoId, setSelectedRoscoId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/login");
    }
  }, [loadingUser, user, navigate]);

  useEffect(() => {
    if (loadingUser || !user) {
      return;
    }

    const fetchUserRoscos = async () => {
      try {
        const roscos = await roscosService.getRoscodByEmail(user.email);
        setUserRoscos(roscos || []);
      } catch (error) {
        console.error("Error al obtener los roscos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoscos();
  }, [loadingUser, user, roscosService]);

  const handleDelete = (id: string) => {
    setIsModalOpen(true);
    setSelectedRoscoId(id);
  };

  const confirmDelete = async () => {
    try {
      await roscosService.deleteRosco(selectedRoscoId);
      setUserRoscos((roscos) =>
        roscos.filter((rosco) => rosco.id !== selectedRoscoId)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el rosco:", error);
    }
  };

  const handleShare = (id: string) => {
    const url = `${window.location.origin}/game/${id}`;
    navigator.clipboard.writeText(url);
    alert("Enlace copiado al portapapeles: " + url);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-rosco/${id}`);
  };

  if (loading || loadingUser) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-900 text-white p-8 flex flex-col items-center font-rubik">
      <BackButton
        onClick={() => navigate("/home")}
        hoverText="hover:text-purple-600"
      />

      <div className="w-full max-w-7xl bg-white text-gray-800 rounded-2xl shadow-2xl p-8 overflow-hidden">
        {/* Encabezado del perfil */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600 mb-2">
            Perfil de Usuario
          </h1>
          <p className="text-gray-600 text-lg">
            Explora tu información y tus roscos creados
          </p>
        </div>

        {/* Información del usuario */}
        <div className="bg-gradient-to-r from-purple-200 to-indigo-200 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            Información Personal
          </h2>
          <p className="text-lg">
            <span className="font-medium text-purple-700">Nombre:</span>{" "}
            {user?.username || "Sin nombre"}
          </p>
          <p className="text-lg">
            <span className="font-medium text-purple-700">Correo:</span>{" "}
            {user?.email}
          </p>
        </div>

        {/* Lista de roscos creados */}
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            Tus Roscos
          </h2>
          {userRoscos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRoscos.map((rosco) => (
                <RoscoCard
                  key={rosco.id}
                  rosco={rosco}
                  onClick={(id) => navigate(`/game/${id}`)}
                  editable={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onShare={handleShare}
                />
              ))}
            </div>
          ) : (
            <div className="bg-purple-50 text-purple-800 rounded-lg p-6 text-center shadow-md">
              <p className="text-lg font-medium">
                No has creado ningún rosco todavía.
              </p>
              <p className="text-sm">
                ¡Crea uno y empieza a jugar con tus amigos!
              </p>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        text={"¿Eliminar rosco?"}
        description={
          "¿Estás seguro de que deseas eliminar este rosco? Esta acción no se puede deshacer."
        }
        confirm={confirmDelete}
      />
    </div>
  );
};

export default Profile;
