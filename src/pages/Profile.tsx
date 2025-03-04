import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import Loader from "../layouts/Loader";
import { Rosco, User } from "../types/types";
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
    <div className="flex flex-col items-center min-h-screen p-8 text-white bg-gradient-to-br from-purple-600 to-indigo-900 font-rubik">
      <BackButton
        onClick={() => navigate("/home")}
        hoverText="hover:text-purple-600"
      />

      <div className="w-full p-8 overflow-hidden text-gray-800 bg-white shadow-2xl max-w-7xl rounded-2xl lg:max-w-5xl 2xl:max-w-6xl">
        {/* Encabezado del perfil */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">
            Perfil de Usuario
          </h1>
          <p className="text-lg text-gray-600">
            Explora tu información y tus roscos creados
          </p>
        </div>

        {/* Información del usuario */}
        <div className="p-6 mb-8 shadow-md bg-gradient-to-r from-purple-200 to-indigo-200 rounded-xl">
          <h2 className="mb-4 text-2xl font-bold text-indigo-800">
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
          <h2 className="mb-6 text-3xl font-bold text-purple-700">
            Tus Roscos
          </h2>
          {userRoscos.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="p-6 text-center text-purple-800 rounded-lg shadow-md bg-purple-50">
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
