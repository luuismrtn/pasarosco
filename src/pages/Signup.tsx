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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-500">
      <BackButton onClick={() => navigate("/home")} hoverText="hover:text-teal-600" />
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-teal-600">
          Crea tu cuenta
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Campo de nombre de usuario */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              placeholder="Ejemplo: usuario123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>
          {/* Campo de correo electrónico */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ejemplo: usuario@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>
          {/* Campo de contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200 font-bold"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="text-teal-600 font-semibold hover:underline"
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
