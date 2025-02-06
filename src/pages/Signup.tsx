import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import BackButton from "../components/BackButton";

const Signup: React.FC = () => {
  const { roscosService } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await roscosService
        .getSupabase()
        .auth.signUp({ email, password, options: {
            data: {
              user_name: username,
            } }});

      if (signUpError) {
        console.error("Error al registrar el usuario:", signUpError);
        setError(
          "No se pudo registrar. Verifica el formato del correo y la fortaleza de la contraseña."
        );
        return;
      }

      alert(
        "Registro exitoso. Revisa tu correo para confirmar tu cuenta. Tu nombre de usuario fue actualizado."
      );
    } catch (err) {
      setError("Ocurrió un error inesperado. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-500">
      <BackButton onClick={() => navigate("/home")} hoverText="hover:text-teal-600" />
      <div className="w-full max-w-md p-8 transition-all transform bg-white rounded-lg shadow-2xl">
        <h1 className="mb-6 text-3xl font-extrabold text-center text-teal-600">
          Crea tu cuenta
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Campo de nombre de usuario */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-semibold text-gray-600"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              placeholder="Ejemplo: usuario123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          {/* Campo de correo electrónico */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-semibold text-gray-600"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ejemplo: usuario@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          {/* Campo de contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-semibold text-gray-600"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 font-bold text-white transition duration-200 bg-teal-600 rounded-lg hover:bg-teal-700"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="font-semibold text-teal-600 hover:underline"
            >
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
