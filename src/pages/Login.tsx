import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import BackButton from "../components/BackButton";
import { useUser } from "../contexts/UserContext";
import { User } from "types";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, roscosService } = useUser();
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

  useEffect(() => {
    if (user == ("bbdd" as unknown as User)) {
      navigate("/home/no-bbdd");
    }
  }, [user]);

  const goToMenu = () => {
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-500 font-rubik">
      {/* Botón de retroceso */}
      <BackButton onClick={goToMenu} hoverText="hover:text-purple-600" />

      {/* Contenedor principal */}
      <div className="w-full max-w-xl p-8 transition-all transform bg-white rounded-lg shadow-2xl">
        <h1 className="mb-6 text-3xl font-extrabold text-center text-indigo-600">
          Inicia Sesión
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-semibold text-gray-600"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-semibold text-gray-600"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 font-bold text-white transition duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <a
              href="/signup"
              className="font-semibold text-indigo-600 hover:underline"
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
