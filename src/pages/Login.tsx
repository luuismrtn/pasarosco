import React, { useState, useRef } from "react";
import { RoscoService } from "../data/RoscoService";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const roscosService = new RoscoService();
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await roscosService
        .getSupabase()
        .auth.signInWithPassword({ email, password });

      if (error) {
        setError(
          error.message ||
            "Credenciales inválidas. Por favor, verifica tu correo y contraseña."
        );
        if (error.message.includes("correo")) {
          emailInputRef.current?.focus();
        } else if (error.message.includes("contraseña")) {
          passwordInputRef.current?.focus();
        }
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Ocurrió un problema al iniciar sesión. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const goToMenu = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 font-rubik">

      {/* Botón de retroceso */}
      <BackButton onClick={goToMenu} hoverText="hover:text-purple-600" />

      {/* Contenedor principal */}
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-xl transform transition-all">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          Inicia Sesión
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Correo electrónico
            </label>
            <input
              ref={emailInputRef}
              type="email"
              id="email"
              placeholder="Ejemplo: usuario@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Contraseña
            </label>
            <input
              ref={passwordInputRef}
              type="password"
              id="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-bold"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">
            ¿No tienes cuenta?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
